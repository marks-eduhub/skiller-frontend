import React, { useState } from "react";
import Image from "next/image";
import "react-quill/dist/quill.snow.css";
import { message } from "antd";
import { uploadMedia } from "@/hooks/useCourseUpload";
import TopicFields from "./topicfields";

interface Topic {
  id: number | null;
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

interface Step2Props {
  topics: Topic[];
  setTopics: (topics: Topic[]) => void;
  addTopic: () => void;
  updateTopic: (index: number, updatedFields: Partial<Topic>) => void;
}

const Step2: React.FC<Step2Props> = ({ topics, addTopic, updateTopic }) => {
  const [videoPreview, setVideoPreview] = useState<{ [key: number]: string }>(
    {}
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [currentTopicIndex, setCurrentTopicIndex] = useState<number | null>(
    null
  );
  const [resourcePreview, setResourcePreview] = useState<File[]>([]);
  const [topicId, setTopicId] = useState<number | null>(null);
  const [topicVideo, setTopicVideo] = useState<File | null>(null);


  const toggleExpanded = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
    setCurrentTopicIndex(index);

    setTopicId(topics[index]?.id || null);
  };

  const onVideoChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
  
    if (file) {
      const validVideoTypes = ["video/mp4", "video/avi", "video/mov"];
      if (validVideoTypes.includes(file.type)) {
        const videoPreviewURL = URL.createObjectURL(file);
        setVideoPreview((prev) => ({
          ...prev,
          [index]: videoPreviewURL,
        }));
        updateTopic(index, { topicVideo: file });
  
        setTopicVideo(file); 
      } else {
        message.error("Please select a valid video file.");
      }
    } else {
      message.error("No topic video selected. Please try again.");
    }
  };
  
  
  const onFileChange = async (file: File | null) => {
    if (currentTopicIndex === null) return;
  
    if (file) {
      const validFileTypes = [
        "application/pdf",
        "application/vnd.ms-powerpoint",
        "application/vnd.openxmlformats-officedocument.presentationml.presentation",
      ];
  
      if (validFileTypes.includes(file.type)) {
        setResourcePreview((prev) => [...prev, file]);
        updateTopic(currentTopicIndex, {
          topicResources: file,
        });
      } else {
        message.error(
          "Unsupported file type. Please upload a PDF or PowerPoint."
        );
      }
    }
  };
  
  
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="sm:p-4">
      {topics?.map((topic, index) => (
        <div key={index} className="flex flex-col mt-5 mb-5 cursor-pointer">
          <h1 className="font-bold text-[20px]">{topic.topicname}</h1>

          <div className="w-full sm:h-[100px] h-[90px] sm:bg-gray-300 bg-gray-100 sm:mt-3">
            <div
              onClick={() => toggleExpanded(index)}
              className="flex items-center justify-between p-9 relative"
            >
              <h1 className="font-bold text-[20px]">Get Started</h1>

              <div
                className={`transition-transform duration-200 transform ${
                  expandedIndex === index ? "rotate-90" : ""
                }`}
              >
                <Image src="/edit.svg" alt="arrow" width={20} height={20} />
              </div>
            </div>
          </div>
          {expandedIndex === index && (
            <div className="p-4 w-full h-auto bg-gray-100 rounded-md overflow-hidden break-words">
              <TopicFields
                topic={topic}
                topicId={topicId}
                index={index}
                onFieldChange={(field: any, value: any) =>
                  updateTopic(index, { [field]: value })
                }
                onVideoChange={(topicKey, e) => onVideoChange(topicKey, e)}
                videoPreview={videoPreview[index]}
                expandedIndex={expandedIndex}
                resourcePreview={resourcePreview}
                onClose={closeModal}
                onFileChange={onFileChange}
                topicVideo={topicVideo}
              />
            </div>
          )}
        </div>
      ))}

      <div className="border border-gray w-full mt-6 p-3">
        <div
          className="w-full bg-gray-200 sm:h-[90px] h-[70px] cursor-pointer flex items-center justify-center gap-2"
          onClick={addTopic}
        >
          <Image src="/pluss.svg" alt="pluss" width={20} height={20} />
          <p>Add your topics</p>
        </div>
      </div>
    </div>
  );
};

export default Step2;
