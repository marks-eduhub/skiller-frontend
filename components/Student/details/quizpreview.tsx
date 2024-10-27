"use client";
import { useAuthContext } from "@/Context/AuthContext";
import { useFetchQuizQuestions } from "@/hooks/useQuestions";
import { createQuestionResult, createTestResult,  useFetchTests, useFetchUserQuestionResults, UseUpdateQuestionResult } from "@/hooks/useSubmit";
import { useMutation } from "@tanstack/react-query";
import { message } from "antd";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";

const QuizPreview = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user } = useAuthContext();
  const userId = user?.id;
  const topicId = searchParams.get("topicId");

  const { data, isLoading, error } = useFetchQuizQuestions(Number(topicId));
  const { data: testData, isLoading: isTestLoading, error: isTestError } = useFetchTests(Number(topicId));
  
  const [testResultId, setTestResultId] = useState<number | null>(null);
  const questionId = data?.data?.[0]?.attributes?.questions?.data?.[0]?.id;

  const { data: questionResultData, isLoading: questionResultLoading, error: questionResultError } = useFetchUserQuestionResults(Number(testResultId));

  console.log("query",questionResultData)
  const testId = testData?.data?.[0]?.id;

  const getUserQuestionResultId = (questionId:number) => {
    if (questionResultData && questionResultData.data.length > 0) {
      const userQuestionResult = questionResultData.data.find(
        (item:any) => item.attributes.questions.data[0]?.id === questionId
      );
      return userQuestionResult ? userQuestionResult.id : null;
    }
    return null;
  };

  const { mutate: submitQuestionResult } = useMutation({
    mutationFn: async ({ testResultId, userAnswer, passed, questionId }: { testResultId: number; userAnswer: string; passed: boolean, questionId: number }) => {
      return await createQuestionResult(passed, testResultId, userAnswer, questionId);
    },
    onSuccess: () => {
      message.success("Answer saved!");
    },
    onError: (err) => {
      console.error("Error saving answer:", err);
    },
  });

  const { mutate: updating } = useMutation({
    mutationFn: async ({ userQuestionResultId, userAnswer, passed }: { userQuestionResultId: number; userAnswer: string; passed: boolean }) => {
      return await UseUpdateQuestionResult(userQuestionResultId, userAnswer, passed,questionId);
    },
    onSuccess: () => {
      message.success("Answer updated!");
    },
    onError: (err) => {
      console.error("Error updating:", err);
    },
  });

  const handleOptionSelect = (userAnswer: string, passed: boolean, questionId: number) => {
    console.log("Option selected:", userAnswer);

    if (!testResultId) {
      console.log("Creating test result for the first question answered...");
      if (!userId || !topicId || !testId) {
        console.error("Missing userId, topicId, or testId");
        return;
      }

      submitting({
        userId,
        topicId: Number(topicId),
        testId: Number(testId),
        userAnswer,
        passed,
        questionId,
      });
    } else {
      console.log("Using existing Test Result ID:", testResultId);


    const userQuestionResultId = getUserQuestionResultId(questionId);
      console.log("id", userQuestionResultId)

      if (userQuestionResultId) {
        console.log("Updating user's answer for question ID:", userQuestionResultId);
        updating({ userQuestionResultId, userAnswer, passed });
      } else {
        console.error("User Question Result ID is undefined. Attempting to save new question result.");
        submitQuestionResult({ testResultId, userAnswer, passed, questionId });
      }
    }
  };

  const { mutate: submitting } = useMutation({
    mutationFn: async ({ userId, topicId, testId, userAnswer, passed, questionId }: { 
      userId: number; 
      topicId: number; 
      testId: number; 
      userAnswer: string; 
      passed: boolean; 
      questionId: number; 
    }) => {
      if (!userId) throw new Error("User not logged in");
      return await createTestResult(userId, topicId, testId);
    },
    onSuccess: (data, variables) => {
      const createdTestResultId = data?.id || data?.data?.id;
      console.log("Test result created successfully with ID:", createdTestResultId);

      if (createdTestResultId) {
        setTestResultId(createdTestResultId);
        submitQuestionResult({
          testResultId: createdTestResultId,
          userAnswer: variables.userAnswer,
          passed: variables.passed,
          questionId: variables.questionId
        });
      } else {
        console.error("Test Result ID is undefined.");
      }
    },
    onError: (err) => {
      console.error("Error creating test result:", err);
    },
  });

  const handlePreviousStep = () => {
    router.back();
  };

  if (isLoading || isTestLoading) return <p>Loading questions or tests...</p>;
  if (error || isTestError) return <p>Error loading questions or tests</p>;

  const allQuestions = data?.data?.flatMap((quiz: any) => quiz.attributes?.questions?.data) || [];

  return (
    <div className="sm:p-6 mb-5 w-full">
      <div className="flex max-md:flex-col sm:mt-6 mt-4 sm:justify-between w-full sm:gap-0 gap-4 sm:items-center">
        <button className="bg-white text-black border border-gray-600 py-2 px-8 rounded-md w-[100px] flex justify-start" onClick={handlePreviousStep}>
          Back
        </button>
        <h1 className="font-semibold text-lg">Quiz one - Typescript fundamentals</h1>
        <button className="bg-white text-black border border-gray-600 py-2 px-8 rounded-md w-[100px] flex justify-start">
          Submit
        </button>
      </div>

      <div className="bg-gray-100 border mt-10 rounded-lg p-4 border-gray-100 w-full h-auto">
        {allQuestions.map((questionItem: any, index: number) => {
          const questionText = questionItem?.attributes?.questions;
          const options = questionItem?.attributes?.options || [];

          return (
            <div key={index} className="flex flex-col py-10">
              <h1 className="underline">Question {index + 1}:</h1>
              <div className="sm:ml-5 mt-4 bg-white p-6">
                <h1 className="font-semibold my-3">{questionText}</h1>
                {options.map((option: any, optionIndex: string) => (
                  <div key={optionIndex} className="flex items-center mb-3 gap-3">
                    <input
                      type="radio"
                      name={`question-${index}`}
                      value={option}
                      id={`option-${index}-${optionIndex}`}
                      onChange={() => handleOptionSelect(option, true, questionItem.id)} 
                    />
                    <label htmlFor={`option-${index}-${optionIndex}`} className="text-gray-900">
                      {option}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default QuizPreview;
