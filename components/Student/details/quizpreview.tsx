"use client";
import { useAuthContext } from "@/Context/AuthContext";
import {
  useFetchQuizQuestions,
  UsefetchTestResult,
} from "@/hooks/useQuestions";
import {
  createQuestionResult,
  createTestResult,
  updateTestResultScore,
  UseUpdateQuestionResult,
} from "@/hooks/useSubmit";
import { CorrectAnswer, Question } from "@/lib/types";
import { useMutation } from "@tanstack/react-query";
import { message } from "antd";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import CustomModal from "./modal";
import "react-loading-skeleton/dist/skeleton.css";
import Skeleton from "react-loading-skeleton";
const QuizPreview = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user } = useAuthContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const userId = user?.id;
  const topicId = searchParams.get("topicId");
  const testId = searchParams.get("testId");
  const [timesAttempted, setTimesAttempted] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [testResultId, setTestResultId] = useState<number | null>(null);
  const [userQuestionResultsMap, setUserQuestionResultsMap] = useState<
    Record<number, number>
  >({});
  const { data, isLoading, error } = useFetchQuizQuestions(Number(testId));
  const { data: Resultdata } = UsefetchTestResult(
    Number(testId),
    Number(userId)
  );
  const questionId = data?.data?.[0]?.attributes?.questions?.data?.[0]?.id;

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const confirmSubmit = async (testId: number) => {
    await handleSubmitQuiz(testId);
    closeModal();
  };

  useEffect(() => {
    const fetchAndSetTimesAttempted = () => {
      if (Resultdata) {
        const attemptCount = Resultdata?.data?.length;
        setTimesAttempted(attemptCount);
      }
    };

    fetchAndSetTimesAttempted();
  }, [Resultdata]);
  
  const handlePreviousStep = () => {
    router.back();
  };
  const handleResetAnswer = (questionId: number) => {
    setUserAnswers((prevAnswers) => {
      const newAnswers = { ...prevAnswers };
      delete newAnswers[questionId];
      return newAnswers;
    });
  };
  const { mutate: submitQuestionResult } = useMutation({
    mutationFn: async ({
      testResultId,
      userAnswer,
      questionId,
      passed,
    }: {
      testResultId: number;
      userAnswer: string;
      passed: boolean;
      questionId: number;
    }) => {
      return await createQuestionResult(
        passed,
        testResultId,
        userAnswer,
        questionId
      );
    },
    onSuccess: (data, variables) => {
      const createdUserQuestionResultId = data?.id || data?.data?.id;

      if (createdUserQuestionResultId) {
        setUserQuestionResultsMap((prevMap: any) => ({
          ...prevMap,
          [variables.questionId]: createdUserQuestionResultId,
        }));
      }
      message.success("Answer saved!");
    },
    onError: (err) => {
      message.error("Error saving answer:");
    },
  });

  const { mutate: updating } = useMutation({
    mutationFn: async ({
      userQuestionResultId,
      userAnswer,
      passed,
    }: {
      userQuestionResultId: number;
      userAnswer: string;
      passed: boolean;
    }) => {
      return await UseUpdateQuestionResult(
        userQuestionResultId,
        userAnswer,
        passed,
        questionId
      );
    },
    onSuccess: () => {
      message.success("Answer updated!");
    },
    onError: (err) => {
      message.error("Error updating:");
    },
  });

  const { mutate: submitTestResult } = useMutation({
    mutationFn: async ({
      userId,
      topicId,
      testId,
      times_attempted,
    }: {
      userId: number;
      topicId: number;
      testId: number;
      userAnswer: string;
      passed: boolean;
      questionId: number;
      times_attempted: number;
    }) => {
      if (!userId) throw new Error("User not logged in");
      return await createTestResult(userId, topicId, testId, times_attempted);
    },
    onSuccess: (data, variables) => {
      const createdTestResultId = data?.id || data?.data?.id;

      if (createdTestResultId) {
        setTestResultId(createdTestResultId);

        submitQuestionResult({
          testResultId: createdTestResultId,
          userAnswer: variables.userAnswer,
          passed: variables.passed,
          questionId: variables.questionId,
        });
      } else {
        message.error("Test detail is missing.");
      }
    },
    onError: (err) => {
      message.error("Error creating test result:");
    },
  });

  const handleOptionSelect = (
    userAnswer: string,
    passed: boolean,
    questionId: number
  ) => {
    setUserAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: userAnswer,
    }));

    if (!testResultId) {
      if (!userId || !topicId || !testId) {
        message.error("Missing userId, topicId, or testId");
        return;
      }
      const newAttemptCount = timesAttempted + 1;
      submitTestResult({
        userId,
        topicId: Number(topicId),
        testId: Number(testId),
        userAnswer,
        passed,
        questionId,
        times_attempted: newAttemptCount,
      });
    } else {
      const userQuestionResultId = userQuestionResultsMap[questionId];

      if (userQuestionResultId) {
        updating({ userQuestionResultId, userAnswer, passed });
      } else {
        submitQuestionResult({
          testResultId,
          userAnswer,
          passed,
          questionId,
        });
      }
    }
  };

  const handleSubmitQuiz = async (testId: number) => {
    if (!testResultId) {
      message.error("Can't submit an empty test");
      return;
    }
  
    const correctAnswers: CorrectAnswer[] =
      data?.data?.map((quiz: any) => ({
        questionId: quiz.id,
        correctAnswer: quiz.attributes.answers, 
      })) || [];
  
    const correctAnswerMap = correctAnswers.reduce(
      (
        acc: Record<number, string | string[]>,
        { questionId, correctAnswer }: CorrectAnswer
      ) => {
        acc[questionId] = correctAnswer;
        return acc;
      },
      {}
    );
 
  
    let passedCount = 0;
    const totalQuestions = Object.keys(userAnswers).length;
  
    for (const questionId in userAnswers) {
      const userAnswer = userAnswers[questionId];
      const correctAnswer = correctAnswerMap[Number(questionId)];
  
      
  
      const passed =
        Array.isArray(correctAnswer)
          ? correctAnswer.includes(userAnswer)
          : userAnswer.trim().toLowerCase() === correctAnswer.trim().toLowerCase();
  
     
  
      if (passed) {
        passedCount++;
      }
  
      const userQuestionResultId = userQuestionResultsMap[Number(questionId)];
      if (userQuestionResultId) {
        updating({ userQuestionResultId, userAnswer, passed });
      } else {
        submitQuestionResult({
          testResultId,
          userAnswer,
          passed,
          questionId: Number(questionId),
        });
      }
    }
  
    const scorePercentage = (passedCount / totalQuestions) * 100;
    const roundedScore = Math.round(scorePercentage);
  
    await updateTestResultScore(testResultId, roundedScore);
  
    message.success(`Quiz submitted successfully!`);
    setUserAnswers({});
    router.back();
  };
  

  

  if (isLoading) {
    return (
      <div>
        <h2 className="text-lg font-300 my-4 ">
          <Skeleton
            width={200}
            height={24}
            baseColor="#e0e0e0"
            highlightColor="#f0f0f0"
          />
        </h2>

        <div>
          <Skeleton
            height={300}
            count={3}
            baseColor="#e0e0e0"
            highlightColor="#f5f5f5"
            enableAnimation={true}
          />
        </div>
      </div>
    );
  }
  if (error) {
    message.error("Error fetching . Please try again later.");
  }

  return (
    <div className="sm:p-6 mb-5 w-full">
      <div className="flex max-md:flex-col sm:mt-6 mt-4 sm:justify-between w-full sm:gap-0 gap-4 sm:items-center">
        <button
          className="bg-white text-black border border-gray-600 py-2 px-8 rounded-md w-[100px] flex justify-start"
          onClick={handlePreviousStep}
        >
          Back
        </button>
        <h1 className="font-semibold text-lg">
          Quiz one - Typescript fundamentals
        </h1>
        <button
          className="bg-white text-black border border-gray-600 py-2 px-8 rounded-md w-[100px] flex justify-start"
          onClick={openModal}
        >
          Submit
        </button>
      </div>

      <div className="bg-gray-100 border mt-10 rounded-lg p-4 border-gray-100 w-full h-auto">
        {data &&
          data?.data?.map((questionItem: any, index: number) => {
            const questionText = questionItem?.attributes?.questions;
            const options = questionItem?.attributes?.options || [];

            return (
              <div key={index} className="flex flex-col py-10">
                <h1 className="underline">Question {index + 1}:</h1>
                <div className="sm:ml-5 mt-4 bg-white p-6">
                  <div className="flex sm:flex-row flex-col sm:items-center sm:justify-between">
                  <h1 className="font-semibold my-3">{questionText}</h1>
                  <button
                    className="sm:ml-4 border-2 border-black rounded-md bg-white sm:py-1 sm:px-4 sm:w-[150px] w-1/2 sm:mb-0 mb-4"
                    onClick={() => handleResetAnswer(questionItem.id)}
                  >
                    Reset option
                  </button>
                  </div>
                  {options.map((option: any, optionIndex: string) => {
                    return (
                      <div
                        key={optionIndex}
                        className="flex items-center mb-3 gap-3"
                      >
                        <input
                          type="radio"
                          name={`question-${index}`}
                          value={option}
                          id={`option-${index}-${optionIndex}`}
                          onChange={() =>
                            handleOptionSelect(option, true, questionItem.id)
                          }
                          checked={userAnswers[questionItem.id] === option} 
                        />
                        <label
                          htmlFor={`option-${index}-${optionIndex}`}
                          className="text-gray-900"
                        >
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
      <CustomModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={() => {
          if (testId) {
            confirmSubmit(Number(testId));
          } else {
            message.error("Try again later.");
          }
        }}
      />
    </div>
  );
};

export default QuizPreview;
