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
import { useCourseContext } from "@/Context/CourseContext";
import CourseFields from "./coursefields";
import { useAuthContext } from "@/components/AuthProvider/AuthContext";
import { useFetchTutors } from "@/hooks/useCourses";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useRouter } from "next/navigation";
import { useSidebar } from "@/components/AuthProvider/sidebarContext";

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

const UploadCourse = () => {
  const { setCourseId, courseId } = useCourseContext();
  const { user } = useAuthContext();
  const { data } = useFetchTutors();
  const [uploadImage, setUploadImage] = useState<string | null>(null);
  const [courseDescription, setCourseDescription] = useState("");
  const [courseRequirements, setCourseRequirements] = useState("");
  const [courseLearning, setCourseLearning] = useState("");
  const [courseName, setCourseName] = useState("");
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [resourceFile, setResourceFile] = useState<File | null>(null);
  const [category, setCategory] = useState("");
  const [level, setLevel] = useState("");
  const [days, setDays] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [duration, setDuration] = useState("");
  const [topics, setTopics] = useState<Topic[]>([]);
  const [isOpen, setModalOpen] = useState(false);
  const [existingMediaId, setExistingMediaId] = useState<number | null>(null);
  const [isTopicUploaded, setIsTopicUploaded] = useState(false);
  const router = useRouter();
  const { sidebarMinimized } = useSidebar();
  

  const tutorId = data?.data?.find(
    (tutor: any) => tutor.attributes?.user?.data?.id === user?.id
  )?.id;

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

  const handleBack = () => {
    router.back();
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

    setIsTopicUploaded(false);
    setTopics([...topics, newTopic]);
  };

  const updateTopic = (index: number, updatedFields: Partial<Topic>) => {
    setIsTopicUploaded(false);
    setTopics((prevTopics) =>
      prevTopics.map((topic, i) =>
        i === index ? { ...topic, ...updatedFields } : topic
      )
    );
  };

  const { mutate: uploadCourse } = useMutation({
    mutationFn: async ({
      courseName,
      level,
      days,
      courseLearning,
      courseDescription,
      courseRequirements,
      mediaId,
      category,
      tutorId,
      duration,
    }: {
      courseName: string;
      level: string;
      days: string;
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
        level,
        days,
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
      // message.success("course submitted!");
    },
    onError: (err) => {
      message.error("Error submitting course:");
    },
  });

  const handleSubmit = async () => {
    try {
      if (!tutorId) {
        message.error("Tutor profile not found. Please refresh and try again.");
        return false;
      }

      if (!selectedImage) {
        message.error("Please select a course image to upload.");
        return false;
      }

      if (
        !courseName ||
        !level ||
        !days ||
        !courseDescription ||
        !courseRequirements ||
        !courseLearning ||
        !category
      ) {
        message.error("Please fill out all required course details.");
        return false;
      }

      const mediaId = await uploadMedia(selectedImage);
      if (!mediaId) {
        message.error("Course image upload failed.");
        return false;
      }

      return new Promise((resolve) => {
        uploadCourse(
          {
            courseName,
            level,
            days,
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
                message.error("An error has occurred. Try again later!");
                resolve(false);
              } else {
                message.success("Course uploaded successfully!");
                resolve(true);
              }
            },
            onError: () => {
              message.error("Failed to upload course details.");
              resolve(false);
            },
          }
        );
      });
    } catch (error) {
      message.error("An unexpected error occurred.");
      return false;
    }
  };

  const handleClick = async () => {
    if (currentStep === 1) {
      setIsUploading(true);
      try {
        const success = await handleSubmit();
        if (success) {
          handleNextStep();
        }
      } finally {
        setIsUploading(false);
      }
    } else if (currentStep === 2) {
      handleNextStep();
    }
  };

  const stepHeading =
    currentStep === 1
      ? "Upload a Course"
      : currentStep === 2
      ? "Upload a topic"
      : "Add quizzes";

  return (
    <div className="flex w-full flex-col px-1 py-4 sm:px-0 sm:py-6">
      {currentStep === 1 && (
        <div className="my-2 flex items-center gap-4">
          <IoMdArrowRoundBack
            className="mt-1 cursor-pointer text-[28px]"
            onClick={handleBack}
          />
          <h1 className="mb-2 text-[20px] font-medium">{stepHeading}</h1>
        </div>
      )}
      {currentStep !== 1 && <h1 className="mb-6 text-[20px] font-medium">{stepHeading}</h1>}
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
          setLevel={setLevel}
          setDays={setDays}
          level={level}
          days={days}
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
          setIsTopicUploaded={setIsTopicUploaded}
        />
      )}
      {currentStep === 3 && <Step3 />}

      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {currentStep > 1 && (
          <button
            className="mt-2 flex w-full items-center justify-center rounded bg-black px-4 py-2 text-white sm:mt-0 sm:w-[150px]"
            onClick={handlePreviousStep}
          >
            Back
          </button>
        )}

        {currentStep !== 3 && (
          <button
            className={`mt-2 flex w-full items-center justify-center rounded bg-black px-4 py-2 text-white sm:mt-5 sm:w-[150px] ${
              isUploading || (currentStep === 2 && !isTopicUploaded)
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
            onClick={handleClick}
            disabled={isUploading || (currentStep === 2 && !isTopicUploaded)}
          >
            {isUploading ? (
              <DotPulseWrapper size="30" speed="1.5" color="white" />
            ) : currentStep === 1 || currentStep === 2 ? (
              <span>Continue</span>
            ) : null}
          </button>
        )}
      </div>
    </div>
  );
};

export default UploadCourse;
