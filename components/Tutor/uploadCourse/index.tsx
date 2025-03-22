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
import CourseFields from "./coursefileds";
import { useAuthContext } from "@/components/AuthProvider/AuthContext";
import { useFetchTutors } from "@/hooks/useCourses";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useRouter } from "next/navigation";

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
      if (!selectedImage) {
        message.error("Please select a course image to upload.");
        return false;
      }

      let videoId = null;
      if (videoFile) {
        videoId = await uploadMedia(videoFile);
        if (!videoId) {
          message.error("Topic video upload failed.");
          return false;
        }
      }

      let resourceId = null;
      if (resourceFile) {
        resourceId = await uploadMedia(resourceFile);
        if (!resourceId) {
          message.error("Resource upload failed.");
          return false;
        }
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

  return (
    <div className="p-6 w-full flex flex-col sm:mt-0 mt-12">
      {currentStep === 1 && (
        <div className="flex gap-4 sm:mt-4 my-2">
          <IoMdArrowRoundBack
            className="text-[30px] sm:mt-2 mt-2 cursor-pointer"
            onClick={handleBack}
          />
          <h1 className="text-[20px] mb-6 mt-2">Upload a Course</h1>
        </div>
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

      <div className="mt-5 flex items-center justify-between">
        {currentStep > 1 && (
          <button
            className="bg-black py-2 px-4 sm:mt-0 mt-4 flex items-center justify-center rounded w-[150px] text-white"
            onClick={handlePreviousStep}
          >
            Back
          </button>
        )}

        {currentStep !== 3 && (
          <button
            className={`bg-black py-2 px-4 mt-5 flex items-center justify-center rounded w-[150px] text-white ${
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
