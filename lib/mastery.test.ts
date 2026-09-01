import { describe, expect, it } from "vitest";
import {
  buildMasteryPath,
  courseProgressPercent,
  lockReason,
} from "./mastery";

const topic = (documentId: string, position: number, topicname: string) => ({
  id: `n-${documentId}`,
  attributes: { documentId, position, topicname, duration: "05:00" },
});

const test = (id: number, topicDocumentId: string, passmark: number) => ({
  id,
  attributes: {
    passmark,
    topic: { data: { id: `n-${topicDocumentId}`, attributes: { documentId: topicDocumentId } } },
  },
});

const result = (topicDocumentId: string, testId: number, score: number, passmark: number) => ({
  id: `${topicDocumentId}-${testId}-${score}`,
  attributes: {
    score,
    topic: { data: { id: `n-${topicDocumentId}`, attributes: { documentId: topicDocumentId } } },
    test: { data: { id: testId, attributes: { passmark } } },
  },
});

const threeTopics = [topic("a", 1, "Intro"), topic("b", 2, "Loops"), topic("c", 3, "Functions")];
const threeTests = [test(1, "a", 70), test(2, "b", 70), test(3, "c", 70)];

describe("buildMasteryPath", () => {
  it("orders topics by position rather than fetch order", () => {
    const path = buildMasteryPath({
      topics: [topic("c", 3, "Functions"), topic("a", 1, "Intro"), topic("b", 2, "Loops")],
      tests: [],
      results: [],
    });

    expect(path.topics.map((entry) => entry.documentId)).toEqual(["a", "b", "c"]);
  });

  it("does not mutate the topics array it is given", () => {
    const source = [topic("c", 3, "Functions"), topic("a", 1, "Intro")];
    buildMasteryPath({ topics: source, tests: [], results: [] });

    expect(source.map((entry) => entry.attributes.documentId)).toEqual(["c", "a"]);
  });

  it("locks every topic after the first unpassed test", () => {
    const path = buildMasteryPath({
      topics: threeTopics,
      tests: threeTests,
      results: [result("a", 1, 90, 70), result("b", 2, 45, 70)],
    });

    expect(path.topics.map((entry) => entry.state)).toEqual([
      "mastered",
      "current",
      "locked",
    ]);
    expect(path.topics[2].blockedBy).toMatchObject({ name: "Loops", bestScore: 45, passmark: 70 });
  });

  it("keeps the best attempt, not the latest one", () => {
    const path = buildMasteryPath({
      topics: threeTopics,
      tests: threeTests,
      results: [result("a", 1, 90, 70), result("a", 1, 40, 70)],
    });

    expect(path.topics[0].state).toBe("mastered");
    expect(path.topics[0].bestScore).toBe(90);
    expect(path.topics[0].attempts).toBe(2);
  });

  it("requires every test on a topic to be passed", () => {
    const path = buildMasteryPath({
      topics: threeTopics,
      tests: [...threeTests, test(4, "a", 60)],
      results: [result("a", 1, 90, 70)],
    });

    expect(path.topics[0].state).toBe("current");
    expect(path.topics[1].state).toBe("locked");
  });

  it("never blocks on a topic that has no test", () => {
    const path = buildMasteryPath({
      topics: threeTopics,
      tests: [test(3, "c", 70)],
      results: [],
    });

    expect(path.topics.map((entry) => entry.state)).toEqual([
      "current",
      "available",
      "available",
    ]);
  });

  it("annotates without locking when the gate is disabled", () => {
    const path = buildMasteryPath({
      topics: threeTopics,
      tests: threeTests,
      results: [result("a", 1, 20, 70)],
      enforceGate: false,
    });

    expect(path.topics.some((entry) => entry.state === "locked")).toBe(false);
    expect(path.topics[0].bestScore).toBe(20);
  });

  it("marks the topic in the url as active without stealing the mastered state", () => {
    const path = buildMasteryPath({
      topics: threeTopics,
      tests: threeTests,
      results: [result("a", 1, 90, 70)],
      activeDocumentId: "a",
    });

    expect(path.topics[0].state).toBe("mastered");
    expect(path.topics[0].isActive).toBe(true);
    expect(path.topics[1].state).toBe("current");
    expect(path.mastered).toBe(1);
  });

  it("reports course completion on the same formula the tracker uses", () => {
    const results = [result("a", 1, 90, 70), result("b", 2, 80, 70)];

    expect(courseProgressPercent(threeTopics, results)).toBeCloseTo(66.67, 1);
    expect(buildMasteryPath({ topics: threeTopics, tests: threeTests, results }).percent).toBeCloseTo(
      66.67,
      1
    );
  });

  it("survives empty and malformed input", () => {
    expect(buildMasteryPath({ topics: [], tests: [], results: [] }).total).toBe(0);
    expect(courseProgressPercent([], [])).toBe(0);

    const path = buildMasteryPath({
      topics: threeTopics,
      tests: [{ id: 9, attributes: { passmark: null, topic: { data: null } } }],
      results: [{ id: 1, attributes: { score: null, topic: { data: null }, test: { data: null } } }],
    });

    expect(path.topics.every((entry) => entry.state !== "locked")).toBe(true);
  });
});

describe("lockReason", () => {
  it("explains the gap when there is an attempt", () => {
    const path = buildMasteryPath({
      topics: threeTopics,
      tests: threeTests,
      results: [result("a", 1, 90, 70), result("b", 2, 45, 70)],
    });

    expect(lockReason(path.topics[2])).toBe('You scored 45% on "Loops" - 70% unlocks this.');
  });

  it("explains the gap when the test was never attempted", () => {
    const path = buildMasteryPath({ topics: threeTopics, tests: threeTests, results: [] });

    expect(lockReason(path.topics[1])).toBe(
      'Pass the "Intro" knowledge check (70% to pass) to unlock this.'
    );
  });

  it("returns nothing for a topic that is not locked", () => {
    const path = buildMasteryPath({ topics: threeTopics, tests: threeTests, results: [] });

    expect(lockReason(path.topics[0])).toBeNull();
  });
});
