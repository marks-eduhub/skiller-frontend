import { beforeEach, describe, expect, it } from "vitest";
import {
  __resetSerializeByKey,
  __serializeByKeyQueueSize,
  serializeByKey,
} from "./serializeByKey";

/** A promise plus the handles to settle it, so tests control the interleaving. */
const deferred = <T,>() => {
  let resolve!: (value: T) => void;
  let reject!: (reason?: unknown) => void;
  const promise = new Promise<T>((res, rej) => {
    resolve = res;
    reject = rej;
  });
  return { promise, resolve, reject };
};

/** Lets already-queued microtasks run so ordering can be asserted. */
const flush = () => new Promise((resolve) => setTimeout(resolve, 0));

beforeEach(() => {
  __resetSerializeByKey();
});

describe("serializeByKey", () => {
  it("returns the task's resolved value", async () => {
    await expect(serializeByKey("k", async () => "value")).resolves.toBe("value");
  });

  it("propagates a task's rejection to its own caller", async () => {
    await expect(
      serializeByKey("k", async () => {
        throw new Error("boom");
      })
    ).rejects.toThrow("boom");
  });

  it("does not start the second task until the first settles", async () => {
    // This is the property the whole fix rests on. If both tasks were allowed
    // to start, both would read "no tracker exists" and both would insert.
    const first = deferred<string>();
    const order: string[] = [];

    const a = serializeByKey("same", async () => {
      order.push("a:start");
      const value = await first.promise;
      order.push("a:end");
      return value;
    });

    const b = serializeByKey("same", async () => {
      order.push("b:start");
      return "b";
    });

    await flush();
    expect(order).toEqual(["a:start"]);

    first.resolve("a");
    await Promise.all([a, b]);

    expect(order).toEqual(["a:start", "a:end", "b:start"]);
  });

  it("lets the second task observe what the first wrote", async () => {
    // The realistic shape: task one creates the row, task two must see it
    // rather than create a duplicate.
    let rows = 0;

    const findOrCreate = () =>
      serializeByKey("same", async () => {
        const existing = rows;
        await flush();
        if (existing === 0) rows += 1;
        return rows;
      });

    await Promise.all([findOrCreate(), findOrCreate(), findOrCreate()]);

    expect(rows).toBe(1);
  });

  it("runs different keys concurrently", async () => {
    const blocker = deferred<string>();
    const order: string[] = [];

    const a = serializeByKey("key-a", async () => {
      order.push("a:start");
      return blocker.promise;
    });

    const b = serializeByKey("key-b", async () => {
      order.push("b:start");
      return "b";
    });

    await expect(b).resolves.toBe("b");
    expect(order).toEqual(["a:start", "b:start"]);

    blocker.resolve("a");
    await a;
  });

  it("does not wedge the queue when a task fails", async () => {
    // A failed write must not strand every later call on that key. The queue
    // chains through both settle paths precisely to avoid this.
    const failing = serializeByKey("same", async () => {
      throw new Error("first failed");
    });

    await expect(failing).rejects.toThrow("first failed");

    await expect(serializeByKey("same", async () => "recovered")).resolves.toBe(
      "recovered"
    );
  });

  it("keeps ordering when a failure is sandwiched between successes", async () => {
    const order: string[] = [];

    const a = serializeByKey("same", async () => {
      order.push("a");
    });
    const b = serializeByKey("same", async () => {
      order.push("b");
      throw new Error("b failed");
    });
    const c = serializeByKey("same", async () => {
      order.push("c");
    });

    await Promise.allSettled([a, b, c]);

    expect(order).toEqual(["a", "b", "c"]);
    await expect(b).rejects.toThrow("b failed");
    await expect(c).resolves.toBeUndefined();
  });

  it("serialises a long chain in call order", async () => {
    const order: number[] = [];

    await Promise.all(
      [0, 1, 2, 3, 4].map((n) =>
        serializeByKey("same", async () => {
          await flush();
          order.push(n);
        })
      )
    );

    expect(order).toEqual([0, 1, 2, 3, 4]);
  });

  it("releases the key once the queue drains, so it does not leak", async () => {
    // Asserting the queue is actually empty, not just that a later call still
    // resolves - chaining onto a stale promise resolves too, so the weaker
    // assertion would pass even if the key were never released.
    expect(__serializeByKeyQueueSize()).toBe(0);

    await serializeByKey("same", async () => "one");
    await flush();

    expect(__serializeByKeyQueueSize()).toBe(0);
    await expect(serializeByKey("same", async () => "two")).resolves.toBe("two");
  });

  it("does not accumulate keys across many distinct calls", async () => {
    await Promise.all(
      Array.from({ length: 50 }, (_, n) =>
        serializeByKey(`key-${n}`, async () => n)
      )
    );
    await flush();

    expect(__serializeByKeyQueueSize()).toBe(0);
  });

  it("holds exactly one entry per key while work is in flight", async () => {
    const blocker = deferred<void>();

    const a = serializeByKey("same", () => blocker.promise);
    const b = serializeByKey("same", async () => {});
    const c = serializeByKey("other", () => blocker.promise);

    await flush();
    // Two keys in flight, not one entry per queued call.
    expect(__serializeByKeyQueueSize()).toBe(2);

    blocker.resolve();
    await Promise.all([a, b, c]);
    await flush();

    expect(__serializeByKeyQueueSize()).toBe(0);
  });

  it("does not release the key while a queued task is still running", async () => {
    // The release has to be conditional. If finishing the first task cleared
    // the slot unconditionally, a task still queued behind it would be
    // abandoned: the next caller would see an empty queue and run alongside
    // it, which is the exact concurrency this is meant to prevent.
    const first = deferred<void>();
    const second = deferred<void>();
    const order: string[] = [];

    const a = serializeByKey("same", async () => {
      order.push("a:start");
      await first.promise;
      order.push("a:end");
    });

    const b = serializeByKey("same", async () => {
      order.push("b:start");
      await second.promise;
      order.push("b:end");
    });

    // Let A finish while B is still in flight - the moment a buggy release
    // would drop the key.
    first.resolve();
    await flush();
    expect(order).toEqual(["a:start", "a:end", "b:start"]);

    const c = serializeByKey("same", async () => {
      order.push("c:start");
    });

    await flush();
    // C must still be waiting on B, not running beside it.
    expect(order).toEqual(["a:start", "a:end", "b:start"]);

    second.resolve();
    await Promise.all([a, b, c]);

    expect(order).toEqual(["a:start", "a:end", "b:start", "b:end", "c:start"]);
  });
});
