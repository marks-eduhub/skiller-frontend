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
    startTopicProgress(userId, Number(topicId), courseTrackerId);
  }, [userId, topicId, courseTrackerId]);

  return (
    <div className="flex-1 overflow-y-auto overflow-x-hidden">
      <div className="flex sm:flex-row flex-col gap-3 cursor-pointer sm:bg-gray-100 py-4 sm:px-3 max-w-full">
        <VideoCard />
        <TopicsCard />
      </div>
      <Tabs />
      <SimilarCourses />
    </div>
  );
};

export default DetailsPage;
