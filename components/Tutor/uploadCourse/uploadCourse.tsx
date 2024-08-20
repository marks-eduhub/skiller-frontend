"use client";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import { GrCloudUpload } from "react-icons/gr";
import StepTracker from "./tracker";
import Step3 from "./step3";
import Step2 from "./step2";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const UploadCourse = () => {
  const [uploadImage, setUploadImage] = useState<string | null>(null);
  const [courseDescription, setCourseDescription] = useState("");
  const [courseRequirements, setCourseRequirements] = useState("");
  const [courseLearning, setCourseLearning] = useState("");
  const [courseName, setCourseName] = useState("");
  const [currentStep, setCurrentStep] = useState(1);

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
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="p-6 w-full flex flex-col">
        {currentStep === 1 && (
        <h1 className="text-[20px] mb-6">Upload a Course</h1>
      )}
      {currentStep === 2 && (
        <h1 className="text-[20px] mb-6">Upload a topic</h1>
      )}
      {currentStep === 3 && (
        <h1 className="text-[20px] mb-6">Upload a resource</h1>
      )}
      <StepTracker currentStep={currentStep} />

      {currentStep === 1 && (
        <div>

          <div className="mt-5 flex items-center w-full">
            <label className="flex-shrink-0">Course name</label>
            <input
              type="text"
              value={courseName}
              onChange={(e) => setCourseName(e.target.value)}
              className="border ml-5 border-black w-full bg-[#F9F9F9] px-3 py-2 outline-none"
            />
          </div>
          <div className="mb-10 mt-4">
            <label className="block text-sm font-medium mb-4 mt-6">
              Enter a brief description about the course
            </label>
            <ReactQuill
              placeholder="Write content here"
              value={courseDescription}
              onChange={setCourseDescription}
              className="bg-white h-40"
            />
          </div>
          <div>
            <div className="mb-6 mt-10">
              <label className="block text-sm font-medium mb-4 mt-20">
                What will the student learn?
              </label>
              <ReactQuill
                value={courseLearning}
                onChange={setCourseLearning}
                className="h-40"
              />
            </div>
          </div>
          <div>
            <div className="mb-6 mt-6">
              <label className="block text-sm font-medium mb-4 mt-20">
                Course Requirements
              </label>
              <ReactQuill
                value={courseRequirements}
                onChange={setCourseRequirements}
                className="h-40"
              />
            </div>
            <div className="mt-20">
              <h1>Upload Course Image</h1>
              <div className="flex flex-col mt-5 items-center justify-center border border-dashed border-black p-3 relative h-[200px] rounded">
                <GrCloudUpload className="text-blue-800 w-10 h-10" />
                <span className="text-gray-500">
                  Drag & drop files or
                  <span className="text-blue-500 ml-1 cursor-pointer">
                    Browse
                  </span>
                </span>
                <input
                  type="file"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  onChange={handleImageChange}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {currentStep === 2 && <Step2 />}

      {currentStep === 3 && <Step3 />}

      <div className="mt-5 flex items-center justify-between">
        {currentStep > 1 && (
          <button
            className="bg-black py-2 px-4 flex items-center justify-center rounded w-[150px] text-white"
            onClick={handlePreviousStep}
          >
            Back
          </button>
        )}
        <button
          className="bg-black py-2 px-4 mt-5 flex items-center justify-center rounded w-[150px] text-white"
          onClick={handleNextStep}
        >
          {/* <h1>Continue</h1> */}
          {currentStep === 3 ? "Upload" : "Continue"}
        </button>
      </div>
    </div>
  );
};

export default UploadCourse;
