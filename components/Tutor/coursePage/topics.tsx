"use client"
import React, { useState } from "react";
import Image from "next/image";
import { useFetchCourseTopics } from "@/hooks/useCourses";
import { useParams } from "next/navigation";
import TopicModal from "./topicModal";
import Link from "next/link";
import { Topic } from "@/lib/types";

const Topics = () => {
  const { slug } = useParams();
  const courseId = Number(slug);
  const { data: topicData } = useFetchCourseTopics(courseId);
  const [showModal, setShowModal] = useState(false);
  const [currentTopic, setCurrentTopic] = useState<Topic | null>(null);

  const topics = topicData?.data
    ?.map((topic: Topic) => ({
      id: topic.id,
      attributes: topic.attributes,
      name: topic.attributes.topicname || "Untitled Topic",
      position: topic.attributes.position || 0,
    }))
    ?.sort(
      (a: { position: number }, b: { position: number }) =>
        a.position - b.position
    );


  const handleModalOpen = (topic: any) => {
    setCurrentTopic(topic);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  return (
    <div>
      {topics && topics.length > 0 ? (
        topics.map((topic: any) => (
          <div key={topic.id}>
            <div className="relative w-full bg-[#E7E8EA] py-2 px-4">
              <div className="w-full h-[90px] mt-4 bg-gray-700 pt-7">
                <div
                  className="flex items-center justify-between px-4 cursor-pointer"
                  onClick={() => handleModalOpen(topic)}
                >
                  <h1 className="text-white">{topic.name}</h1>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center text-gray-500 py-10">
          No topics available for this course.
        </div>
      )}
      <div className="relative w-full bg-[#E7E8EA] pt-2 pb-4 px-4 mb-4">
        <Link href={`/tutor/dashboard/topicUpload?courseId=${courseId}`}>
          <div className="w-full h-[90px] mt-4 gap-2 bg-gray-300 flex items-center justify-center cursor-pointer">
            <Image src="/pluss.svg" alt="plus" width={20} height={20} />
            <h1 className="text-black text-[20px]">Add a topic</h1>
          </div>
        </Link>
      </div>
      <TopicModal
        isOpen={showModal}
        onClose={handleModalClose}
        courseId={courseId}
        topicId={currentTopic?.id}
        currentTopic={currentTopic}
      />
    </div>
  );
};

export default Topics;
