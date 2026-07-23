import React, { useState } from "react";
import Image from "next/image";
import "react-quill/dist/quill.snow.css";
import { message } from "antd";
import TopicFields from "./topicfields";
import {
  isValidUploadSize,
  isValidUploadType,
  TOPIC_RESOURCE_MAX_BYTES,
  TOPIC_RESOURCE_TYPES,
  TOPIC_VIDEO_MAX_BYTES,
  TOPIC_VIDEO_TYPES,
} from "@/lib/uploadRules";
import { TopicLink } from "@/hooks/useCourseTopics";

interface Topic {
  id: string | null;
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
  topicLinks: TopicLink[];
}

interface Step2Props {
  topics: Topic[];
  setTopics: (topics: Topic[]) => void;
  addTopic: () => void;
  updateTopic: (index: number, updatedFields: Partial<Topic>) => void;
  setIsTopicUploaded: (isTopicUploaded: boolean) => void;
}

const Step2: React.FC<Step2Props> = ({
  topics,
  addTopic,
  updateTopic,
  setIsTopicUploaded,
}) => {
  const [videoPreview, setVideoPreview] = useState<{
    [key: number]: string | null;
  }>({});

  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [topicId, setTopicId] = useState<string | null>(null);

  const toggleExpanded = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
    setTopicId(topics[index]?.id ? String(topics[index].id) : null);
  };

  const onVideoChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (file) {
      if (!isValidUploadType(file, TOPIC_VIDEO_TYPES)) {
        message.error("Please upload a supported video file: MP4, AVI, or WEBM.");
        return;
      }

      if (!isValidUploadSize(file, TOPIC_VIDEO_MAX_BYTES)) {
        message.error("Topic video must be 250MB or smaller.");
        return;
      }

      const videoPreviewURL = URL.createObjectURL(file);
      setVideoPreview((prev) => ({
        ...prev,
        [index]: videoPreviewURL,
      }));
      updateTopic(index, { topicVideo: file });
    } else {
      message.error("No topic video selected. Please try again.");
    }
  };

  const onFileChange = (index: number, file: File | null) => {
    if (file) {
      if (!isValidUploadType(file, TOPIC_RESOURCE_TYPES)) {
        message.error(
          "Unsupported file type. Please upload a PDF or PowerPoint."
        );
        return;
      }

      if (!isValidUploadSize(file, TOPIC_RESOURCE_MAX_BYTES)) {
        message.error("Topic resource must be 25MB or smaller.");
        return;
      }

      const currentResources = Array.isArray(topics[index].topicResources)
        ? topics[index].topicResources
        : [];

      const updatedResources = [...currentResources, file]; 
      updateTopic(index, { topicResources: updatedResources }); 
    }
  };
  

  const removeResource = (topicIndex: number, resourceIndex: number) => {
    const updatedResources = topics[topicIndex].topicResources.filter(
      (_: any, index: number) => index !== resourceIndex
    );
    updateTopic(topicIndex, { topicResources: updatedResources });
  };

  const removeLink = (topicIndex: number, linkId: string) => {
    const currentLinks = Array.isArray(topics[topicIndex].topicLinks)
      ? topics[topicIndex].topicLinks
      : [];
    const updatedLinks = currentLinks.filter((link) => link.id !== linkId);
    updateTopic(topicIndex, { topicLinks: updatedLinks });
  };

  const closeModal = () => {};

  return (
    <div className="sm:p-4">
      {topics?.map((topic, index) => (
        <div key={index} className="flex flex-col mt-5 mb-5 cursor-pointer">

          <div className="w-full sm:h-[100px] h-[90px] sm:bg-gray-300 bg-gray-100 sm:mt-3">
            <div
              onClick={() => toggleExpanded(index)}
              className="flex items-center justify-between p-9 relative"
            >
              <h1 className="font-bold text-[20px]">{topic.topicname}</h1>

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
                topicId={topicId ?? ""}
                index={index}
                onFieldChange={(field: any, value: any) =>
                  updateTopic(index, { [field]: value })
                }
                onVideoChange={(topicKey, e) => onVideoChange(topicKey, e)}
                videoPreview={videoPreview[index]}
                expandedIndex={expandedIndex}
                onClose={closeModal}
                onFileChange={(file) => onFileChange(index, file)} 
                setVideoPreview={(updatedPreview) =>
                  setVideoPreview((prev) => ({
                    ...prev,
                    [index]: updatedPreview,
                  }))
                }
                onRemoveResource={(resourceIndex) =>
                  removeResource(index, resourceIndex)
                }
                onRemoveLink={(linkId) => removeLink(index, linkId)}
                setIsTopicUploaded={setIsTopicUploaded}
                resourcePreview={Array.isArray(topic.topicResources) ? topic.topicResources : []}
                resourceIds={Array.isArray(topic.topicResources) ? topic.topicResources.map((resource: any) => resource?.id ?? "") : []}
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
