"use client"
import React, { useState } from "react";
import Image from "next/image";
import { useFetchCourseTopics } from "@/hooks/useCourses";
import { useParams } from "next/navigation";
import TopicModal from "./topicModal";
import Link from "next/link";
import { Topic } from "@/lib/types";
import { useFetchOverview } from "@/hooks/useCourseOverview";
import { HiChevronRight } from "react-icons/hi2";

const Topics = () => {
  const { slug } = useParams();
  const courseId = String(slug);
  const { data: topicData } = useFetchCourseTopics(courseId);
  const { data: courseOverview } = useFetchOverview(courseId);
  const [showModal, setShowModal] = useState(false);
  const [currentTopicId, setCurrentTopicId] = useState<string | number | null>(null);
  const courseRecordId = courseOverview?.data?.id;

  const topics = topicData?.data
    ?.map((topic: Topic) => ({
      id: topic.id,
      documentId: (topic as any).attributes.documentId,
      attributes: topic.attributes,
      name: topic.attributes.topicname || "Untitled Topic",
      position: topic.attributes.position || 0,
    }))
    ?.sort(
      (a: { position: number }, b: { position: number }) =>
        a.position - b.position
    );

  const currentTopic =
    topics?.find((topic: any) => topic.id === currentTopicId) || null;

  const handleModalOpen = (topic: any) => {
    setCurrentTopicId(topic.id);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  return (
    <div className="w-full rounded-2xl border border-gray-300 bg-[#E7E8EA] p-3 sm:p-4">
      <div className="flex flex-col gap-2.5">
        {topics && topics.length > 0 ? (
          topics.map((topic: any) => (
            <div
              key={topic.id}
              onClick={() => handleModalOpen(topic)}
              className="group flex w-full min-w-0 cursor-pointer items-center justify-between gap-3 rounded-xl bg-gray-700 px-4 py-3 transition hover:-translate-y-0.5 hover:shadow-md sm:px-5"
            >
              <h1 className="min-w-0 flex-1 truncate text-sm font-medium text-white sm:text-base">
                {topic.name}
              </h1>
              <HiChevronRight className="h-4 w-4 shrink-0 text-white/60 transition group-hover:translate-x-0.5 group-hover:text-white" />
            </div>
          ))
        ) : (
          <div className="rounded-xl border border-dashed border-gray-400 py-10 text-center text-gray-500">
            No topics available for this course.
          </div>
        )}
      </div>

      <Link href={`/tutor/dashboard/topicUpload?courseId=${courseRecordId || courseId}`}>
        <div className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-gray-300 px-4 py-3 cursor-pointer transition hover:-translate-y-0.5 hover:shadow-sm">
          <Image src="/pluss.svg" alt="plus" width={18} height={18} />
          <h1 className="text-sm font-semibold text-black sm:text-base">Add a topic</h1>
        </div>
      </Link>

      <TopicModal
        isOpen={showModal}
        onClose={handleModalClose}
        courseId={courseId}
        topicId={(currentTopic as any)?.documentId}
        currentTopic={currentTopic}
      />
    </div>
  );
};

export default Topics;
