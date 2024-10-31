"use client";
import { useAuthContext } from "@/Context/AuthContext";
import { useFetchQuizQuestions } from "@/hooks/useQuestions";
import { createQuestionResult, createTestResult, updateTestResultScore, useFetchTests, useFetchUserQuestionResults, UseUpdateQuestionResult } from "@/hooks/useSubmit";
import { Question } from "@/lib/types";
import { useMutation } from "@tanstack/react-query";
import { message } from "antd";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
 
const QuizPreview = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user } = useAuthContext();
  const userId = user?.id;
  const topicId = searchParams.get("topicId");
 
  const { data, isLoading, error } = useFetchQuizQuestions(Number(topicId));
  
  const { data: testData, isLoading: isTestLoading, error: isTestError } = useFetchTests(Number(topicId));
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});

  const [testResultId, setTestResultId] = useState<number | null>(null);
  const [userQuestionResultsMap, setUserQuestionResultsMap] = useState<Record<number, number>>({});
  const questionId = data?.data?.[0]?.attributes?.questions?.data?.[0]?.id;

  const testId = testData?.data?.[0]?.id;
  const { mutate: submitQuestionResult } = useMutation({
    mutationFn: async ({ testResultId, userAnswer, questionId, passed }: { testResultId: number; userAnswer: string; passed: boolean, questionId: number }) => {
      return await createQuestionResult(passed, testResultId,  userAnswer, questionId);
    },
    onSuccess: (data, variables) => {
      const createdUserQuestionResultId = data?.id || data?.data?.id;
      console.log("User Question Result created successfully with ID:", createdUserQuestionResultId);
 
      if (createdUserQuestionResultId) {
          setUserQuestionResultsMap((prevMap:any) => ({
              ...prevMap,
              [variables.questionId]: createdUserQuestionResultId,
          }));
      }
      message.success("Answer saved!");
    },
    onError: (err) => {
      console.error("Error saving answer:", err);
    },
  });
 
  const { mutate: updating } = useMutation({
    mutationFn: async ({ userQuestionResultId, userAnswer, passed }: { userQuestionResultId: number; userAnswer: string; passed: boolean }) => {
      return await UseUpdateQuestionResult(userQuestionResultId, userAnswer, passed, questionId);
    },
    onSuccess: () => {
      message.success("Answer updated!");
    },
    onError: (err) => {
      console.error("Error updating:", err);
    },
  });

  
 
  const { mutate: submitTestResult } = useMutation({
    mutationFn: async ({ userId, topicId, testId }: { 
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

 
const handleOptionSelect = (userAnswer: string, passed: boolean, questionId: number) => {
  console.log("Option selected:", userAnswer);
  
  setUserAnswers(prevAnswers => ({
      ...prevAnswers,
      [questionId]: userAnswer, 
  }));

  if (!testResultId) {
      console.log("Creating test result for the first question answered...");
      if (!userId || !topicId || !testId) {
          message.error("Missing userId, topicId, or testId");
          return;
      }

      submitTestResult({
          userId,
          topicId: Number(topicId),
          testId: Number(testId),
          userAnswer,
          passed,
          questionId,
      });
  } else {
      console.log("Using existing Test Result ID:", testResultId);

      const userQuestionResultId = userQuestionResultsMap[questionId];
      console.log("User Question Result ID:", userQuestionResultId);

      if (userQuestionResultId) {
          console.log("Updating user's answer for question ID:", userQuestionResultId);
          updating({ userQuestionResultId, userAnswer, passed });
      } else {
          console.log("Creating new User Question Result for question ID:", questionId);
          submitQuestionResult({
              testResultId,
              userAnswer,
              passed,
              questionId,
          });
      }
  }
};




const handleSubmitQuiz = async () => {
  if (!testResultId) {
      message.error("No test result found.");
      return;
  }

  
  const correctAnswers = data?.data?.flatMap((quiz: { attributes: { questions: { data: Question[] }}}) =>
    quiz.attributes?.questions?.data.map((q) => ({
        questionId: q.id,
        correctAnswer: q.attributes.answers, 
    }))
) || [];


  const correctAnswerMap = correctAnswers.reduce((acc:any, questionId:number, correctAnswer:string ) => {
      acc[questionId] = correctAnswer;
      return acc;
  }, {});

  let passedCount = 0;
  const totalQuestions = Object.keys(userAnswers).length;

  for (const questionId in userAnswers) {
      const userAnswer = userAnswers[questionId];
      const correctAnswer = correctAnswerMap[questionId];

      const passed = userAnswer === correctAnswer;

      if (passed) {
          passedCount++;
      }

      
      const userQuestionResultId = userQuestionResultsMap[questionId];

      if (userQuestionResultId) {
          console.log("Updating user's answer for question ID:", userQuestionResultId);
          
          updating({ userQuestionResultId, userAnswer, passed });
      } else {
          console.log("Creating new User Question Result for question ID:", questionId);
          submitQuestionResult({
              testResultId,
              userAnswer,
              passed,
              questionId: Number(questionId),
          });
      }
  }

  const scorePercentage = (passedCount / totalQuestions) * 100;

  await updateTestResultScore(testResultId, scorePercentage);

  message.success("Quiz submitted successfully! Your score is: " + scorePercentage.toFixed(2) + "%");
};


 
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
        <button className="bg-white text-black border border-gray-600 py-2 px-8 rounded-md w-[100px] flex justify-start"onClick={ handleSubmitQuiz}>
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
 
                {options.map((option: any, optionIndex: string) => {
 
    return (
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
    );
})}
 
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
 
export default QuizPreview;