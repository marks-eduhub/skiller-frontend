import { useAuthContext } from "@/Context/AuthContext";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";
import { addComment, useFetchComments } from "@/hooks/useComments";
import { useSearchParams } from "next/navigation";
import { RxAvatar } from "react-icons/rx";
import "react-loading-skeleton/dist/skeleton.css";
import Skeleton from "react-loading-skeleton";
const Discussion = () => {
  const searchParams = useSearchParams();
  const topicId = searchParams.get("topicId");
  const { user } = useAuthContext();
  const userId = user?.id;
  const { data, isLoading, error } = useFetchComments(Number(topicId));
  
  const [topicComment, setTopicComment] = useState("");

  const queryClient = useQueryClient();

  const { mutate: addToComments } = useMutation({
    mutationFn: async () => {
      if (!userId) throw new Error("User not logged in");
      return await addComment(Number(topicId), userId, topicComment);
    },
    onMutate: async () => {
      if (!userId) return;
      
      await queryClient.cancelQueries({ queryKey: ["comments", topicId] });
      
      const previousComments = queryClient.getQueryData(["comments", topicId]);
      
      queryClient.setQueryData(["comments", topicId], (oldData: any) => {
        return {
          ...oldData,
          data: [
            ...(oldData?.data || []), 
            { id: Date.now(), attributes: { text: topicComment, userId } }
          ],
        };
      });
      
      return { previousComments };
    },
    onSuccess: () => {

      queryClient.invalidateQueries({ queryKey: ["comments", topicId] });
      setTopicComment(""); 
      message.success("Comment posted successfully!");
    },
    onError: (context: any) => {
      queryClient.setQueryData(["comments", topicId], context.previousComments);
      message.error("Failed to post comment.");
    },
  });
  

  const handleComment = () => {
    if (topicComment.trim()) {
      addToComments();
    } else {
      message.error("Comment cannot be empty.");
    }
  };
  const topicComments = data?.data;
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
            count={1}
            baseColor="#e0e0e0"
            highlightColor="#f5f5f5"
            enableAnimation={true}
          />
        </div>
      </div>
    );
  }

  if (error) {
    message.error("Error fetching details. Please try again later.");
  }

  return (
    <div className="pl-4 py-3 bg-gray-100 h-auto ">
      <span className="text-black ml-4 font-semibold">
        {topicComments?.length || 0} comments
      </span>
      <div className="flex ml-4 mt-4 items-center mb-4">
        <RxAvatar className="mr-3 text-5xl" />
        <h2 className="border-b border-gray-500 ">Add Comment...</h2>
      </div>
      <div className="flex">
        <input
          type="text"
          value={topicComment}
          onChange={(e) => setTopicComment(e.target.value)}
          className="border p-2 sm:w-3/4 rounded-lg mb-4"
          placeholder="Type your comment here..."
        />
      </div>
      <button
        onClick={handleComment}
        className="bg-gray-900 my-6 text-white px-4 py-2 rounded"
      >
        Post Comment
      </button>
      <div className="bg-gray-300 h-auto p-6 sm:mb-10">
        <div className="flex flex-col space-y-4 w-1/2 h-auto">
          {topicComments?.length > 0 ? (
            topicComments.map((comment: any) => (
              <div
                key={comment.id}
                className="p-4 border-b border-gray-400 bg-white rounded-lg shadow-sm"
              >
                <div className="flex items-center mb-2">
                  <RxAvatar className="mr-2 text-4xl" />
                  <div>
                    <p className="text-sm font-semibold">
                    {comment.attributes.user.data?.attributes?.username || "Unknown User"}

                    </p>
                    <small className="text-gray-500">
                      {new Date(
                        comment.attributes.dateCreated
                      ).toLocaleString()}
                    </small>
                  </div>
                </div>
                <p className="text-gray-700">
                  {comment.attributes.topicComment}
                </p>
              </div>
            ))
          ) : (
            <div className="flex items-center justify-center h-screen">
              <p className="text-center font-bold text-lg">No comments yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Discussion;
