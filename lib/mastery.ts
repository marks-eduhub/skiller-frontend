/**
 * Derives the per-topic mastery state a course already implies.
 *
 * The gate itself is not new - components/Student/details/topics.tsx has
 * always refused to open a topic until the previous one's tests were passed.
 * What was missing is (a) the data to evaluate it correctly and (b) any way
 * for a student to see why something is locked or how close they are.
 *
 * Everything here is pure derivation over responses the app already fetches.
 */

export type TopicState = "mastered" | "current" | "available" | "locked";

export type Blocker = {
  name: string;
  documentId: string;
  bestScore: number | null;
  passmark: number | null;
};

export type MasteryTopic = {
  id: number | string;
  documentId: string;
  name: string;
  duration: string;
  index: number;
  state: TopicState;
  hasTest: boolean;
  attempts: number;
  bestScore: number | null;
  passmark: number | null;
  blockedBy: Blocker | null;
  /** The topic currently open in the player. */
  isActive: boolean;
};

export type MasteryPath = {
  topics: MasteryTopic[];
  total: number;
  mastered: number;
  /** Course completion, using the same formula the tracker has always used. */
  percent: number;
  /** First topic the student can actually work on, if any. */
  nextDocumentId: string | null;
};

/**
 * Flip to false to show the mastery path without enforcing it - topics stay
 * annotated with their state, but nothing is blocked.
 */
export const ENFORCE_MASTERY_GATE = true;

type Entry = { id?: number | string; attributes?: Record<string, any> } | null | undefined;

const attrs = (entry: Entry): Record<string, any> =>
  (entry && (entry.attributes ?? entry)) || {};

/** Relations arrive as { data: { id, attributes } } through the v4 shim. */
const relationDocumentId = (relation: any): string | null =>
  relation?.data?.attributes?.documentId ?? relation?.data?.documentId ?? null;

const relationId = (relation: any): number | string | null => relation?.data?.id ?? null;

const toNumber = (value: unknown): number | null => {
  const parsed = typeof value === "number" ? value : parseFloat(String(value ?? ""));
  return Number.isFinite(parsed) ? parsed : null;
};

const groupBy = <T,>(items: T[], key: (item: T) => string | null) => {
  const groups = new Map<string, T[]>();
  items.forEach((item) => {
    const group = key(item);
    if (!group) return;
    const bucket = groups.get(group);
    if (bucket) bucket.push(item);
    else groups.set(group, [item]);
  });
  return groups;
};

export const sortTopics = <T extends Entry>(topics: T[]): T[] =>
  // Copy first: the array is the one held in the react-query cache and
  // Array.sort mutates in place.
  [...topics].sort((a, b) => (attrs(a).position || 0) - (attrs(b).position || 0));

/**
 * Course completion percentage.
 *
 * Deliberately identical to the calculation topics.tsx has always run,
 * because hitting 100% writes a completion timestamp to the course tracker.
 * Changing the denominator here would change when that write fires.
 */
export const courseProgressPercent = (topics: Entry[], results: Entry[]): number => {
  if (!topics.length || !results.length) return 0;

  const completed = topics.filter((topic) => {
    const topicDocumentId = attrs(topic).documentId;
    const topicResults = results.filter(
      (result) => relationDocumentId(attrs(result).topic) === topicDocumentId
    );
    if (!topicResults.length) return false;

    const best = topicResults.reduce((max, current) =>
      (attrs(current).score || 0) > (attrs(max).score || 0) ? current : max
    );

    const passmark = toNumber(attrs(attrs(best).test?.data).passmark);
    if (passmark === null) return false;

    return (attrs(best).score || 0) >= passmark;
  });

  return (completed.length / topics.length) * 100;
};

export const buildMasteryPath = ({
  topics,
  tests,
  results,
  activeDocumentId,
  enforceGate = ENFORCE_MASTERY_GATE,
}: {
  topics: Entry[];
  tests: Entry[];
  results: Entry[];
  activeDocumentId?: string | null;
  enforceGate?: boolean;
}): MasteryPath => {
  const ordered = sortTopics(topics ?? []);
  const testsByTopic = groupBy(tests ?? [], (test) => relationDocumentId(attrs(test).topic));
  const resultsByTopic = groupBy(results ?? [], (result) =>
    relationDocumentId(attrs(result).topic)
  );

  let blocker: Blocker | null = null;
  let firstOpenDocumentId: string | null = null;
  const masteredIds = new Set<string>();

  const evaluated: MasteryTopic[] = ordered.map((topic, index) => {
    const topicAttrs = attrs(topic);
    const documentId: string = topicAttrs.documentId ?? "";
    const topicTests = testsByTopic.get(documentId) ?? [];
    const topicResults = resultsByTopic.get(documentId) ?? [];

    const scores = topicResults
      .map((result) => toNumber(attrs(result).score))
      .filter((score): score is number => score !== null);
    const bestScore = scores.length ? Math.max(...scores) : null;

    const passmarks = topicTests
      .map((test) => toNumber(attrs(test).passmark))
      .filter((mark): mark is number => mark !== null);
    const passmark = passmarks.length ? Math.max(...passmarks) : null;

    // Mastered means every test on the topic has a passing attempt, which is
    // what the original gate checked - just against the right topic.
    const mastered =
      topicTests.length > 0 &&
      topicTests.every((test) => {
        const required = toNumber(attrs(test).passmark);
        if (required === null) return false;

        return topicResults.some((result) => {
          const score = toNumber(attrs(result).score);
          const testId = relationId(attrs(result).test) ?? attrs(attrs(result).test?.data).id;
          return (
            String(testId) === String(test?.id) && score !== null && score >= required
          );
        });
      });

    const locked = enforceGate && blocker !== null;

    const entry: MasteryTopic = {
      id: topic?.id ?? documentId,
      documentId,
      name: topicAttrs.topicname ?? "Untitled topic",
      duration: topicAttrs.duration ?? "",
      index,
      state: mastered ? "mastered" : locked ? "locked" : "available",
      hasTest: topicTests.length > 0,
      attempts: topicResults.length,
      bestScore,
      passmark,
      blockedBy: locked ? blocker : null,
      isActive: Boolean(activeDocumentId) && documentId === activeDocumentId,
    };

    if (mastered) masteredIds.add(documentId);

    if (!locked && !mastered && !firstOpenDocumentId) {
      firstOpenDocumentId = documentId;
    }

    // A topic with no test cannot be failed, so it never blocks the next one -
    // matching how the original gate walked backwards past untested topics.
    if (!mastered && topicTests.length > 0 && !blocker) {
      blocker = { name: entry.name, documentId, bestScore, passmark };
    }

    return entry;
  });

  // "Current" marks where the path resumes, which is not necessarily the
  // topic being watched - a student can rewatch a mastered topic.
  if (firstOpenDocumentId) {
    const next = evaluated.find((topic) => topic.documentId === firstOpenDocumentId);
    if (next) next.state = "current";
  }

  return {
    topics: evaluated,
    total: evaluated.length,
    // Counted from the set, not from `state` - the active topic's state is
    // rewritten to "current" below and would otherwise drop out of the count.
    mastered: masteredIds.size,
    percent: courseProgressPercent(ordered, results ?? []),
    nextDocumentId: firstOpenDocumentId,
  };
};

/** Short human explanation for why a topic will not open. */
export const lockReason = (topic: MasteryTopic): string | null => {
  if (topic.state !== "locked" || !topic.blockedBy) return null;

  const { name, bestScore, passmark } = topic.blockedBy;

  if (bestScore === null) {
    return passmark !== null
      ? `Pass the "${name}" knowledge check (${passmark}% to pass) to unlock this.`
      : `Pass the "${name}" knowledge check to unlock this.`;
  }

  return passmark !== null
    ? `You scored ${Math.round(bestScore)}% on "${name}" - ${passmark}% unlocks this.`
    : `You have not passed "${name}" yet.`;
};
