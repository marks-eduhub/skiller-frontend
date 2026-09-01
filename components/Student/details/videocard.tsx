"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import { message } from "antd";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useFetchTopicDetails } from "@/hooks/useCourseTopics";

const VideoCard: React.FC = () => {
  const searchParams = useSearchParams();
  const topicId = searchParams.get("topicId");
  const { data, isLoading, error } = useFetchTopicDetails(topicId ?? "");

  if (isLoading) {
    return (
      <div>
        <Skeleton
          className="aspect-video w-full rounded-xl"
          baseColor="#e0e0e0"
          highlightColor="#f0f0f0"
        />
        <div className="mt-4">
          <Skeleton width="60%" height={22} baseColor="#e0e0e0" highlightColor="#f0f0f0" />
        </div>
      </div>
    );
  }

  if (error) {
    message.error("Error fetching details. Please try again later.");
  }

  const topic = data?.data?.attributes;
  const videoFilePath = topic?.topicVideo?.data?.attributes?.url;
  const tutor = topic?.course?.data?.attributes?.tutor?.data?.attributes;
  const tutorName = tutor?.tutorname || "Skiller tutor";
  const tutorRole = tutor?.role || "";
  const topicname = topic?.topicname;
  const duration = topic?.duration;

  return (
    <article>
      <div className="overflow-hidden rounded-xl bg-black">
        {videoFilePath ? (
          // The player fills the reading column instead of the old fixed
          // 1000x500 box, so the lesson keeps its shape at every width.
          <video
            key={videoFilePath}
            controls
            controlsList="nodownload"
            className="aspect-video w-full bg-black"
          >
            <source src={videoFilePath} type="video/mp4" />
          </video>
        ) : (
          <div className="flex aspect-video w-full items-center justify-center bg-gray-900">
            <p className="text-sm font-semibold text-gray-400">
              No video for this topic yet.
            </p>
          </div>
        )}
      </div>

      <header className="mt-4">
        <h1 className="text-lg font-bold leading-snug text-gray-900 sm:text-xl">
          {topicname}
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          {tutorName}
          {tutorRole ? ` · ${tutorRole}` : ""}
          {duration ? ` · ${duration}` : ""}
        </p>
      </header>
    </article>
  );
};

export default VideoCard;
