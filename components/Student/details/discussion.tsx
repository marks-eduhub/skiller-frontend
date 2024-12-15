import { useAuthContext } from "@/Context/AuthContext";
import { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";
import {
  addComment,
  addLikedComment,
  addReply,
  removeLikedComment,
  useFetchCommentReplies,
  useFetchComments,
  useFetchLikedComments,
} from "@/hooks/useComments";
import Loader from "../loader";
import { useSearchParams } from "next/navigation";
import { RxAvatar } from "react-icons/rx";
import "react-loading-skeleton/dist/skeleton.css";
import Skeleton from "react-loading-skeleton";
import { FaComment } from "react-icons/fa";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";


const Discussion = () => {
  const searchParams = useSearchParams();
  const topicId = searchParams.get("topicId");
  const queryClient = useQueryClient();
  const { user } = useAuthContext();
  const userId = user?.id;
  const [topicComment, setTopicComment] = useState("");
  const [replyContent, setReplyContent] = useState("");
  const [commentId, setCommentId] = useState<number | null>(null);
  const [likedCommentsState, setLikedCommentsState] = useState<{ [key: number]: boolean;}>({});
  const [showModalForComment, setShowModalForComment] = useState<number | null>(null);
  const [likedComments, setLikedComments] = useState<{[key: number]: boolean;}>({});
  const [showReplies, setShowReplies] = useState<{ [key: number]: boolean }>({});

  const { data, isLoading, error } = useFetchComments(Number(topicId));
  const { data: allCommentLikes , isLoading:likesLoading, error: likesError, } = useFetchLikedComments(Number(userId));

  useEffect(() => {
    if (allCommentLikes?.data) {
      const likesByCommentId: { [key: number]: boolean } = {};
  
      allCommentLikes.data.forEach((like: any) => {
        const commentId = like.attributes?.comment?.data?.id;
        const userIdForUser = like.attributes?.user?.data?.id;
  
        if (commentId && userIdForUser === userId) {
          likesByCommentId[commentId] = true; 
        }
      });
  
      setLikedCommentsState(likesByCommentId); 
    }
  }, [allCommentLikes, userId]);
  

  const openReplyModal = (commentId: number | null) => {
    setShowModalForComment(commentId);
    setCommentId(commentId);
  };

  const { data: commentReplies, isLoading: replyLoading, error: replyError, } = useFetchCommentReplies(Number(commentId));

  const handleCancel = () => {
    setShowModalForComment(null);
    setCommentId(null);
    setReplyContent("");
  };

  const handleComment = () => {
    if (topicComment.trim()) {
      addToComments();
    } else {
      message.error("Comment cannot be empty.");
    }
  };

  const handleReply = () => {
    if (replyContent.trim()) {
      addToReplies({
        commentId,
        userId: userId!,
        replyComment: replyContent,
      });
      setShowModalForComment(null);
    } else {
      message.error("Please enter a reply.");
    }
  };

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
        const newComment = {
          id: Date.now(),
          attributes: {
            topicComment,
            createdAt: new Date().toISOString(),
            user: { id: userId, username: "Current User" },
          },
        };
        return { ...oldData, data: [...(oldData?.data || []), newComment] };
      });
      return { previousComments };
    },
    onSuccess: () => {
      message.success("Comment posted successfully!");
      setTopicComment("");
    },
    onError: (err, variables, context: any) => {
      if (context?.previousComments) {
        queryClient.setQueryData(
          ["comments", topicId],
          context.previousComments
        );
      }
      message.error("Failed to post comment.");
    },
    onSettled: () => {
      queryClient.invalidateQueries(["comments", topicId]);
    },
  });

  const { mutate: addToReplies } = useMutation({
    mutationFn: async ({commentId, userId, replyComment, }: {commentId: number | null;userId: number;replyComment: string;}) => {
      if (!userId) throw new Error("User not logged in");
      return await addReply(commentId, userId, replyComment);
    },
    onMutate: async ({ commentId, userId, replyComment }) => {
      if (!userId) return;
      await queryClient.cancelQueries({
        queryKey: ["comment_replies", commentId],
      });
      const previousReplies = queryClient.getQueryData([
        "comment_replies",
        commentId,
      ]);
      queryClient.setQueryData(
        ["comment_replies", commentId],
        (oldData: any) => {
          const newReply = {
            id: Date.now(),
            attributes: {
              replyComment,
              createdAt: new Date().toISOString(),
              user: { id: userId, username: "Current User" },
            },
          };
          return { ...oldData, data: [...(oldData?.data || []), newReply] };
        }
      );
      return { previousReplies };
    },
    onSuccess: () => {
      message.success("Reply posted successfully!");
    },
    onError: (err, variables, context: any) => {
      if (context?.previousReplies) {
        queryClient.setQueryData(
          ["comment_replies", context.commentId],
          context.previousReplies
        );
      }
      message.error("Failed to post reply.");
    },
    onSettled: () => {
      queryClient.invalidateQueries(["comment_replies", commentId]);
    },
  });

  const toggleReplies = (commentId: number) => {
    setCommentId(commentId)
    setShowReplies((prevState) => ({
      ...prevState,
      [commentId]: !prevState[commentId],
    }));
  };

  const { mutate: addLikedCommentMutation } = useMutation({
    mutationFn: async (commentId: number) => {
      if (!userId) throw new Error("User not logged in");
      return await addLikedComment(commentId, userId);
    },
    onMutate: async (commentId: number) => {
      setLikedComments((prev) => ({ ...prev, [commentId]: true }));
    },
    onSuccess: (_, commentId) => {
      message.success("Comment liked.");
    },
    onError: (err, commentId) => {
      setLikedComments((prev) => ({ ...prev, [commentId]: false }));
      message.error("Failed to like comment.");
    },
    onSettled: () => {
      queryClient.invalidateQueries(["comment_likes", userId]);
    },
  });

  const { mutate: removeLikedCommentMutation } = useMutation({
    mutationFn: async (commentId: number) => {
      if (!userId) throw new Error("User not logged in");
      return await removeLikedComment(commentId, userId);
    },
    onMutate: async (commentId: number) => {
      setLikedComments((prev) => ({ ...prev, [commentId]: false }));
    },
    onSuccess: (_, commentId) => {
      message.success("Comment unliked.");
    },
    onError: (err, commentId) => {
      setLikedComments((prev) => ({ ...prev, [commentId]: true }));
      message.error("Failed to unlike comment.");
    },
    onSettled: () => {
      queryClient.invalidateQueries(["comment_likes", userId]);
    },
  });

  const handleToggleWishlist = (commentId: number) => {
    if (likedCommentsState[commentId]) {
      removeLikedCommentMutation(commentId);
      setLikedCommentsState((prev) => ({ ...prev, [commentId]: false }));
    } else {
      addLikedCommentMutation(commentId);
      setLikedCommentsState((prev) => ({ ...prev, [commentId]: true }));
    }
  };
  
if(replyLoading || likesLoading) {
  <Loader/>
}

if(replyError) {
  message.error("Failed to fetch replies. Please try again later.");
}
if(likesError) {
  message.error("Failed to fetch comment likes. Please try again later.");
}
  if (isLoading ) {
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
        {data?.data?.length || 0} comments
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

      <div className="bg-gray-100 h-auto p-6 sm:mb-10">
        <div className="flex flex-col space-y-4 w-1/2 h-auto">
          {data?.data?.length > 0 ? (
            data?.data?.map((comment: any) => (
              <div
                key={comment.id}
                className="p-4 border-b border-gray-400 bg-white rounded-lg shadow-sm"
              >
                <div className="flex items-center mb-2">
                  <RxAvatar className="mr-2 text-4xl" />
                  <div>
                    <p className="text-sm font-semibold">
                      {comment.attributes.user.data?.attributes?.username ||
                        "Unknown User"}
                    </p>
                    <small className="text-gray-500">
                      {new Date(
                        comment.attributes.dateCreated
                      ).toLocaleString()}
                    </small>
                  </div>
                </div>
                <div className="flex flex-col">
                  <p>{comment?.attributes?.topicComment}</p>
                  <div className="flex gap-10 mt-2">
                    <button onClick={() => openReplyModal(comment.id)}>
                      <FaComment />
                    </button>
                    <button onClick={() => handleToggleWishlist(comment.id)}>
                      {likedCommentsState[comment.id] ? (
                        <AiFillHeart size={20} className="text-red-500" />
                      ) : (
                        <AiOutlineHeart size={20} className="text-gray-500" />
                      )}
                    </button>
                  </div>
                </div>
                {showModalForComment === comment.id && (
                  <div className="mt-4">
                    <h1 className="text-gray-700 ml-2">Reply here</h1>
                    <div className="">
                      <textarea
                        value={replyContent}
                        onChange={(e) => setReplyContent(e.target.value)}
                        placeholder="Type your reply..."
                        rows={4}
                        className="border p-2 w-full outline-none"
                      />
                      <button
                        onClick={handleReply}
                        className="bg-gray-600 text-white px-4 py-2 rounded mt-2"
                      >
                        Submit Reply
                      </button>
                      <button
                        onClick={handleCancel}
                        className="bg-red-900 text-white px-4 py-2 rounded mt-2 ml-4"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
                <div className="mt-4">
                  <button
                    onClick={() => toggleReplies(comment.id)}
                    className="text-blue-800 hover:text-blue-500"
                  >
                    {showReplies[comment.id] ? "Hide Replies" : "Show Replies"}
                  </button>

                  {showReplies[comment.id] && commentReplies ? (
                    <div>
                      {commentReplies?.data?.length ? (
                        commentReplies.data.map((reply: any) => (
                          <div key={reply.id} className="ml-6 mt-3">
                            <div className="flex">
                              <RxAvatar className="mr-2 text-3xl" />
                              <div>
                                <p className="font-semibold">
                                  {reply?.attributes?.user?.data?.attributes
                                    ?.username || "Anonymous"}
                                </p>
                                <p>{reply?.attributes?.Reply}</p>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p className="my-2 text-gray-500">
                          No replies to this comment yet.
                        </p>
                      )}
                    </div>
                  ) : null}
                </div>
              </div>
            ))
          ) : (
            <div className="h-screen flex items-center justify-center">
              <p className="text-center font-semibold ml-[300px]">
                No comments yet. Be the first to comment!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Discussion;
