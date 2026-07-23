"use client";
import React, { useState, useEffect, useCallback } from "react";
import TopicFields from "../uploadCourse/topicfields";
import { message } from "antd";
import { uploadMedia } from "@/hooks/useCourseUpload";
import {
  isValidUploadSize,
  isValidUploadType,
  TOPIC_RESOURCE_MAX_BYTES,
  TOPIC_RESOURCE_TYPES,
  TOPIC_VIDEO_MAX_BYTES,
  TOPIC_VIDEO_TYPES,
} from "@/lib/uploadRules";
import { TopicLink } from "@/hooks/useCourseTopics";

const defaultTopic = {
  id: "",
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
  topicLinks: [] as TopicLink[],
};

type TopicModalState = {
  id: string;
  topicname: string;
  topicdescription: string;
  topicExpectations: string;
  topicresource: string;
  duration: string;
  resourceInstructions: string;
  topicVideo: string | null;
  topicResources: Array<string | number>;
  topicexpectation: string;
  topicduration: string;
  instructions: string;
  videoFile: File | null;
  resourceFile: File | null;
  topicLinks: TopicLink[];
};

interface TopicModalProps {
  isOpen: boolean;
  onClose: () => void;
  courseId: string;
  topicId?: string;
  currentTopic?: any;
}
const TopicModal: React.FC<TopicModalProps> = ({
  isOpen,
  onClose,
  topicId,
  currentTopic,
}) => {
  const [topic, setTopic] = useState<TopicModalState>({ ...defaultTopic });
  const [videoPreview, setVideoPreview] = useState("");
  const [newVideoFile, setNewVideoFile] = useState<File | null>(null);
  const [resourcePreview, setResourcePreview] = useState<Array<File | string>>([]);
  const [index] = useState(0);
  const [videoId, setVideoId] = useState("");
  const [resourceIds, setResourceIds] = useState<Array<string | number>>([]);
  const [isTopicUploaded, setIsTopicUploaded] = useState(false);

  useEffect(() => {
    if (currentTopic && currentTopic.attributes) {
      const videoRelation = currentTopic.attributes.topicVideo?.data;
      const videoData = Array.isArray(videoRelation)
        ? videoRelation[0]
        : videoRelation;
      const firstTopicVideoUrl =
        videoData
          ? `${videoData.attributes.url}`
          : "";
      const videoId =
        videoData ? String(videoData.id) : "";
  
      const resourceData = currentTopic.attributes.topicResources;
      const resourceIds = resourceData?.data
        ? resourceData.data.map((res: { id: any }) => res.id)
        : [];
      const resourceUrls = resourceData?.data
        ? resourceData.data.map(
            (res: { attributes: { url: any } }) =>
              `${res.attributes.url}`
          )
        : [];
  
      setVideoId(videoId);
      setResourceIds(resourceIds);

      const linkData = currentTopic.attributes.topicLinks;
      const links: TopicLink[] = linkData?.data
        ? linkData.data.map((link: { id: any; attributes: { label: any; url: any } }) => ({
            id: String(link.id),
            label: link.attributes?.label || link.attributes?.url,
            url: link.attributes?.url,
          }))
        : [];

      const durationBackend = currentTopic.attributes.duration;
      let hh = "00", mm = "00", ss = "00";
      if (durationBackend) {
        const [hours, minutes, secondsMs] = durationBackend.split(":");
        const [seconds] = secondsMs.split(".");
        hh = hours || "00";
        mm = minutes || "00";
        ss = seconds || "00";
      }
  
      setTopic((prev) => ({
        ...prev,
        topicname: currentTopic.attributes.topicname || "",
        topicdescription: currentTopic.attributes.topicdescription|| "",
        topicExpectations: currentTopic.attributes.topicExpectations.split('\n').join('<br/>')  || "",
        duration: `${hh}:${mm}:${ss}`,
        resourceInstructions:
          currentTopic.attributes.resourceInstructions || "",
        topicVideo: videoId,
        topicResources: resourceIds,
        topicLinks: links,
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
      if (!isValidUploadType(file, TOPIC_VIDEO_TYPES)) {
        message.error("Please upload a supported video file: MP4, AVI, or WEBM.");
        return;
      }

      if (!isValidUploadSize(file, TOPIC_VIDEO_MAX_BYTES)) {
        message.error("Topic video must be 250MB or smaller.");
        return;
      }

      setNewVideoFile(file);
      setVideoPreview(URL.createObjectURL(file));
    } else {
      message.error("No topic video selected. Please try again.");
    }
  };

  const onFileChange = async (file: File | null) => {
    if (file && topicId) {
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
            topicId={topicId ?? ""}
            onFieldChange={onFieldChange}
            onVideoChange={onVideoChange}
            onFileChange={(file) => onFileChange(file)}
            videoPreview={videoPreview}
            resourcePreview={resourcePreview}
            expandedIndex={null}
            onClose={onClose}
            index={index}
            resourceIds={resourceIds}
            setVideoPreview={(updatedPreview) =>
              setVideoPreview(updatedPreview ?? "")
            }
            onRemoveResource={(resourceIndex) =>
              setResourcePreview((prev) =>
                prev.filter((_, i) => i!== resourceIndex)
              )
            }
            onRemoveLink={(linkId) =>
              setTopic((prev) => ({
                ...prev,
                topicLinks: prev.topicLinks.filter((link) => link.id !== linkId),
              }))
            }
            setIsTopicUploaded={setIsTopicUploaded}

          />
        </div>
      </div>
    </div>
  );
};

export default TopicModal;
