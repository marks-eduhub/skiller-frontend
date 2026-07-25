/**
 * Runs tasks one at a time per key, queueing anything that arrives while a task
 * with the same key is still in flight. Tasks under different keys are
 * unaffected and still run concurrently.
 *
 * This exists for check-then-act API calls - read whether a record exists, then
 * create it if it doesn't. Two overlapping runs both read "none" and both
 * create, which is how duplicate rows appear. Queueing per key makes the read
 * and the write atomic from this client's point of view.
 *
 * Scope: this map is module state, so it spans one JavaScript context - a
 * single browser tab. It cannot stop a second tab, a retry from a different
 * device, or another app instance from racing, so the server still has to
 * enforce uniqueness independently.
 *
 * Note this module is reachable from client components that Next.js also
 * renders on the server. Today every caller runs from an effect or an event
 * handler, so it is never entered during SSR, but if that changes the map
 * becomes per-server-process and shared across concurrent users' requests -
 * one user's write would then block another's. Keep callers client-only.
 */
const queues = new Map<string, Promise<unknown>>();

export const serializeByKey = <T,>(
  key: string,
  task: () => Promise<T>
): Promise<T> => {
  const previous = queues.get(key) ?? Promise.resolve();

  // Run task on both settle paths, so one failure does not wedge the queue for
  // every later caller sharing this key. The arrow matters: passing `task`
  // directly would hand it the previous task's result or rejection reason as an
  // argument, which is a trap for any task that takes parameters.
  const run = previous.then(
    () => task(),
    () => task()
  );

  // Release inside the returned chain rather than via a separate `.then` on it.
  // A separate handler would mark this promise as handled and silently suppress
  // unhandled-rejection warnings for fire-and-forget callers; rethrowing here
  // keeps the rejection observable.
  const next: Promise<T> = run.then(
    (value) => {
      release();
      return value;
    },
    (error) => {
      release();
      throw error;
    }
  );

  function release() {
    // Only clear the slot if nothing else queued behind us in the meantime,
    // otherwise we would drop a queue that is still in use.
    if (queues.get(key) === next) {
      queues.delete(key);
    }
  }

  queues.set(key, next);

  return next;
};

/** Test seam: the queue is module state, so tests need to reset between cases. */
export const __resetSerializeByKey = () => {
  queues.clear();
};

/**
 * Test seam: lets tests assert the queue actually drains. Without this the
 * "does not leak" property is unobservable, since chaining onto a stale
 * promise still resolves and looks identical from the outside.
 */
export const __serializeByKeyQueueSize = () => queues.size;
