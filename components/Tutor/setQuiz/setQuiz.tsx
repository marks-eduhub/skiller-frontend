"use client";
import React, { useState } from "react";
import StepTracker from "./tracker";
import Step3 from "./step3";
import Step2 from "./step2";
import Step1 from "./step1";
import QuizPreview from "./quizPreview";

const SetQuiz = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [showPreview, setShowPreview] = useState(false);

  const handleNextStep = () => {
    if (currentStep < 3) {
      setCurrentStep((prevStep) => prevStep + 1);
    }
  };

  const handlePreviousStep = () => {
    if (showPreview) {
      setShowPreview(false);
      setCurrentStep(3);
    } else if (currentStep > 1) {
      setCurrentStep((prevStep) => prevStep - 1);
    }
  };

  const handleQuizPreview = () => {
    setShowPreview(true);
  };

  if (showPreview) {
    return <QuizPreview handlePreviousStep={handlePreviousStep} />;
  }

  return (
    <div className="p-6 w-full flex flex-col  sm:mt-0 mt-10">
      <h1 className="text-[20px] mb-6">New Assignment</h1>

      <StepTracker currentStep={currentStep} />

      {currentStep === 1 && <Step1 />}
      {currentStep === 2 && <Step2 />}
      {currentStep === 3 && <Step3 />}

      <div className="sm:mt-5 flex items-center justify-between">
        {currentStep > 1 && (
          <button
            className="py-2 px-4 flex items-center justify-center rounded w-[150px] text-black border border-black"
            onClick={handlePreviousStep}
          >
            Previous
          </button>
        )}

        {currentStep === 3 ? (
          <> 
            <button
              className="py-2 px-4 mt-2 flex sm:mb-0 mb-48 items-center justify-center rounded w-full sm:w-[150px] text-black border border-black"
              onClick={handleQuizPreview}
            >
              Quiz Preview
            </button>
            <button
              className="bg-black py-2  px-4 flex items-center justify-center rounded w-full sm:w-[150px] text-white"
            >
              Upload Quiz
            </button>
          </>
        ) : (
          <button
            className="bg-black py-2 px-4  flex items-center justify-center rounded w-[150px] text-white"
            onClick={handleNextStep}
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default SetQuiz;
