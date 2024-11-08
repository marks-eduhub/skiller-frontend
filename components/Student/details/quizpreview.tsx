"use client";
import { useAuthContext } from "@/Context/AuthContext";
import { useFetchQuizQuestions } from "@/hooks/useQuestions";
import { createQuestionResult, createTestResult, updateTestResultScore, UsefetchTestResult, useFetchTests,useFetchUserQuestionResults, UseUpdateQuestionResult } from "@/hooks/useSubmit";
import { CorrectAnswer, Question } from "@/lib/types";
import { useMutation } from "@tanstack/react-query";
import { message } from "antd";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import CustomModal from "./modal"
import "react-loading-skeleton/dist/skeleton.css";
import Skeleton from "react-loading-skeleton";
const QuizPreview = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user } = useAuthContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const userId = user?.id;
  const topicId = searchParams.get("topicId");
  const [timesAttempted, setTimesAttempted] = useState(0); 
  const { data, isLoading, error } = useFetchQuizQuestions(Number(topicId));
  const{data:Resultdata, isLoading:resultloading, error:resulterror} = UsefetchTestResult(Number(topicId), Number(userId))
  const { data: testData, isLoading: isTestLoading, error: isTestError } = useFetchTests(Number(topicId));
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [testResultId, setTestResultId] = useState<number | null>(null);
  const [userQuestionResultsMap, setUserQuestionResultsMap] = useState<Record<number, number>>({});
  const questionId = data?.data?.[0]?.attributes?.questions?.data?.[0]?.id;
  const testId = testData?.data?.[0]?.id;
  const MAX_ATTEMPTS = 3; 

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const confirmSubmit = async () => {
    await handleSubmitQuiz(); 
    closeModal(); 
};

  useEffect(() => {
    const fetchAndSetTimesAttempted = () => {
      if (Resultdata) {
        const attemptCount = Resultdata?.data?.length ; 
        setTimesAttempted(attemptCount); 
      }
    };

    fetchAndSetTimesAttempted();
  }, [Resultdata]); 

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
    mutationFn: async ({ userId, topicId, testId, times_attempted }: { 
      userId: number; 
      topicId: number; 
      testId: number; 
      userAnswer: string; 
      passed: boolean; 
      questionId: number; 
      times_attempted:number
    }) => {
      if (!userId) throw new Error("User not logged in");
      return await createTestResult(userId, topicId, testId, times_attempted);
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
          questionId: variables.questionId,
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

//   if (timesAttempted >= MAX_ATTEMPTS) {
//     message.error("You have reached the maximum attempts for this test.");
//     return; 
// }
  setUserAnswers(prevAnswers => ({
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
          times_attempted: newAttemptCount
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


const handleSubmitQuiz = async () => {
  if (!testResultId) {
    message.error("No test result found.");
    return;
  }


  const correctAnswers: CorrectAnswer[] = data?.data?.flatMap((quiz: { attributes: { questions: { data: Question[] }}}) =>
    quiz.attributes?.questions?.data.map((q) => ({
      questionId: q.id,
      correctAnswer: q.attributes.answers, 
    }))
  ) || [];
  
  const correctAnswerMap = correctAnswers.reduce(
    (acc: Record<number, string>, { questionId, correctAnswer }: CorrectAnswer) => {
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

    const passed = userAnswer === correctAnswer;
    if (passed) {
      passedCount++;
    }

    const userQuestionResultId = userQuestionResultsMap[Number(questionId)];
    if (userQuestionResultId) {
      console.log(`Updating user's answer for question ID: ${questionId}`);
      updating({ userQuestionResultId, userAnswer, passed });
    } else {
      console.log(`Creating new User Question Result for question ID: ${questionId}`);
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

  message.success(`Quiz submitted successfully!`);
  setUserAnswers({});
  router.back();
};

 
  const handlePreviousStep = () => {
    router.back();
  };
 
  if (isLoading || isTestLoading) {
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
  if (error || isTestError) {
    message.error("Error fetching details. Please try again later.");
  }

  const allQuestions = data?.data?.flatMap((quiz: any) => quiz.attributes?.questions?.data) || [];
 
  return (
    <div className="sm:p-6 mb-5 w-full">
      <div className="flex max-md:flex-col sm:mt-6 mt-4 sm:justify-between w-full sm:gap-0 gap-4 sm:items-center">
        <button className="bg-white text-black border border-gray-600 py-2 px-8 rounded-md w-[100px] flex justify-start" onClick={handlePreviousStep}>
          Back
        </button>
        <h1 className="font-semibold text-lg">Quiz one - Typescript fundamentals</h1>
        <button className="bg-white text-black border border-gray-600 py-2 px-8 rounded-md w-[100px] flex justify-start" onClick={openModal}>
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
      <CustomModal 
    isOpen={isModalOpen} 
    onClose={closeModal} 
    onConfirm={confirmSubmit} 
/>
    </div>
  );
};
 
export default QuizPreview;