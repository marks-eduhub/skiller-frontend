import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { postQuestion } from "@/hooks/useCommunity";
import { useAuthContext } from "@/components/AuthProvider/AuthContext";
import { message } from "antd";
import dynamic from "next/dynamic";

const DotPulseWrapper = dynamic(() => import("@/hooks/pulse"), { ssr: false });

const QuestionModal = () => {
  const { user } = useAuthContext();
  const userId = String(user?.id);
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [questionContent, setQuestionContent] = useState("");
  const [isSubmittingQuestion, setIsSubmittingQuestion] = useState(false);

  const { mutate: postQuestionMutation } = useMutation({
    mutationFn: async ({
      Question,
      userId,
    }: {
      Question: string;
      userId: string;
    }) => {
      return await postQuestion(Question, userId);
    },
    onMutate: async ({ Question, userId }) => {
      const previousData = queryClient.getQueryData(["communityDetails"]);

      const optimisticQuestion = {
        id: new Date().toISOString(),
        attributes: {
          Question,
          userId,
          createdAt: new Date().toISOString(),
        },
      };

      queryClient.setQueryData(["communityDetails"], (oldData: any) => ({
        ...oldData,
        data: [optimisticQuestion, ...(oldData?.data || [])],
      }));

      return { previousData };
    },
    onError: ( err, variables, context: any) => {
      queryClient.setQueryData(["communityDetails"], context.previousData);
      message.error("Failed to post question.");
      setIsSubmittingQuestion(false);
    },
    onSuccess: () => {
      message.success("Question posted successfully!");
      setIsSubmittingQuestion(false);
    },
    onSettled: () => {
      setIsSubmittingQuestion(false);
      queryClient.invalidateQueries({ queryKey: ["communityDetails"] });
    },
  });

  const handleQuestion = () => {
    if (!questionContent.trim()) {
      message.error("Please enter a question!");
      return;
    }

    setIsSubmittingQuestion(true);
    postQuestionMutation({ Question: questionContent, userId });

    setQuestionContent("");
    setIsModalOpen(false);
  };

  return (
    <div className="relative">
      <button
        className="rounded bg-gray-600 px-4 py-2 text-sm text-white sm:mb-4"
        onClick={() => {
          setIsModalOpen(true);
        }}  >
         Add New Question
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4 ">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-[350px] sm:max-w-md ">
            <h2 className="text-lg font-semibold mb-4">Add Your Question</h2>

            <ReactQuill
              value={questionContent}
              onChange={setQuestionContent}
              className="community-editor mb-4"
              theme="snow"
            />

            <div className="flex justify-center sm:flex-row sm:justify-end sm:gap-2 gap-8">
              <button
                className=" sm:w-auto px-4 py-2 bg-gray-600 text-white rounded "
                onClick={handleQuestion}
                disabled={isSubmittingQuestion}
              >
                {isSubmittingQuestion ? 
                 <DotPulseWrapper type="metronome" size="30" speed="1.75" color="white" />

                 : "Post your Question"}
              </button>
              <button
                className="sm:w-auto px-4 py-2 bg-red-600 text-white rounded"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionModal;
