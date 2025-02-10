"use client";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import { GrCloudUpload } from "react-icons/gr";
import FileModal from "./filemodal";
import CustomModal from "./modal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  topicDelete,
  topicEditing,
  topicUpload,
} from "@/hooks/useCourseTopics";
import { message } from "antd";
import { useParams, useSearchParams } from "next/navigation";
import { uploadMedia } from "@/hooks/useCourseUpload";
import { useAuthContext } from "@/Context/AuthContext";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

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

interface TopicFieldsProps {
  topic: Topic;
  topicId: number | null;
  onFieldChange: (
    field: keyof Topic,
    value: string | File | null | string[]
  ) => void;
  onVideoChange: (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
  onFileChange: (file: File | null) => void;
  videoPreview: string | undefined;
  expandedIndex: number | null;
  resourcePreview: File[];
  onClose: () => void;
  index: number;
  topicVideo: File | null;
}

const TopicFields: React.FC<TopicFieldsProps> = ({
  topic,
  onFieldChange,
  onVideoChange,
  onFileChange,
  videoPreview,
  resourcePreview,
  topicId,
  onClose,
  index,
  topicVideo,
}) => {
  const queryClient = useQueryClient();
  const { user } = useAuthContext();
  const tutorId = Number(user?.id);

  const { slug } = useParams();
  const searchParams = useSearchParams();
  const courseIdParam = searchParams.get("courseId");

  const courseId = slug
    ? Number(slug)
    : courseIdParam
    ? Number(courseIdParam)
    : 0;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ModalOpen, setModalOpen] = useState(false);
  const [selectedTopicId, setSelectedTopicId] = useState<number | null>(null);
  const [newVideoFile, setNewVideoFile] = useState<File | null>(null);
  const [newResourceFiles, setNewResourceFiles] = useState<File[]>([]);

  const handleTextChange = (text: string) => {};

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const imageHandler = useCallback(() => {
    setModalOpen(true);
  }, []);

  const closeModal = () => setIsModalOpen(false);

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: "1" }, { header: "2" }, { font: [] }],
          [{ size: [] }],
          ["bold", "italic", "underline", "strike", "blockquote"],
          [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
          ],
          ["link", "image"],
          ["clean"],
        ],
        handlers: {
          image: imageHandler,
        },
      },
    }),
    [imageHandler]
  );

  const { mutate: createTopic } = useMutation({
    mutationFn: async ({
      courseId,
      topicname,
      topicExpectations,
      topicdescription,
      newResources = [],
      newVideos = [],
      instructions,
      duration,
      tutorId,
    }: {
      courseId: number;
      topicname: string;
      topicExpectations: string;
      topicdescription: string;
      newResources: File[];
      newVideos: File[];
      instructions: string;
      duration: string;
      tutorId: number;
    }) => {
      const newResourceIds = await Promise.all(
        newResources.map(async (file) => {
          const id = await uploadMedia(file);
          return String(id); 
        })
      );

      let newVideoIds = null;
      if (newVideos.length > 0) {
        newVideoIds = String(await uploadMedia(newVideos[0]));
      }

      return await topicUpload(
        courseId,
        topicname,
        topicExpectations,
        topicdescription,
        newResourceIds, 
        newVideoIds, 
        instructions,
        duration,
        tutorId
      );
    },
    onSuccess: () => {
      message.success("New topic created successfully");
      queryClient.invalidateQueries({
        queryKey: ["course_topics", String(courseId)],
      });
      onClose();
    },
    onError: (err) => {
      message.error("Error creating new topic. Please try again later.");
    },
  });

  const { mutate: editTopic } = useMutation({
    mutationFn: async ({
      topicId,
      courseId,
      topicname,
      topicExpectations,
      topicdescription,
      existingResourceIds,
      existingVideoIds,
      newResources,
      newVideos,
      instructions,
      duration,
    }: {
      topicId: number;
      courseId: number;
      topicname: string;
      topicExpectations: string;
      topicdescription: string;
      existingResourceIds: number[];
      existingVideoIds: number[];
      newResources: File[];
      newVideos: File[];
      instructions: string;
      duration: string;
    }) => {
     
      const newResourceIds = await Promise.all(
        newResources.map(async (file) => {
          const id = await uploadMedia(file);
          return String(id);
        })
      );

      const newVideoIds = await Promise.all(
        newVideos.map(async (file) => {
          const id = await uploadMedia(file);
          return String(id);
        })
      );


      const allResourceIds: string[] = [
        ...existingResourceIds.map((id) => String(id)),
        ...newResourceIds,
      ];

      const allVideoIds =
        newVideoIds.length > 0
          ? String(newVideoIds[0])
          : existingVideoIds.length > 0
          ? String(existingVideoIds[0])
          : null;

      

      return await topicEditing(
        topicId,
        courseId,
        topicname,
        topicExpectations,
        topicdescription,
        allResourceIds,
        allVideoIds,
        instructions,
        duration
      );
    },
    onSuccess: () => {
      message.success("Topic data edited successfully");
      queryClient.invalidateQueries({
        queryKey: ["course_topics", String(courseId)],
      });
      onClose();
    },
    onError: (err) => {
      message.error("Error editing topic. Please try again later.");
    },
  });

 

  const handleSaveChanges = async () => {
    try {
      const existingVideoIds =
        !newVideoFile && topic.topicVideo
          ? [topic.topicVideo]
          : topic.topicVideo || [];
      const newVideos = newVideoFile ? [newVideoFile] : [];

      const existingResourceIds =
        topic.topicResources?.length || newResourceFiles.length
          ? topic.topicResources
          : [];
      const newResources = newResourceFiles;


      if (!topicId || topicId ===0 ) {
        createTopic({
          courseId,
          topicname: topic.topicname,
          topicExpectations: topic.topicExpectations,
          topicdescription: topic.topicdescription,
          newResources: resourcePreview, 
          newVideos: topicVideo ? [topicVideo] : [], 
          instructions: topic.resourceInstructions,
          duration: topic.duration,
          tutorId,
        });
      } else {
        editTopic({
          topicId,
          courseId,
          topicname: topic.topicname,
          topicExpectations: topic.topicExpectations,
          topicdescription: topic.topicdescription,
          existingResourceIds: existingResourceIds,
          existingVideoIds: existingVideoIds,
          newResources,
          newVideos,
          instructions: topic.resourceInstructions,
          duration: topic.duration,
        });
      }
    } catch (error) {
      message.error("Error saving changes");
    }
  };

  const { mutate: deleteTopics } = useMutation({
    mutationFn: async (topicId: number) => {
      return await topicDelete(topicId);
    },
    onSuccess: () => {
      message.success("Topic deleted successfully!");
      queryClient.invalidateQueries({
        queryKey: ["course_topics"],
      });
      closeModal();
      onClose();
    },
    onError: (err) => {
      message.error("Error deleting topic. Please try again later.");
    },
  });

  const handleDeleteClick = (topicId: number | null) => {
    if (topicId === null) {
      message.warning("You can't delete an unsaved topic.");
      return;
    }
    setSelectedTopicId(topicId);
    setIsModalOpen(true);
  };

  return (
    <div className="p-4 w-full h-auto bg-gray-100 rounded-md overflow-hidden break-words">
      <div className="flex flex-col sm:flex-row gap-5">
        <div className="mt-5 flex flex-col sm:flex-row sm:items-center w-full gap-3">
          <div className="flex flex-col sm:flex-row sm:items-center w-full">
            <label className="flex-shrink-0 sm:mb-0 mb-2">Topic name</label>
            <input
              type="text"
              value={topic?.topicname}
              onChange={(e) => onFieldChange("topicname", e.target.value)}
              className="border sm:ml-5 border-black sm:w-2/3 w-full bg-[#F9F9F9] px-3 py-2 outline-none"
            />
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center w-full">
            <label className="flex-shrink-0 sm:mb-0 mb-2 sm:ml-5">
              Topic duration
            </label>
            <input
              type="text"
              value={topic?.duration}
              onChange={(e) => onFieldChange("duration", e.target.value)}
              className="border sm:ml-5 border-black sm:w-2/3 w-full bg-[#F9F9F9] px-3 py-2 outline-none"
            />
          </div>
        </div>
      </div>

      <div className="sm:mb-10 mt-4">
        <label className="block text-sm font-medium mb-4 mt-6">
          Enter a brief description about the topic
        </label>
        <div className="bg-white w-full overflow-hidden">
          <ReactQuill
            placeholder="Write content here"
            value={topic?.topicdescription}
            onChange={(value) => onFieldChange("topicdescription", value)}
            className="bg-white h-[200px]"
          />
        </div>
      </div>

      <div className="sm:mb-6 sm:mt-10">
        <label className="block text-sm font-medium mb-4 sm:mt-20 mt-5">
          What will the student learn?
        </label>
        <div className="bg-white w-full overflow-hidden">
          <ReactQuill
            placeholder="Write content here"
            value={topic?.topicExpectations}
            onChange={(value) => onFieldChange("topicExpectations", value)}
            className="bg-white h-[200px]"
          />
        </div>
      </div>

      <div className="sm:mb-6 sm:mt-10">
        <label className="block sm:text-sm font-medium mb-6  mt-6">
          Add instructions on how to use the resources
        </label>
        <div className="bg-white w-full overflow-hidden">
          <ReactQuill
            modules={modules}
            formats={[
              "header",
              "font",
              "size",
              "bold",
              "italic",
              "underline",
              "strike",
              "blockquote",
              "list",
              "bullet",
              "indent",
              "link",
              "image",
            ]}
            className="bg-white h-[210px]"
            placeholder="Write content here..."
            value={topic?.resourceInstructions}
            onChange={(value) => onFieldChange("resourceInstructions", value)}
          />
          <div className="p-3 bg-gray-100 text-gray-700 text-sm rounded-md border-l-4 border-blue-500">
            <span className="font-semibold">Tip:</span> Click the
            <strong> Image icon</strong> in the toolbar to add PDFs,
            PowerPoints, or links as resources for this topic.
          </div>
        </div>
      </div>

      <div className="sm:mt-10 mt-5">
        <h1 className="mb-2 font-semibold">Resource Preview</h1>
        {Array.isArray(resourcePreview) && resourcePreview.length > 0 ? (
          resourcePreview.map((preview: any, index: any) => (
            <div key={index} className="border border-gray-300 p-2 rounded">
              {typeof preview === "string" && preview.startsWith("http") ? (
                <a
                  href={preview}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500"
                >
                  View Resource {index + 1}
                </a>
              ) : preview instanceof File ? (
                <p className="text-gray-500">Uploaded File: {preview.name}</p>
              ) : (
                <p className="text-gray-500">Invalid resource</p>
              )}
            </div>
          ))
        ) : (
          <p className="text-gray-500">No resources uploaded</p>
        )}
      </div>

      <div className="sm:mt-10 mt-5">
        <h1>Upload Video</h1>
        <div className="flex flex-col mt-5 items-center justify-center border border-dashed border-black p-3 relative h-[200px] rounded">
          {videoPreview ? (
            <div className="flex flex-col items-center">
              <video width="200" controls>
                <source src={videoPreview} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          ) : (
            <>
              <p className="text-gray-500 mb-5">Attach a video to your topic</p>

              <GrCloudUpload className="text-blue-800 w-10 h-10" />
              <span className="text-gray-500">
                Drag & drop files or
                <span className="text-blue-500 ml-1 cursor-pointer">
                  {" "}
                  Browse
                </span>
              </span>
            </>
          )}

          <input
            type="file"
            className="absolute inset-0 opacity-0 cursor-pointer"
            onChange={(e) => {
              if (topic.id !== null) {
                onVideoChange(topic.id, e);
              } else {
                onVideoChange(index, e);
              }
            }}
            accept="video/*"
          />
        </div>
      </div>

      <div className="flex justify-between items-center my-4">
        <button
          onClick={() => handleDeleteClick(topicId)}
          className="bg-black text-white rounded-md py-2 px-4"
        >
          Delete Topic
        </button>

        <button
          onClick={handleSaveChanges}
          className="border border-black justify-end mb-4 sm:mt-0 mt-4 py-2 px-4 flex items-center rounded w-[150px]"
        >
          Save changes
        </button>
      </div>

      <CustomModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={(id: number) => {
          deleteTopics(id);
        }}
        topicId={selectedTopicId}
      />

      {ModalOpen && (
        <FileModal
          closeModal={handleModalClose}
          handleFileChange={onFileChange}
          handleTextChange={handleTextChange}
          isModalOpen={ModalOpen}
        />
      )}
    </div>
  );
};

export default TopicFields;
