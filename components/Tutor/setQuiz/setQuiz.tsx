"use client";
import React, { useState } from "react";
import StepTracker from "./tracker";
import Step3 from "./step3";
import Step2 from "./step2";
import Step1 from "./step1";
import QuizPreview from "./quizPreview";
import { useMutation } from "@tanstack/react-query";
import { PostQuestion, PostTest } from "@/hooks/useSetQuiz";
import { message } from "antd";
const SetQuiz = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [showPreview, setShowPreview] = useState(false);

  const [testname, setTestname] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [topic, setTopic] = useState("");
  const [quizData, setQuizData] = useState([
    { question: "", options: ["", ""], answers: "" },
  ]);

  const { mutate: testdata } = useMutation({
    mutationFn: async ({
      testname,
      testdescription,
      testduration,
      topicId,
    }: {
      testname: string;
      testdescription: string;
      testduration: string;
      topicId: string;
    }) => {
      return await PostTest(testname, testdescription, testduration, topicId);
    },
    onSuccess: () => {
      console.log("test data submitted!");
    },
    onError: (err) => {
      console.error("Error submitting test data:", err);
    },
  });

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

  const handleSubmitQuiz = () => {
    if (!testname || !description || !duration || !topic) {
      console.error("Please fill out all fields in Steps 1 and 2.");
      return;
    }

    if (
      quizData.some(
        ({ question, options, answers }) =>
          !question || !answers || options.some((opt) => !opt)
      )
    ) {
      console.error("Please complete all fields in Step 3.");
      return;
    }

    testdata(
      {
        testname,
        testdescription: description,
        testduration: duration,
        topicId: topic,
      },
      {
        onSuccess: (data) => {
          const testId = data.data.id;
          console.log("id", testId);
          message.success("Quiz submitted successfully");
          quizData.forEach(({ question, options, answers }) => {
            PostQuestion(question, options, answers, testId);
          });

        },
        onError: (err) => {
          console.error("Error submitting test data:", err);
        },
      }
    );
  };

  if (showPreview) {
    return <QuizPreview handlePreviousStep={handlePreviousStep} />;
  }

  return (
    <div className="p-6 w-full flex flex-col sm:mt-0 mt-10">
      <div className="sm:hidden flex items-center justify-between w-full">
        {(currentStep === 2 || currentStep === 3) && (
          <button
            className="flex sm:hidden sm:mt-0 mt-8 text-[18px] text-gray-600 underline"
            onClick={handlePreviousStep}
          >
            Go back
          </button>
        )}
        {currentStep === 3 && (
          <button className="underline mt-10 " onClick={handleQuizPreview}>
            Quiz Preview
          </button>
        )}
      </div>

      <h1 className="text-[20px] mb-6 mt-8 sm:mt-0 sm:text-left text-center">
        New Assignment
      </h1>

      <StepTracker currentStep={currentStep} />

      {currentStep === 1 && (
        <Step1
          testname={testname}
          setTestname={setTestname}
          description={description}
          setDescription={setDescription}
        />
      )}
      {currentStep === 2 && (
        <Step2
          duration={duration}
          setDuration={setDuration}
          topic={topic}
          setTopic={setTopic}
        />
      )}
      {currentStep === 3 && (
        <Step3 quizData={quizData} setQuizData={setQuizData} />
      )}

      <div className="sm:mt-5 flex items-center justify-between">
        {currentStep > 1 && (
          <button
            className="py-2 px-4 flex items-center hidden md:flex justify-center rounded w-[150px] text-black border border-black"
            onClick={handlePreviousStep}
          >
            Previous
          </button>
        )}

        {currentStep === 3 ? (
          <>
            <button
              className="py-2 px-4 mt-2 flex sm:mb-0 mb-48 hidden md:flex items-center justify-center rounded w-full sm:w-[150px] text-black border border-black"
              onClick={handleQuizPreview}
            >
              Quiz Preview
            </button>
            <button
              className="bg-black py-2 px-4 flex items-center justify-center sm:ml-0 ml-20 rounded w-[150px] text-white"
              onClick={handleSubmitQuiz}
            >
              Upload Quiz
            </button>
          </>
        ) : (
          <button
            className="bg-black py-2 px-4 sm:mt-0 sm:ml-0 ml-20 mt-4 flex items-center justify-center rounded w-[150px] text-white"
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
