"use client";
import React, { useState, useEffect, useCallback } from "react";
import TopicFields from "../uploadCourse/topicfields";
import { message } from "antd";
import { uploadMedia } from "@/hooks/useCourseUpload";

interface Topic {
  id: number;
  topicname: string;
  topicdescription: string;
  resourceInstructions: string;
  topicExpectations: string;
  duration: string;
  topicResources: any;
  topicVideo: any;
  topicresource: string;
  topicexpectation: string;
  topicduration: string;
  instructions: string;
  videoFile: File | null;
  resourceFile: File | null;
}

const defaultTopic = {
  id: 0, 
  topicname: "",
  topicdescription: "",
  topicExpectations: "",
  topicresource: "",
  duration: "",
  resourceInstructions: "",
  topicVideo: null,
  topicResources: [] as string[],
  topicexpectation: "",
  topicduration: "",
  instructions: "",
  videoFile: null,
  resourceFile: null,
};



interface TopicModalProps {
  isOpen: boolean;
  onClose: () => void;
  courseId: number;
  topicId?: number;
  currentTopic?: any;
}
const TopicModal: React.FC<TopicModalProps> = ({
  isOpen,
  onClose,
  topicId,
  currentTopic,
}) => {
  const [topic, setTopic] = useState({ ...defaultTopic });
  const [videoPreview, setVideoPreview] = useState("");
  const [topics, setTopics] = useState<Topic[]>([]);
  const [newVideoFile, setNewVideoFile] = useState<File | null>(null);
  const [resourcePreview, setResourcePreview] = useState<File[]>([]);
  const [index, setIndex] = useState(0);

 
  useEffect(() => {
    if (currentTopic && currentTopic.attributes) {
      const videoData = currentTopic.attributes.topicVideo.data;
      const firstTopicVideoUrl =
        videoData && videoData.length > 0
          ? `${process.env.NEXT_PUBLIC_API_BASE_URL}${videoData[0].attributes.url}`
          : "";
      const videoId =
        videoData && videoData.length > 0 ? videoData[0].id : null;

      const resourceData = currentTopic.attributes.topicResources;
      const resourceIds = resourceData?.data
        ? resourceData.data.map((res: { id: any }) => res.id)
        : [];
      const resourceUrls = resourceData?.data
        ? resourceData.data.map(
            (res: { attributes: { url: any } }) =>
              `${process.env.NEXT_PUBLIC_API_BASE_URL}${res.attributes.url}`
          )
        : [];

      setTopic((prev) => ({
        ...prev,
        topicname: currentTopic.attributes.topicname || "",
        topicdescription: currentTopic.attributes.topicdescription || "",
        topicExpectations: currentTopic.attributes.topicExpectations || "",
        duration: currentTopic.attributes.duration || "",
        resourceInstructions:
          currentTopic.attributes.resourceInstructions || "",
        topicVideo: videoId,
        topicResources: resourceIds,
      }));

      setVideoPreview(firstTopicVideoUrl);
      setResourcePreview(resourceUrls);
    }
  }, [currentTopic]);

  const onFieldChange = useCallback((field: any, value: any) => {
    setTopic((prev) => ({ ...prev, [field]: value }));
  }, []);

 
  const onVideoChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const validVideoTypes = ["video/mp4", "video/avi", "video/mov"];
      if (validVideoTypes.includes(file.type)) {
        setNewVideoFile(file);
        setVideoPreview(URL.createObjectURL(file));
      } else {
        message.error("Please select a valid video file.");
      }
    } else {
      message.error("No topic video selected. Please try again.");
    }
  };

  const onFileChange = async (file: File | null) => {
    if (file && topicId) {
      const validFileTypes = [
        "application/pdf",
        "application/vnd.openxmlformats-officedocument.presentationml.presentation",
        "application/vnd.ms-powerpoint",
      ];

      if (validFileTypes.includes(file.type)) {
        try {
          const resourceId = await uploadMedia(file);
          if (resourceId) {
            setTopic((prev) => ({
              ...prev,
              topicResources: [...(prev.topicResources || []), resourceId],
            }));
            setResourcePreview((prev) => [...prev, file]);
          }
        } catch (error) {
          message.error("Failed to upload the resource.");
        }
      } else {
        message.error(
          "Unsupported file type. Please upload a PDF or PowerPoint."
        );
      }
    }
  };

  return (
    <div
      className={`fixed inset-0 bg-opacity-50 z-50 flex items-center justify-end ${
        isOpen ? "translate-x-0" : "translate-x-full"
      } transition-transform duration-300`}
    >
      <div className="w-[600px] bg-white h-full p-6 shadow-lg overflow-y-auto">
        <button
          onClick={() => {
            onClose();
          }}
          className="text-gray-600 text-sm px-4 py-2 border border-black rounded-md mb-4"
        >
          Close
        </button>
        <h2 className="text-xl font-semibold mb-4 flex items-center justify-center">
          Edit Topic
        </h2>
        <div className="overflow-y-auto">
          <TopicFields
            topic={topic}
            topicId={topicId ?? 0}
            onFieldChange={onFieldChange}
            onVideoChange={onVideoChange}
            onFileChange={(file) => onFileChange(file)}
            videoPreview={videoPreview}
            resourcePreview={resourcePreview}
            expandedIndex={null}
            onClose={onClose}
            topicVideo={newVideoFile}
            index={index}

          />
        </div>
      </div>
    </div>
  );
};

export default TopicModal;
