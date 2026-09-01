"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { message } from "antd";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { CiShare2 } from "react-icons/ci";
import { HiOutlineLockClosed, HiCheck, HiOutlinePlay } from "react-icons/hi";
import { useFetchOverview } from "@/hooks/useCourseOverview";
import { useFetchAllResults, useFetchCourseTests } from "@/hooks/useCourseTopics";
import { useFetchCourseTracker, completeCourseTracking } from "@/hooks/useSubmit";
import { useAuthContext } from "@/components/AuthProvider/AuthContext";
import { buildMasteryPath, lockReason, MasteryTopic } from "@/lib/mastery";

const STATE_STYLES: Record<
  MasteryTopic["state"],
  { row: string; marker: string; label: string }
> = {
  mastered: {
    row: "border-gray-200 bg-white hover:border-gray-300",
    marker: "border-emerald-500 bg-emerald-500 text-white",
    label: "text-gray-500",
  },
  current: {
    row: "border-[#1C4E85] bg-[#1C4E85]/[0.04] hover:border-[#1C4E85]",
    marker: "border-[#1C4E85] bg-[#1C4E85] text-white",
    label: "text-[#1C4E85]",
  },
  available: {
    row: "border-gray-200 bg-white hover:border-gray-300",
    marker: "border-gray-300 bg-white text-gray-500",
    label: "text-gray-500",
  },
  locked: {
    row: "border-gray-200 bg-gray-50",
    marker: "border-gray-200 bg-gray-100 text-gray-400",
    label: "text-gray-400",
  },
};

const TopicRow = ({
  topic,
  courseId,
}: {
  topic: MasteryTopic;
  courseId: string;
}) => {
  const styles = STATE_STYLES[topic.state];
  const locked = topic.state === "locked";
  const reason = lockReason(topic);
  const href = `/dashboard/overview/${courseId}/topics?topicId=${topic.documentId}`;

  const body = (
    <div
      className={`relative flex gap-3 rounded-lg border p-3 transition ${styles.row} ${
        locked ? "cursor-not-allowed" : "cursor-pointer"
      } ${topic.isActive ? "ring-2 ring-[#1C4E85]/30" : ""}`}
    >
      <span
        className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-[11px] font-bold ${styles.marker}`}
      >
        {topic.state === "mastered" ? (
          <HiCheck className="text-sm" />
        ) : locked ? (
          <HiOutlineLockClosed className="text-xs" />
        ) : (
          topic.index + 1
        )}
      </span>

      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <p
            className={`text-sm font-semibold leading-snug ${
              locked ? "text-gray-400" : "text-gray-900"
            }`}
          >
            {topic.name}
          </p>
          {topic.duration && (
            <span className={`shrink-0 text-xs ${styles.label}`}>{topic.duration}</span>
          )}
        </div>

        <div className={`mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs ${styles.label}`}>
          {topic.isActive && (
            <span className="inline-flex items-center gap-1 font-semibold text-[#1C4E85]">
              <HiOutlinePlay className="text-sm" /> Now playing
            </span>
          )}

          {topic.state === "mastered" && topic.bestScore !== null && (
            <span className="font-semibold text-emerald-600">
              Mastered - best {Math.round(topic.bestScore)}%
            </span>
          )}

          {topic.state !== "mastered" && topic.hasTest && topic.bestScore !== null && (
            <span className="font-medium text-amber-600">
              Best {Math.round(topic.bestScore)}%
              {topic.passmark !== null ? ` of ${topic.passmark}% needed` : ""}
            </span>
          )}

          {topic.state !== "mastered" && topic.hasTest && topic.bestScore === null && (
            <span>
              Knowledge check{topic.passmark !== null ? ` - ${topic.passmark}% to pass` : ""}
            </span>
          )}

          {!topic.hasTest && !topic.isActive && <span>No knowledge check</span>}
        </div>

        {/* The gate has always existed - this is the first time it says why. */}
        {locked && reason && (
          <div className="mt-2 rounded-md bg-white px-2.5 py-2 text-xs leading-relaxed text-gray-500 ring-1 ring-gray-200">
            <p>{reason}</p>
            {topic.blockedBy && (
              <Link
                href={`/dashboard/overview/${courseId}/topics?topicId=${topic.blockedBy.documentId}&tab=knowledge`}
                className="mt-1.5 inline-block font-semibold text-[#1C4E85] hover:underline"
              >
                {topic.blockedBy.bestScore === null ? "Take the check" : "Retake the check"} &rarr;
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );

  if (locked) {
    return (
      <li
        onClick={() =>
          message.warning(reason || "Pass the previous knowledge check to unlock this topic.")
        }
      >
        {body}
      </li>
    );
  }

  return (
    <li>
      <Link href={href}>{body}</Link>
    </li>
  );
};

const TopicsCard: React.FC = () => {
  const { slug } = useParams();
  const courseId = String(slug);
  const searchParams = useSearchParams();
  const activeTopicId = searchParams.get("topicId");
  const { user } = useAuthContext();
  const userId = Number(user?.id);

  const { data: topicsData, isLoading, error } = useFetchOverview(courseId);
  const { data: courseTests } = useFetchCourseTests(courseId);
  const { data: allTestResults } = useFetchAllResults(userId);
  const { data: coursetrackerdata } = useFetchCourseTracker(userId, courseId);

  const courseTrackerEntry = coursetrackerdata?.data?.[0];
  const courseTrackerDocumentId = courseTrackerEntry?.attributes?.documentId;
  const courseTimeCompleted = courseTrackerEntry?.attributes?.time_completed;

  const [shared, setShared] = useState(false);

  const path = useMemo(
    () =>
      buildMasteryPath({
        topics: topicsData?.data?.attributes?.topicname?.data || [],
        tests: courseTests?.data || [],
        results: allTestResults?.data || [],
        activeDocumentId: activeTopicId,
      }),
    [topicsData, courseTests, allTestResults, activeTopicId]
  );

  useEffect(() => {
    if (path.percent < 100 || !courseTrackerDocumentId || courseTimeCompleted) return;

    completeCourseTracking(courseTrackerDocumentId).catch(() => {
      // Best-effort - the progress display already reflects 100% regardless.
    });
  }, [path.percent, courseTrackerDocumentId, courseTimeCompleted]);

  const handleShare = () => {
    if (typeof window === "undefined") return;

    navigator.clipboard?.writeText(window.location.href).then(
      () => {
        setShared(true);
        window.setTimeout(() => setShared(false), 1500);
      },
      () => message.error("Could not copy the link.")
    );
  };

  if (isLoading) {
    return (
      <div className="rounded-xl border border-gray-200 bg-white p-4">
        <Skeleton height={22} baseColor="#e0e0e0" highlightColor="#f0f0f0" />
        <div className="mt-4">
          <Skeleton
            height={58}
            count={6}
            className="mb-2"
            baseColor="#e0e0e0"
            highlightColor="#f5f5f5"
          />
        </div>
      </div>
    );
  }

  if (error) {
    message.error("Error fetching course topics. Please try again later.");
  }

  const percent = Math.round(path.percent);

  return (
    <div className="rounded-xl border border-gray-200 bg-white">
      <div className="border-b border-gray-200 p-4">
        <div className="flex items-baseline justify-between">
          <h2 className="text-sm font-bold uppercase tracking-wider text-gray-500">
            Your path
          </h2>
          <button
            type="button"
            onClick={handleShare}
            className="flex items-center gap-1 text-xs font-semibold text-gray-500 transition hover:text-gray-900"
          >
            <CiShare2 className="text-base" />
            {shared ? "Link copied" : "Share"}
          </button>
        </div>

        <p className="mt-2 text-sm text-gray-900">
          <span className="font-bold">{path.mastered}</span> of{" "}
          <span className="font-bold">{path.total}</span> topics mastered
        </p>

        <div className="mt-2 flex items-center gap-3">
          <div className="h-2 flex-1 overflow-hidden rounded-full bg-gray-200">
            <div
              className="h-full rounded-full bg-[#1C4E85] transition-[width] duration-500"
              style={{ width: `${percent}%` }}
            />
          </div>
          <span className="text-xs font-bold text-gray-600">{percent}%</span>
        </div>
      </div>

      {path.total === 0 ? (
        <p className="p-6 text-center text-sm text-gray-500">
          This course has no topics yet.
        </p>
      ) : (
        <ul className="flex flex-col gap-2 p-3">
          {path.topics.map((topic) => (
            <TopicRow key={String(topic.id)} topic={topic} courseId={courseId} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default TopicsCard;
