"use client";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import { GrCloudUpload } from "react-icons/gr";
import FileModal from "./filemodal";
import CustomModal from "./modal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  deleteTopicResource,
  deleteTopicVideo,
  topicDelete,
  topicEditing,
  topicUpload,
} from "@/hooks/useCourseTopics";
import { message } from "antd";
import { useParams, usePathname, useSearchParams } from "next/navigation";
import { uploadMedia } from "@/hooks/useCourseUpload";
import { useAuthContext } from "@/components/AuthProvider/AuthContext";
import VideoModal from "./videoModal";
import ResourceModal from "./resourceModal";
import { useCourseContext } from "@/Context/CourseContext";
import { useFetchTutors } from "@/hooks/useCourses";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
const DotPulseWrapper = dynamic(() => import("@/hooks/pulse"), { ssr: false });

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
}

interface TopicFieldsProps {
  topic: Topic;
  topicId: string;
  onFieldChange: (
    field: keyof Topic,
    value: string | File | null | string[]
  ) => void;
  onVideoChange: (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
  onFileChange: (file: File | null) => void;
  videoPreview: string | null;
  expandedIndex: number | null;
  resourcePreview: Array<File | string>;
  onClose: () => void;
  index: number;
  setVideoPreview: (updatedPreview: string | null) => void;
  onRemoveResource: (resourceIndex: number) => void;
  resourceIds: Array<string | number>;
  setIsTopicUploaded: (isTopicUploaded: boolean) => void;
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
  setVideoPreview,
  onRemoveResource,
  resourceIds,
  setIsTopicUploaded,
}) => {
  const queryClient = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const resourceFileInputRef = useRef<HTMLInputElement>(null);
  const { user } = useAuthContext();
  const pathname = usePathname();
  const { slug } = useParams();
  const searchParams = useSearchParams();
  const courseIdParam = searchParams.get("courseId");
  const { courseId: contextCourseId } = useCourseContext();
  const isUploadingCourse = pathname === "/tutor/dashboard/uploadCourse";
  const { data } = useFetchTutors();
  let courseId: string = "";
  if (isUploadingCourse) {
    courseId = contextCourseId ? String(contextCourseId) : "";
  } else {
    courseId = slug ? String(slug) : courseIdParam ? String(courseIdParam) : "";
  }
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ModalOpen, setModalOpen] = useState(false);
  const [selectedTopicId, setSelectedTopicId] = useState<string | null>(null);
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [resourceModalOpen, setResourceModalOpen] = useState(false);
  const [resourceIndex, setResourceIndex] = useState<number | null>(null);
  const [selectedVideoId, setSelectedVideoId] = useState("");
  const [selectedResourceId, setSelectedResourceId] = useState<string | null>(null);
  const IdTutor = data?.data?.find(
    (tutor: any) => tutor.attributes?.user?.data?.id === user?.id
  )?.id;
  const [hours, setHours] = useState("");
  const [minutes, setMinutes] = useState("");
  const [seconds, setSeconds] = useState("");
  const tutorId = Number(IdTutor);
  useEffect(() => {
    if (topic.duration) {
      const [hh, mm, ssMm] = topic.duration.split(":");
      const [ss] = ssMm.split(".");
      setHours(hh || "00");
      setMinutes(mm || "00");
      setSeconds(ss || "00");
    }
  }, [topic.duration]);

  const handleTextChange = (text: string) => {};

  const handleModalClose = () => {
    setModalOpen(false);
  };
  const handleVideoModalClose = () => {
    setVideoModalOpen(false);
  };

  const handleResourceModalClose = () => {
    setResourceModalOpen(false);
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

  const { mutate: createTopic, isPending } = useMutation({
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
      courseId: string;
      topicname: string;
      topicExpectations: string;
      topicdescription: string;
      newResources: File[];
      newVideos: File[];
      instructions: string;
      duration: string;
      tutorId: number;
    }) => {
      const NewResources = Array.isArray(newResources) ? newResources : [];
      const newResourceIds = await Promise.all(
        NewResources.map(async (file) => {
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
      setIsTopicUploaded(true);
      queryClient.invalidateQueries({
        queryKey: ["course_topics", String(courseId)],
      });
      queryClient.invalidateQueries({ queryKey: ["topicDetails", topicId] });

      onClose();
    },
    onError: (err) => {
      message.error("Error creating new topic. Please try again later.");
    },
  });

  const { mutate: editTopic, isPending: editLoading } = useMutation({
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
      topicId: string;
      courseId: string;
      topicname: string;
      topicExpectations: string;
      topicdescription: string;
      existingResourceIds: number[];
      existingVideoIds: string[];
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

      let allVideoIds: string[] = [];

      if (existingVideoIds.length > 0) {
        allVideoIds = existingVideoIds.map(String);
      }

      if (newVideos.length > 0) {
        const newVideoId = await uploadMedia(newVideos[0]);
        allVideoIds = [String(newVideoId)];
      }

      const finalVideoId = allVideoIds.length > 0 ? allVideoIds[0] : null;

      const allResourceIds: string[] = [
        ...existingResourceIds.map((id) => String(id)),
        ...newResourceIds,
      ];

      return await topicEditing(
        topicId,
        courseId,
        topicname,
        topicExpectations,
        topicdescription,
        allResourceIds,
        finalVideoId,
        instructions,
        duration
      );
    },
    onSuccess: () => {
      message.success("Topic data edited successfully");
      setIsTopicUploaded(true);
      queryClient.invalidateQueries({
        queryKey: ["course_topics", String(courseId)],
      });
      queryClient.invalidateQueries({ queryKey: ["topicDetails", topicId] });

      onClose();
    },
    onError: (err) => {
      message.error("Error editing topic. Please try again later.");
    },
  });

  const handleSaveChanges = async () => {
    try {
      if (!courseId) {
        message.error("Course context is missing. Please reopen this page from the course overview.");
        return;
      }

      if (!Number.isFinite(tutorId) || tutorId <= 0) {
        message.error("Tutor profile not found. Refresh and try again.");
        return;
      }

      const existingVideoIds =
        topic.topicVideo && topic.topicVideo !== null ? [topic.topicVideo] : [];

      const safeResourcePreview = Array.isArray(resourcePreview)
        ? resourcePreview
        : [];
      const safeTopicResources = Array.isArray(topic.topicResources)
        ? topic.topicResources
        : [];
      const existingResourceIds = safeTopicResources.filter(
        (resource): resource is number => typeof resource === "number"
      );
      const newResources = safeResourcePreview.filter(
        (resource): resource is File => resource instanceof File
      );

      if (!topicId) {
        createTopic({
          courseId,
          topicname: topic.topicname,
          topicExpectations: topic.topicExpectations,
          topicdescription: topic.topicdescription,
          newResources,
          newVideos: topic.topicVideo instanceof File ? [topic.topicVideo] : [],
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
          newVideos: topic.topicVideo instanceof File ? [topic.topicVideo] : [],
          instructions: topic.resourceInstructions,
          duration: topic.duration,
        });
      }
    } catch (error) {
      message.error("Error saving changes");
    } finally {
    }
  };

  const { mutate: deleteTopics } = useMutation({
    mutationFn: async (topicId: string) => {
      return await topicDelete(topicId);
    },
    onSuccess: () => {
      message.success("Topic deleted successfully!");
      queryClient.invalidateQueries({
        queryKey: ["course_topics"],
      });
      queryClient.invalidateQueries({ queryKey: ["topicDetails", topicId] });

      closeModal();
      onClose();
    },
    onError: (err) => {
      message.error("Error deleting topic. Please try again later.");
    },
  });

  const { mutate: topicVideoDelete } = useMutation({
    mutationFn: async ({
      topicId,
      videoId,
    }: {
      topicId: string;
      videoId: string;
    }) => {
      return await deleteTopicVideo(topicId, videoId);
    },
    onSuccess: (_, { topicId }) => {
      message.success("Video deleted successfully!");

      queryClient.invalidateQueries({
        queryKey: ["course_topics"],
      });
      queryClient.invalidateQueries({ queryKey: ["topicDetails", topicId] });

      closeModal();
      onClose();
    },
    onError: () => {
      message.error("Error deleting topic video. Please try again later.");
    },
  });

  const { mutate: topicResourceDelete } = useMutation({
    mutationFn: async ({
      topicId,
      resourceId,
    }: {
      topicId: string;
      resourceId: string;
    }) => {
      try {
        const result = await deleteTopicResource(topicId, resourceId);
        return result;
      } catch (error) {
        throw new Error("Deletion failed");
      }
    },
    onSuccess: (_, { topicId }) => {
      message.success("Resource deleted successfully!");

      queryClient.invalidateQueries({
        queryKey: ["course_topics"],
      });
      queryClient.invalidateQueries({ queryKey: ["topicDetails", topicId] });

      closeModal();
      onClose();
    },
    onError: (error) => {
      message.error("Error deleting topic resource. Please try again later.");
    },
  });

  const handleDeleteClick = (topicId: string) => {
    if (!topicId) {
      message.warning("You can't delete an unsaved topic.");
      return;
    }
    setSelectedTopicId(topicId);
    setIsModalOpen(true);
  };

  const handleVideoModal = (videoId: string) => {
    setSelectedVideoId(videoId);
    setVideoModalOpen(true);
  };

  const handleDeleteVideo = () => {
    if (selectedVideoId && topicId) {
      topicVideoDelete({ topicId, videoId: selectedVideoId });
    } else {
      message.error("An error has occurred while deleting video.");
    }
    setVideoModalOpen(false);
  };

  const handleResourceModal = (
    resourceId: string | number,
    resourceIndex: number
  ) => {
    setSelectedResourceId(String(resourceId));
    setResourceIndex(resourceIndex);
    setResourceModalOpen(true);
  };

  const handleResourceDelete = () => {
    if (resourceIndex !== null && selectedResourceId && topicId) {
      topicResourceDelete({ topicId, resourceId: selectedResourceId });
    } else {
      message.error("An error has occurred while deleting the resource.");
    }

    setResourceModalOpen(false);
  };

  const handleDurationChange = () => {
    const formattedDuration = `${(hours || "00").padStart(2, "0")}:${(
      minutes || "00"
    ).padStart(2, "0")}:${(seconds || "00").padStart(2, "0")}.000`;
    onFieldChange("duration", formattedDuration);
  };

  return (
    <div
      className={`p-4 w-full h-auto bg-gray-100 rounded-md overflow-hidden break-words ${
        isPending || editLoading
          ? "pointer-events-none opacity-50 cursor-not-allowed"
          : ""
      }`}
    >
      {isPending ||
        (editLoading && (
          <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50 cursor-not-allowed">
            <DotPulseWrapper
              type="metronome"
              size="40"
              speed="1.75"
              color="black"
            />
          </div>
        ))}

      <div className="flex flex-col sm:flex-row gap-5">
        <div className="flex flex-col sm:flex-row gap-5">
          <div className="sm:mt-5 flex flex-col sm:flex-row sm:items-center w-full gap-2">
            <div className="flex flex-col sm:flex-row sm:items-center w-full">
              <label className="flex-shrink-0 sm:mb-0 mb-2">Topic name</label>
              <input
                type="text"
                value={topic?.topicname}
                onChange={(e) => onFieldChange("topicname", e.target.value)}
                className="border rounded-md sm:ml-5 border-black sm:w-2/3 w-full bg-[#F9F9F9] px-3 py-2 outline-none"
              />
            </div>

            <div className="mt-5 flex sm:flex-row flex-col sm:items-center w-full sm:mt-2">
              <label className="sm:flex-shrink-0 my-2 sm:my-0">
                Topic duration:
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  min="0"
                  value={hours}
                  onChange={(e) => setHours(e.target.value)}
                  onBlur={() => {
                    setHours((hours || "00").padStart(2, "0"));
                    handleDurationChange();
                  }}
                  placeholder="HH"
                  className="border rounded-md sm:ml-5 border-black w-16 text-center bg-[#F9F9F9] px-3 py-2 outline-none"
                />
                <span>:</span>
                <input
                  type="number"
                  min="0"
                  max="59"
                  value={minutes}
                  onChange={(e) => setMinutes(e.target.value)}
                  onBlur={() => {
                    setMinutes((minutes || "00").padStart(2, "0"));
                    handleDurationChange();
                  }}
                  placeholder="MM"
                  className="border rounded-md border-black w-16 text-center bg-[#F9F9F9] px-3 py-2 outline-none"
                />
                <span>:</span>
                <input
                  type="number"
                  min="0"
                  max="59"
                  value={seconds}
                  onChange={(e) => setSeconds(e.target.value)}
                  onBlur={() => {
                    setSeconds((seconds || "00").padStart(2, "0"));
                    handleDurationChange();
                  }}
                  placeholder="SS"
                  className="border rounded-md border-black w-16 text-center bg-[#F9F9F9] px-3 py-2 outline-none"
                />
              </div>
            </div>
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
            className="bg-white h-auto"
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
            className="bg-white h-auto"
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
            className="bg-white h-auto"
            placeholder="Write content here..."
            value={topic?.resourceInstructions}
            onChange={(value) => onFieldChange("resourceInstructions", value)}
          />
        </div>
      </div>

      <div className="sm:mt-10 mt-5">
        <h1>Upload Resource</h1>
        <div className="relative mt-5 flex h-[200px] w-full flex-col items-center justify-center rounded border border-black sm:w-[50%]">
          <p className="text-gray-500 mb-5">Attach a resource file to this topic</p>
          <p className="mb-3 text-center text-xs text-gray-500">
            Allowed file types: PDF, PPT, PPTX (max 25MB)
          </p>
          <GrCloudUpload className="text-blue-800 w-10 h-10" />
          <span className="text-gray-500">
            Drag & drop files or{" "}
            <span
              className="text-blue-500 ml-1 cursor-pointer"
              onClick={() => resourceFileInputRef.current?.click()}
            >
              Browse
            </span>
          </span>

          <input
            ref={resourceFileInputRef}
            type="file"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0] ?? null;
              onFileChange(file);
              e.target.value = "";
            }}
            accept=".pdf,.ppt,.pptx,application/pdf,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation"
          />
        </div>
      </div>

      <div className="sm:mt-10 mt-5">
        <h1>Resource Preview</h1>
        {Array.isArray(resourcePreview) && resourcePreview.length > 0 ? (
          resourcePreview.map((resource: any, resourceIndex: number) => {
            const resourceId = resourceIds[resourceIndex];

            return (
              <div
                key={resourceIndex}
                className="border border-gray-300 p-2 rounded mb-5 flex justify-between items-center"
              >
                {typeof resource === "string" && resource.startsWith("http") ? (
                  <>
                    <a
                      href={resource}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500"
                    >
                      Resource {resourceIndex + 1}
                    </a>
                    <button
                      className="text-red-500 hover:text-red-700 ml-2"
                      onClick={() =>
                        handleResourceModal(Number(resourceId), resourceIndex)
                      }
                    >
                      Delete
                    </button>
                  </>
                ) : resource instanceof File ? (
                  <div className="flex items-center">
                    <p className="text-gray-500">
                      Uploaded File: {resource.name}
                    </p>
                    <button
                      onClick={() => onRemoveResource(resourceIndex)}
                      className="text-blue-500 hover:text-gray-700 ml-2"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <p className="text-gray-500">Invalid resource</p>
                )}
              </div>
            );
          })
        ) : (
          <p className="text-gray-500 mt-2">No resources uploaded</p>
        )}
      </div>

      <div className="sm:mt-10 mt-5">
        <div className="flex justify-between items-center sm:mt-10 mt-5">
          <h1>Upload Video</h1>
              {videoPreview && (
            <button
              onClick={() => {
                if (topic.topicVideo instanceof File) {
                  setVideoPreview("");
                  onFieldChange("topicVideo", null);
                } else {
                  handleVideoModal(String(topic.topicVideo));
                }
              }}
              className=" text-white bg-gray-600 rounded-md px-4 py-1  hover:bg-white hover:border-2 hover:border-black hover:text-black"
            >
              {topic.topicVideo instanceof File ? "Remove Video" : "Edit Existing Video"}
            </button>
          )}
        </div>

        {videoPreview ? (
          <div className="relative mt-5 flex h-[200px] w-full flex-col items-center justify-center rounded border border-black sm:w-[40%]">
            <iframe
              src={videoPreview}
              width="100%"
              height="600"
              allow="autoplay; fullscreen"
              allowFullScreen
              className="rounded-lg"
            />
          </div>
        ) : (
          <div className="relative mt-5 flex h-[200px] w-full flex-col items-center justify-center rounded border border-black sm:w-[50%]">
            <p className="text-gray-500 mb-5">Attach a video to your topic</p>
            <p className="mb-3 text-center text-xs text-gray-500">
              Allowed video types: MP4, AVI, WEBM
            </p>
            <GrCloudUpload className="text-blue-800 w-10 h-10" />
            <span className="text-gray-500">
              Drag & drop files or{" "}
              <span
                className="text-blue-500 ml-1 cursor-pointer"
                onClick={() => fileInputRef.current?.click()}
              >
                Browse
              </span>
            </span>

              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                onChange={(e) => {
                  onVideoChange(index, e);
                }}
                accept=".mp4,.avi,.webm,video/mp4,video/x-msvideo,video/webm"
              />
          </div>
        )}
      </div>

      <div className="my-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button
          onClick={() => handleDeleteClick(topicId)}
          className="rounded-md bg-black px-4 py-2 text-white"
        >
          Delete Topic
        </button>

        <button
          onClick={handleSaveChanges}
          disabled={isPending || editLoading}
          className={`mb-4 flex w-full items-center justify-center rounded border border-black px-4 py-2 sm:mt-0 sm:w-[150px] 
        ${
          pathname === "/tutor/dashboard/uploadCourse" ||
          pathname === "/tutor/dashboard/topicUpload"
            ? "w-[100px] flex justify-center"
            : "w-[180px]"
        } ${isPending || editLoading ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          {isPending || editLoading ? (
            <DotPulseWrapper
              type="metronome"
              size="25"
              speed="1.75"
              color="black"
            />
          ) : pathname === "/tutor/dashboard/uploadCourse" ||
            pathname === "/tutor/dashboard/topicUpload" ? (
            "Upload"
          ) : (
            "Save changes"
          )}
        </button>
      </div>

      <CustomModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={(id: string) => {
          deleteTopics(id);
        }}
        topicId={selectedTopicId}
      />

      {videoModalOpen && (
        <VideoModal
          onClose={handleVideoModalClose}
          onDelete={() => handleDeleteVideo()}
        />
      )}
      {resourceModalOpen && (
        <ResourceModal
          isOpen={resourceModalOpen}
          onClose={handleResourceModalClose}
          onDelete={() => handleResourceDelete()}
        />
      )}

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
