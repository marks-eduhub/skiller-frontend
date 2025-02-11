import React, { useEffect, useState } from "react";
import Step1 from "../setQuiz/step1";
import Step2 from "../setQuiz/step2";
import Step3 from "../setQuiz/step3";
import { useFetchCourseTests } from "@/hooks/useSubmit";
import { useAuthContext } from "@/Context/AuthContext";
import StepTracker from "../setQuiz/tracker";
import QuizPreview from "../setQuiz/quizPreview";
import Loader from "@/components/Student/loader";
import { useMutation } from "@tanstack/react-query";
import { EditTest, EditTestQuestion, useFetchTestQuestions } from "@/hooks/useSetQuiz";
import { message } from "antd";

interface QuizModalProps {
  modalOpen: boolean;
  onClose: () => void;
  selectedTest: { testId: number; topicId: number };
}

const QuizModal: React.FC<QuizModalProps> = ({
  modalOpen,
  onClose,
  selectedTest,
}) => {
  const { topicId } = selectedTest;

  const { data: testData, isLoading } = useFetchCourseTests(topicId);

  const [testname, setTestname] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [passmark, setPassmark] = useState("");
  const [quizData, setQuizData] = useState<any[]>([]);

  const [currentStep, setCurrentStep] = useState(1);

  useEffect(() => {
    if (Array.isArray(testData?.data) && selectedTest?.testId) {
      const test = testData.data.find(
        (t: any) => t.id === selectedTest.testId
      )?.attributes;
  
      if (test) {
        setTestname(test.testname || "");
        setDescription(test.testdescription || "");
        setDuration(test.testduration || "");
        setPassmark(test.passmark || "");
  
        setQuizData(
          Array.isArray(test.questions?.data)
            ? test.questions.data.map((q: any) => ({
                questionId: q.id, 
                question: q.attributes.questions,
                options: q.attributes.options,
                answer: q.attributes.answers,
              }))
            : []
        );
      }
    }
  }, [testData, selectedTest]);
  

  const { mutate: editTestMutation } = useMutation({
    mutationFn: async ({
        testId,
        testname,
        testdescription,
        testduration,
        topicId,
        passmark,
    }: {
        testId: number;
        testname: string;
        testdescription: string;
        testduration: string;
        topicId: string;
        passmark: string;
     
    }) => {
      return await EditTest(
        testId,
        testname,
        testdescription,
        testduration,
        topicId,
        passmark
      );
    },
    onSuccess: () => {
      message.success("Test data edited successfully!");
    },
    onError: (err) => {
      message.error("Error editing test data");
    },
  });

  const { mutate: editTestQuestionMutation } = useMutation({
    mutationFn: async ({
     questionId,
      questions,
      options,
      answers,
      testId,
    }: {
     questionId: number;
      questions: string;
      options: string[];
      answers: string;
      testId: number;
    }) => {
      return await EditTestQuestion({
        questionId,
        questions,
        options,
        answers,
        testId,
      });
    },
    onSuccess: () => {
      message.success("Test questions edited successfully!");
    },
    onError: (err) => {
      message.error("Error editing test questions");
    },
  });

  const handleNext = () => setCurrentStep((prev) => Math.min(prev + 1, 4));
  const handlePrev = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  const handleSubmitQuiz = async () => {
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
      return;
    }
    if (!passmark) {
      message.error("Please enter the test passmark.");
      return;
    }
  
    try {
       editTestMutation({
        testId: selectedTest.testId,
        testname,
        testdescription: description,
        testduration: duration,
        topicId: String(topicId),
        passmark,
      });
  
      quizData.forEach(({ questionId, question, options, answer }) => {
        if (question && options.length > 0 && answer) {
          editTestQuestionMutation({
            questionId,  
            questions: question,
            options,
            answers: answer,
            testId: selectedTest.testId,  
          });
        }
      });
  
      message.success("Quiz edited successfully");
      onClose();
    } catch (error) {
      message.error("Failed to edit quiz.");
    }
  };
  
  

  return (
    <div
      className={`fixed inset-0 bg-opacity-50 z-50 flex items-center justify-end ${
        modalOpen ? "translate-x-0" : "translate-x-full"
      } transition-transform duration-300`}
    >
      <div className="w-[600px] bg-white h-full p-6 shadow-lg overflow-y-auto ">
        <button
          onClick={onClose}
          className="text-gray-600 text-sm px-4 py-2 border border-black rounded-md mb-4"
        >
          Close
        </button>
        <h2 className="text-xl  mb-4 flex items-center justify-center">
          Edit Test Details
        </h2>

        {isLoading ? (
          <div className="flex items-center justify-center min-h-screen">
            <Loader />
          </div>
        ) : (
          <>
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
                passmark={passmark}
                setPassmark={setPassmark}
                topic={String(topicId)}
                setTopic={() => {}}
                courseId={1}
              />
            )}
            {currentStep === 3 && (
              <Step3 quizData={quizData} setQuizData={setQuizData} />
            )}
            {currentStep === 4 && (
              <QuizPreview
                quizData={quizData}
                handlePreviousStep={handlePrev}
                handleSubmitQuiz={handleSubmitQuiz}
              />
            )}

            <div className="flex justify-between mt-4">
              {currentStep > 1 && (
                <button
                  onClick={handlePrev}
                  className="bg-white border-2 border-black  px-4 py-2 rounded"
                >
                  Previous
                </button>
              )}
              {currentStep < 4 ? (
                <button
                  onClick={handleNext}
                  className="bg-black text-white px-4 py-2 rounded"
                >
                  Next
                </button>
              ) : (
                <button
                  onClick={handleSubmitQuiz}
                  className="bg-black text-white px-4 py-2 rounded"
                >
                  Save Changes
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default QuizModal;
