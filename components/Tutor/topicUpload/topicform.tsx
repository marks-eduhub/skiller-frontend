import React, { useState } from "react";
import Image from "next/image";
import TopicFields from "../uploadCourse/topicfields";
import CustomModal from "../topicUpload/modal";
import { uploadMedia } from "@/hooks/useCourseUpload";
import { message } from "antd";

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

interface TopicProps {
  topic: Topic;
  onFieldChange: (field: keyof Topic, value: string | File | null) => void;
}

const TopicForm: React.FC<TopicProps> = ({ topic, onFieldChange }) => {
  const [expanded, setExpanded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [videoPreview, setVideoPreview] = useState<string>("");
  const [resourcePreview, setResourcePreview] = useState<File[]>([]);
  const [newVideoFile, setNewVideoFile] = useState<File | null>(null);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

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
        onFieldChange("topicVideo", file);
      } else {
        message.error("Please select a valid video file.");
      }
    } else {
      message.error("No topic video selected. Please try again.");
    }
  };

  const onFileChange = async (file: File | null) => {
    if (file) {
      const validFileTypes = [
        "application/pdf",
        "application/vnd.openxmlformats-officedocument.presentationml.presentation",
        "application/vnd.ms-powerpoint",
      ];

      if (validFileTypes.includes(file.type)) {
        try {
          const resourceId = await uploadMedia(file);
          if (resourceId) {
            onFieldChange("topicResources", resourceId);
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

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const confirmDelete = () => {
    closeModal();
  };

  return (
    <div className="flex flex-col mt-5 mb-5 cursor-pointer">
      <h1 className="font-semibold mb-1 text-[20px]">{topic.topicname}</h1>
      <div className="w-full h-[100px] bg-[#E9E9E9] mt-3">
        <div
          onClick={toggleExpanded}
          className="flex items-center justify-between p-9 relative"
        >
          <h1 className="font-bold text-[20px]">Get Started</h1>
          <div
            className={`transition-transform duration-200 transform ${
              expanded ? "rotate-90" : ""
            }`}
          >
            <Image src="/closedarrow.svg" alt="arrow" width={10} height={10} />
          </div>
        </div>
      </div>

      {expanded && (
       
        <TopicFields
          topic={topic}
          onFieldChange={onFieldChange}
          onClose={closeModal}
          expandedIndex={null}
          topicId={topic.id}
          onVideoChange={onVideoChange}
          onFileChange={(file) => onFileChange(file)}
          videoPreview={videoPreview}
          resourcePreview={resourcePreview}
        />
      )}

      <CustomModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={confirmDelete}
        topicId={topic.id}
      />
    </div>
  );
};

export default TopicForm;
