"use client";
import React, { useEffect } from "react";
import { useParams, useSearchParams } from "next/navigation";
import VideoCard from "./videocard";
import SimilarCourses from "./similar";

import TopicsCard from "./topics";
import Tabs from "./tabs";
import { useAuthContext } from "@/components/AuthProvider/AuthContext";
import { startTopicProgress, useFetchCourseTracker } from "@/hooks/useSubmit";

const DetailsPage: React.FC = () => {
  const { slug } = useParams();
  const courseId = String(slug);
  const searchParams = useSearchParams();
  const topicId = searchParams.get("topicId");
  const { user } = useAuthContext();
  const userId = Number(user?.id);
  const { data: coursetrackerdata } = useFetchCourseTracker(userId, courseId);
  const courseTrackerId = coursetrackerdata?.data?.[0]?.id;

  useEffect(() => {
    if (!userId || !topicId || !courseTrackerId) {
      return;
    }
    startTopicProgress(userId, topicId, courseTrackerId);
  }, [userId, topicId, courseTrackerId]);

  return (
    <div className="flex-1 pb-6">
      {/* Reading column and path rail sit side by side, so the transcript,
          discussion and knowledge check stay in view next to the lesson
          instead of below the fold. */}
      <div className="flex flex-col gap-5 lg:flex-row lg:items-start">
        <main className="min-w-0 flex-1">
          <VideoCard />
          <Tabs />
        </main>

        <aside className="w-full shrink-0 lg:sticky lg:top-0 lg:max-h-[calc(100vh-2rem)] lg:w-[340px] lg:overflow-y-auto xl:w-[380px] hide-scrollbar">
          <TopicsCard />
        </aside>
      </div>

      <SimilarCourses />
    </div>
  );
};

export default DetailsPage;
