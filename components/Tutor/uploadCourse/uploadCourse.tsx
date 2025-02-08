"use client";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import StepTracker from "./tracker";
import Step3 from "./step3";
import Step2 from "./step2";
import { courseUpload, uploadMedia } from "@/hooks/useCourseUpload";
import { message } from "antd";
import { useMutation } from "@tanstack/react-query";
import { topicUpload } from "@/hooks/useCourseTopics";
import { useCourseContext } from "@/lib/CourseContext";
import CourseFields from "./coursefileds";

import { useAuthContext } from "@/Context/AuthContext";

const DotPulseWrapper = dynamic(() => import("@/hooks/pulse"), { ssr: false });

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

const UploadCourse = () => {
  const { setCourseId, setTopicId } = useCourseContext();
  const { user } = useAuthContext();
  const [uploadImage, setUploadImage] = useState<string | null>(null);
  const [courseDescription, setCourseDescription] = useState("");
  const [courseRequirements, setCourseRequirements] = useState("");
  const [courseLearning, setCourseLearning] = useState("");
  const [courseName, setCourseName] = useState("");
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [topicname, setTopicname] = useState("");
  const [topicdescription, setTopicdescription] = useState("");
  const [topicexpectation, setTopicexpectation] = useState("");
  const [topicduration, setTopicduration] = useState("");
  const [instructions, setInstructions] = useState("");
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [resourceFile, setResourceFile] = useState<File | null>(null);
  const [category, setCategory] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [duration, setDuration] = useState("");
  const [topics, setTopics] = useState<Topic[]>([]);
  const [isOpen, setModalOpen] = useState(false);
  const [existingMediaId, setExistingMediaId] = useState<number | null>(null)

  const tutorId = user?.id;

  const handleNextStep = () => {
    if (currentStep < 3) {
      setCurrentStep((prevStep) => prevStep + 1);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prevStep) => prevStep - 1);
    }
  };
  const onClose = () => {
    setModalOpen(false);
  };

  const addTopic = () => {
    const newTopic: Topic = {
      id: null,
      topicname: `Topic ${topics.length + 1}`,
      topicdescription: "",
      resourceInstructions: "",
      topicExpectations: "",
      duration: "",
      topicResources: null,
      topicVideo: null,
      topicresource: "",
      topicexpectation: "",
      topicduration: "",
      instructions: "",
      videoFile: null,
      resourceFile: null,
    };

    setTopics([...topics, newTopic]);
  };

  const updateTopic = (index: number, updatedFields: Partial<Topic>) => {
    setTopics((prevTopics) =>
      prevTopics.map((topic, i) =>
        i === index ? { ...topic, ...updatedFields } : topic
      )
    );
  };

  const { mutate: uploadCourse } = useMutation({
    mutationFn: async ({
      courseName,
      courseLearning,
      courseDescription,
      courseRequirements,
      mediaId,
      category,
      tutorId,
      duration,
    }: {
      courseName: string;
      courseLearning: string;
      courseDescription: string;
      courseRequirements: string;
      mediaId: number;
      category: string;
      tutorId: number | undefined;
      duration: string;
    }) => {
      return await courseUpload(
        courseName,
        courseLearning,
        courseDescription,
        courseRequirements,
        mediaId,
        category,
        tutorId,
        duration
      );
    },
    onSuccess: () => {
      message.success("course submitted!");
    },
    onError: (err) => {
      message.error("Error submitting course:");
    },
  });

  const handleSubmit = async () => {
    try {
      if (!selectedImage) {
        message.error("Please select a course image to upload.");
        return;
      }

      let videoId: string[] | null = null;
      if (videoFile) {
        videoId = await uploadMedia(videoFile);
        if (!videoId) {
          throw new Error("Topic video upload failed.");
        }
      }

      let resourceId: string| null = null;
      if (resourceFile) {
        resourceId = await uploadMedia(resourceFile);
        if (!resourceId) {
          throw new Error("Resource upload failed.");
        }
      }

      if (
        !courseName ||
        !courseDescription ||
        !courseRequirements ||
        !courseLearning ||
        !category
      ) {
        message.error("Please fill out all required course details.");
        return;
      }

      const mediaId = await uploadMedia(selectedImage);
      if (!mediaId) {
        throw new Error("Course image upload failed.");
      }

      uploadCourse(
        {
          courseName,
          courseLearning,
          courseDescription,
          courseRequirements,
          mediaId,
          category,
          tutorId,
          duration,
        },
        {
          onSuccess: (data) => {
            const courseId = data?.data?.id;
            setCourseId(courseId);
            if (!courseId) {
              throw new Error("An error has occurred. Try again later!");
            }

            topicUpload(
              courseId,
              topicname,
              topicexpectation,
              topicdescription,
              resourceId ? [resourceId] : [],
              videoId,
              instructions,
              topicduration,
              tutorId
            )
              .then(() => {
                message.success("Course and topic submitted successfully!");
                const topicId = data?.data?.id;
                setTopicId(topicId);
              })
              .catch((err) => {
                message.error("Failed to upload topic.");
              });
          },
          onError: (err) => {
            message.error("Failed to upload course details.");
          },
        }
      );
    } catch (error) {
      message.error("An unexpected error occurred.");
    }
  };

  const handleClick = async () => {
    if (currentStep === 3) {
      setIsUploading(true);
      try {
        await handleSubmit();
      } finally {
        setIsUploading(false);
      }
    } else {
      handleNextStep();
    }
  };

  return (
    <div className="p-6 w-full flex flex-col sm:mt-0 mt-12">
      {currentStep === 1 && (
        <h1 className="text-[20px] mb-6 sm:mt-0 mt-5">Upload a Course</h1>
      )}
      {currentStep === 2 && (
        <h1 className="text-[20px] mb-6">Upload a topic</h1>
      )}
      {currentStep === 3 && (
        <h1 className="text-[20px] mb-6 sm:mt-0 mt-5">Add resources</h1>
      )}
      <StepTracker currentStep={currentStep} />

      {currentStep === 1 && (
        <CourseFields
          setCourseName={setCourseName}
          setCourseDescription={setCourseDescription}
          setCourseRequirements={setCourseRequirements}
          setCourseLearning={setCourseLearning}
          setCategory={setCategory}
          setUploadImage={setUploadImage}
          setDuration={setDuration}
          courseName={courseName}
          courseDescription={courseDescription}
          courseRequirements={courseRequirements}
          courseLearning={courseLearning}
          category={category}
          uploadImage={uploadImage}
          duration={duration}
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
          onClose={onClose}
          existingMediaId={existingMediaId}
        />
      )}

      {currentStep === 2 && (
        <Step2
          topics={topics}
          setTopics={setTopics}
          addTopic={addTopic}
          updateTopic={updateTopic}
        />
      )}
      {currentStep === 3 && <Step3 />}

      <div className="mt-5 flex items-center justify-between">
        {currentStep > 1 && (
          <button
            className="bg-black py-2 px-4 sm:mt-0 mt-4 flex items-center justify-center rounded w-[150px] text-white"
            onClick={handlePreviousStep}
          >
            Back
          </button>
        )}

        <button
          className="bg-black py-2 px-4 mt-5 flex items-center justify-center rounded w-[150px] text-white"
          onClick={handleClick}
          disabled={isUploading}
        >
          {isUploading ? (
            <div>
              {/* <l-dot-pulse size="20" speed="1.5" color="white" /> */}
              <DotPulseWrapper size="20" speed="1.5" color="white" />
            </div>
          ) : currentStep === 3 ? (
            "Upload"
          ) : (
            "Continue"
          )}
        </button>
      </div>
    </div>
  );
};

export default UploadCourse;
