"use client";
import React, { useState, useEffect, useContext } from "react";
import StepTracker from "./tracker";
import Step3 from "./step3";
import Step2 from "./step2";
import Step1 from "./step1";
import QuizPreview from "./quizPreview";
import { useMutation } from "@tanstack/react-query";
import { PostQuestion, PostTest } from "@/hooks/useSetQuiz";
import { message } from "antd";
import { useRouter } from "next/navigation";
import Loader from "@/components/Student/loader";
import { useSearchParams } from "next/navigation";
import { useCourseContext } from "@/lib/CourseContext";

const SetQuiz = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const courseId = searchParams.get("courseId");
  const [currentStep, setCurrentStep] = useState(1);
  const [showPreview, setShowPreview] = useState(false);
  const [testname, setTestname] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [passmark, setPassmark] = useState("");
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
      passmark,
    }: {
      testname: string;
      testdescription: string;
      testduration: string;
      topicId: string;
      passmark: string;
    }) => {
      return await PostTest(
        testname,
        testdescription,
        testduration,
        topicId,
        passmark
      );
    },
    onSuccess: () => {
      message.success("test data submitted!");
    },
    onError: (err) => {
      message.error("Error submitting test data");
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
  
    if (!testname) {
      message.error("Test name is missing.");
      return;
    }
    if (!description) {
      message.error("Test description is missing.");
      return;
    }
    if (!duration) {
      message.error("Test duration is missing.");
    }
    if (!topic) {
      message.error("Please select a topic.");
      return;
    }
    // if (passmark === "" || isNaN(passmark)) {
    //   message.error("Please enter a valid passmark.");
    //   return;
    // }
    if (!passmark) {
      message.error("Please enter the test passmark.");
      return;
    }
   
    if (quizData.some(({ question }) => !question)) {
      message.error("Question field is missing data.");
      return;
    }

    if (quizData.some(({ options }) => options.some((opt) => !opt))) {
      message.error("Please ensure all options are filled in .");
      return;
    }

    if (quizData.some(({ answers }) => !answers)) {
      message.error("Please select the correct answer for the questions .");
      return;
    }

    testdata(
      {
        testname,
        testdescription: description,
        testduration: duration,
        topicId: topic,
        passmark
      },
      {
        onSuccess: (data) => {
          const testId = data.data.id;
          message.success("Quiz submitted successfully");
          quizData.forEach(({ question, options, answers }) => {
            PostQuestion(question, options, answers, testId);
          });
          router.push("/tutor/dashboard");
        },
        onError: (err) => {
          message.error("Failed to submit quiz.");
        },
      }
    );
  };

  if (showPreview) {
    return (
      <QuizPreview
        handlePreviousStep={handlePreviousStep}
        quizData={quizData}
        handleSubmitQuiz={handleSubmitQuiz}
      />
    );
  }
  if (courseId === null) {
    return (
      <div className="flex items-center justify-center min-h-screen ">
        <Loader />
        <p className="ml-5 font-semibold">Data loading...</p>
      </div>
    );
  }
  if (!courseId) {
    return (
      <div className="text-center">
        <p className="text-red-500">
          Something is missing. Please go back and create a course.
        </p>
      </div>
    );
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
          courseId={courseId}
          passmark={passmark}
          setPassmark={setPassmark}
        />
      )}
      {currentStep === 3 && (
        <Step3 quizData={quizData} setQuizData={setQuizData} />
      )}

      <div className="sm:mt-5 flex items-center justify-between">
        {currentStep > 1 && (
          <button
            className="py-2 px-4 items-center hidden md:flex justify-center rounded w-[150px] text-black border border-black"
            onClick={handlePreviousStep}
          >
            Previous
          </button>
        )}

        {currentStep === 3 ? (
          <>
            <button
              className="py-2 px-4 mt-2 sm:mb-0 mb-48 hidden md:flex items-center justify-center rounded w-full sm:w-[150px] text-black border border-black"
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
        ) : currentStep === 2 ? (
          <button
            className={`bg-black py-2 px-4 sm:mt-0 sm:ml-0 ml-20 mt-4 flex items-center justify-center rounded w-[150px] text-white ${
              !topic ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={handleNextStep}
            disabled={!topic}
          >
            Next
          </button>
        ) : currentStep === 1 ? (
          <button
            className="bg-black py-2 px-4 sm:mt-0 sm:ml-0 ml-20 mt-4 flex items-center justify-center rounded w-[150px] text-white"
            onClick={handleNextStep}
          >
            Next
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default SetQuiz;
