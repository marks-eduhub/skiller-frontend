"use client";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import { GrCloudUpload } from "react-icons/gr";
import StepTracker from "./tracker";
import Step3 from "./step3";
import Step2 from "./step2";
import { courseUpload, uploadMedia } from "@/hooks/useCourseUpload";
import { message } from "antd";
import Image from "next/image";
import { useMutation } from "@tanstack/react-query";
import { topicUpload } from "@/hooks/useCourseTopics";
import { CourseProvider, useCourseContext } from "@/lib/CourseContext";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const UploadCourse = () => {
  const { setCourseId , setTopicId} = useCourseContext();
  const [uploadImage, setUploadImage] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [courseDescription, setCourseDescription] = useState("");
  const [courseRequirements, setCourseRequirements] = useState("");
  const [courseLearning, setCourseLearning] = useState("");
  const [courseName, setCourseName] = useState("");
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [topicname, setTopicname] = useState("");
  const [topicdescription, setTopicdescription] = useState("");
  const [topicexpectation, setTopicexpectation] = useState("");
  const [topicresource, setTopicresource] = useState("");
  const [instructions, setInstructions] = useState("");
  const [videoFile, setVideoFile] = useState<File | null>(null); 
  const [resourceFile, setResourceFile] = useState<File | null>(null);
  
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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      setFileName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      message.error("No course image selected. Please try again.");
    }
  };

  const { mutate: uploadCourse } = useMutation({
    mutationFn: async ({
      courseName,
      courseLearning,
      courseDescription,
      courseRequirements,
      mediaId,
    }: {
      courseName: string;
      courseLearning: string;
      courseDescription: string;
      courseRequirements: string;
      mediaId: number;
    }) => {
      return await courseUpload(
        courseName,
        courseLearning,
        courseDescription,
        courseRequirements,
        mediaId
      );
    },
    onSuccess: () => {
      console.log("course submitted!");
    },
    onError: (err) => {
      console.error("Error submitting course:", err);
    },
  });

  
  const handleSubmit = async () => {
    try {
      if (!selectedImage) {
        message.error("Please select a course image  to upload.");
        return;
      }
 
      let videoId: number | null = null;
      if (videoFile) {
        videoId = await uploadMedia(videoFile);
        if (!videoId) {
          throw new Error("Topic video upload failed.");
        }
      }

      const resourceId = resourceFile
      if (
        !courseName ||
        !courseDescription ||
        !courseRequirements ||
        !courseLearning
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
        },
        {
          onSuccess: (data) => {
            const courseId = data?.data?.id;
            setCourseId(courseId);
            if (!courseId) {
              throw new Error("Course ID is missing from the response.");
            }
            console.log("Course ID:", courseId);
 
            topicUpload(
              courseId,
              topicname,
              topicexpectation,
              topicdescription,
              resourceId ? [resourceId] : [],
              videoId,
              instructions
            )
              .then(() => {
                message.success("Course and topic submitted successfully!");
                const topicId = data?.data?.id
                setTopicId(topicId);
              })
              .catch((err) => {
                console.error("Error uploading topic:", err);
                message.error("Failed to upload topic.");
              });
          },
          onError: (err) => {
            console.error("Error submitting course details:", err);
            message.error("Failed to upload course details.");
          },
        }
      );
    } catch (error) {
      console.error("Error in handleSubmit:", error);
      message.error("An unexpected error occurred.");
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
        <div>
          <div className="mt-5 flex sm:flex-row flex-col sm:items-center w-full">
            <label className="sm:flex-shrink-0 my-2 sm:my-0">Course name</label>
            <input
              type="text"
              value={courseName}
              onChange={(e) => {
                setCourseName(e.target.value);
              }}
              className="border sm:ml-5 border-black w-full bg-[#F9F9F9] px-3 py-2 outline-none"
            />
          </div>
          <div className="mb-10 mt-4">
            <label className="block text-sm font-medium mb-4 mt-6">
              Enter a brief description about the course
            </label>
            <ReactQuill
              placeholder="Write content here"
              value={courseDescription}
              onChange={(value) => {
                setCourseDescription(value);
              }}
              className="bg-white h-40"
            />
          </div>
          <div className="mb-6 mt-10">
            <label className="block text-sm font-medium mb-4 mt-20">
              What will the student learn?
            </label>
            <ReactQuill
              value={courseLearning}
              onChange={(value) => {
                setCourseLearning(value);
              }}
              className="h-40"
            />
          </div>
          <div className="mb-6 mt-6">
            <label className="block text-sm font-medium mb-4 mt-20">
              Course Requirements
            </label>
            <ReactQuill
              value={courseRequirements}
              onChange={(value) => {
                setCourseRequirements(value);
              }}
              className="h-40"
            />
          </div>
          <div className="mt-20">
            <h1>Upload Course Image</h1>
            <div className="flex flex-col mt-5 items-center justify-center border border-dashed border-black p-3 relative h-[200px] rounded">
              {!uploadImage ? (
                <>
                  <GrCloudUpload className="text-blue-800 w-10 h-10" />
                  <span className="text-gray-500">
                    Drag & drop files or
                    <span className="text-blue-500 ml-1 cursor-pointer">
                      Browse
                    </span>
                  </span>
                </>
              ) : (
                <div className="flex flex-col items-center">
                  {typeof uploadImage === "string" &&
                  uploadImage.startsWith("data:image") ? (
                    <Image
                      src={uploadImage}
                      alt="Preview"
                      width={200}
                      height={200}
                      className=" object-cover rounded"
                    />
                  ) : (
                    <p className="text-gray-600">{fileName}</p>
                  )}
                </div>
              )}
              <input
                type="file"
                className="absolute inset-0 opacity-0 cursor-pointer"
                onChange={handleImageChange}
              />
            </div>
          </div>
        </div>
      )}

      {currentStep === 2 && (
        <Step2
          topicname={topicname}
          setTopicname={setTopicname}
          topicdescription={topicdescription}
          setTopicdescription={setTopicdescription}
          topicexpectation={topicexpectation}
          setTopicexpectation={setTopicexpectation}
          topicresource={topicresource}
          setTopicresource={setTopicresource}
          instructions={instructions}
          setInstructions={setInstructions}
          videoFile={videoFile}
          setVideoFile={setVideoFile}
          resourceFile={resourceFile}
          setResourceFile={setResourceFile}
        />
      )}
      {currentStep === 3 && <Step3
      />}

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
          onClick={currentStep === 3 ? handleSubmit : handleNextStep}
        >
          {currentStep === 3 ? "Upload" : "Continue"}
        </button>
      </div>

    </div>
  );
};

export default UploadCourse;
