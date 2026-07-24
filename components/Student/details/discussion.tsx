import { useAuthContext } from "@/components/AuthProvider/AuthContext";
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
  useFetchCount,
  useFetchLikedComments,
  useFetchReplyCount,
} from "@/hooks/useComments";
import Loader from "../loader";
import { useSearchParams } from "next/navigation";
import { RxAvatar } from "react-icons/rx";
import "react-loading-skeleton/dist/skeleton.css";
import { FaComment } from "react-icons/fa";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import Image from "next/image";

const Discussion = () => {
  const searchParams = useSearchParams();
  const topicId = searchParams.get("topicId");
  const [isPosting, setIsPosting] = useState(false);
  const [isSubmittingReply, setIsSubmittingReply] = useState(false);
  const queryClient = useQueryClient();
  const { user } = useAuthContext();
  const userId = Number(user?.id);
  const [topicComment, setTopicComment] = useState("");
  const [replyContent, setReplyContent] = useState("");
  const [commentId, setCommentId] = useState<number>(0);
  const [likedCommentsState, setLikedCommentsState] = useState<{
    [key: number]: boolean;
  }>({});
  const [showModalForComment, setShowModalForComment] = useState<number | null>(
    null
  );
  const [likedComments, setLikedComments] = useState<{
    [key: number]: boolean;
  }>({});
  const [showReplies, setShowReplies] = useState<{ [key: number]: boolean }>(
    {}
  );

  const { data, isLoading, error } = useFetchComments(topicId ?? "");
  const [totalCounts, setTotalCounts] = useState<{ [key: string]: number }>({});
  const [totalRepliesCount, setTotalRepliesCount] = useState<{
    [key: number]: number;
  }>({});
  const {
    data: allCommentLikes,
    isLoading: likesLoading,
    error: likesError,
  } = useFetchLikedComments(Number(userId));
  const { data: totalLikes } = useFetchCount();
  const { data: totalReplies } = useFetchReplyCount();

  useEffect(() => {
    if (totalLikes) {
      const initialLikeCounts = totalLikes?.data.reduce(
        (acc: any, item: any) => {
          const comment = item.attributes.comment?.data;
          if (comment) {
            const commentId = comment.id;
            acc[commentId] = (acc[commentId] || 0) + 1;
          }
          return acc;
        },
        {}
      );
      setTotalCounts(initialLikeCounts);
    }
  }, [totalLikes]);

  useEffect(() => {
    if (totalReplies) {
      const initialReplyCounts = totalReplies?.data.reduce(
        (acc: any, item: any) => {
          const comment = item.attributes.comment?.data;
          if (comment) {
            const commentId = comment.id;
            acc[commentId] = (acc[commentId] || 0) + 1;
          }
          return acc;
        },
        {}
      );
      setTotalRepliesCount(initialReplyCounts);
    }
  }, [totalReplies]);

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

  const openReplyModal = (commentId: number) => {
    setShowModalForComment(commentId);
    setCommentId(commentId);
  };

  const {
    data: commentReplies,
    isLoading: replyLoading,
    error: replyError,
  } = useFetchCommentReplies(Number(commentId));

  const handleCancel = () => {
    setShowModalForComment(null);
    setReplyContent("");
  };
 
  const { mutate: addToComments } = useMutation({
    mutationFn: async () => {
      if (!userId) throw new Error("User not logged in");
      return await addComment(topicId ?? "", userId, topicComment);
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
      queryClient.invalidateQueries({ queryKey: ["comments", topicId]});
    },
  });

  const { mutate: addToReplies } = useMutation({
    mutationFn: async ({
      commentId,
      userId,
      replyComment,
    }: {
      commentId: number;
      userId: number;
      replyComment: string;
    }) => {
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
      setReplyContent("");
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
      queryClient.invalidateQueries({ queryKey: ["comment_replies", commentId] });
    },
  });

  const toggleReplies = (commentId: number) => {
    setCommentId(commentId);
    setShowReplies((prevState) => ({
      ...prevState,
      [commentId]: !prevState[commentId],
    }));
  };

  const { mutate: addLikedCommentMutation, isPending } = useMutation({
    mutationFn: async (commentId: number) => {
      if (!userId) throw new Error("User not logged in");
      return await addLikedComment(commentId, userId);
    },
    onMutate: async (commentId: number) => {
      setLikedComments((prev) => ({ ...prev, [commentId]: true }));
    },
    onSuccess: () => {
      message.success("Comment liked.");
    },
    onError: (err, commentId) => {
      setLikedComments((prev) => ({ ...prev, [commentId]: false }));
      message.error("Failed to like comment.");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["comment_likes", userId] });
    },
  });

  const { mutate: removeLikedCommentMutation, isPending: isUnLiking } =
    useMutation({
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
        queryClient.invalidateQueries({ queryKey: ["comment_likes", userId] });
      },
    });

  const handleToggleWishlist = (commentId: number) => {
    const currentLiked = likedCommentsState[commentId];
    const updatedTotalCounts = { ...totalCounts };
    if (isPending || isUnLiking) return;
    if (currentLiked) {
      updatedTotalCounts[commentId] = (updatedTotalCounts[commentId] || 0) - 1;
      removeLikedCommentMutation(commentId);
      setLikedCommentsState((prev) => ({ ...prev, [commentId]: false }));
    } else {
      updatedTotalCounts[commentId] = (updatedTotalCounts[commentId] || 0) + 1;
      addLikedCommentMutation(commentId);
      setLikedCommentsState((prev) => ({ ...prev, [commentId]: true }));
    }

    setTotalCounts(updatedTotalCounts);
  };

  const handleComment = async () => {
    if (topicComment.trim()) {
      setIsPosting(true);
      try {
        addToComments(undefined, {
          onSettled: () => setIsPosting(false),
        });
       
      } catch (error) {
        message.error("There was an error posting the comment.");
        setIsPosting(false);
      }
    } else {
      message.error("Comment cannot be empty.");
    }
  };

  const handleReply = () => {
    if (replyContent.trim()) {
      setIsSubmittingReply(true);
      setTotalRepliesCount((prev) => ({
        ...prev,
        [commentId]: (prev[commentId] || 0) + 1,
      }));
      setIsSubmittingReply(true);
      addToReplies({
        commentId,
        userId: userId!,
        replyComment: replyContent,
      });
      setIsSubmittingReply(false);
      setShowModalForComment(null);
    } else {
      message.error("Please enter a reply.");
    }
  };

  if (replyLoading || likesLoading) {
    <div className="flex items-center justify-center ">
      <Loader />
    </div>;
  }

  if (replyError) {
    message.error("Failed to fetch replies. Please try again later.");
  }
  if (likesError) {
    message.error("Failed to fetch comment likes. Please try again later.");
  }
  if (isLoading) {
    return (
      <div className="flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (error) {
    message.error("Error fetching details. Please try again later.");
  }

  return (
    <div className="rounded-lg bg-gray-50 px-4 py-4 sm:px-6">
      <div className="flex items-center justify-between border-b border-gray-200 pb-3">
        <span className="text-sm font-semibold text-gray-800">
          {data?.data?.length || 0} comment{data?.data?.length === 1 ? "" : "s"}
        </span>
      </div>

      <div className="mt-4 flex items-start gap-3">
        <RxAvatar className="mt-1 shrink-0 text-3xl text-gray-400" />
        <div className="flex-1">
          <input
            type="text"
            value={topicComment}
            onChange={(e) => setTopicComment(e.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-500"
            placeholder="Add a comment..."
          />
          <div className="mt-2 flex justify-end">
            <button
              onClick={handleComment}
              disabled={isPosting}
              className={`rounded-md bg-gray-900 px-4 py-1.5 text-sm font-medium text-white transition hover:bg-gray-700 ${
                isPosting ? "cursor-not-allowed opacity-50" : ""
              }`}
            >
              {isPosting ? "Posting..." : "Post Comment"}
            </button>
          </div>
        </div>
      </div>

      <div className="mt-5 max-h-[650px] space-y-3 overflow-auto pr-1">
        {data?.data?.length > 0 ? (
          data?.data?.map((comment: any) => {
            const commentId = comment.id;
            const likeCount = totalCounts[commentId] || 0;
            const replyCount = totalRepliesCount[commentId] || 0;
            return (
              <div
                key={comment.id}
                className="rounded-lg border border-gray-200 bg-white p-3.5 sm:p-4"
              >
                <div className="flex items-center gap-3">
                  <Image
                    src={
                      comment.attributes.user.data?.attributes?.profilepicture
                        ?.data?.attributes?.url
                    }
                    alt={comment.attributes.user.data?.attributes?.username}
                    width={36}
                    height={36}
                    className="h-9 w-9 shrink-0 rounded-full object-cover"
                  />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-gray-900">
                      {comment.attributes.user.data?.attributes?.username ||
                        "Unknown User"}
                    </p>
                    <span className="text-xs text-gray-500">
                      {new Date(
                        comment.attributes.dateCreated
                      ).toLocaleString()}
                    </span>
                  </div>
                </div>

                <p className="mt-2.5 text-sm text-gray-800">
                  {comment?.attributes?.topicComment}
                </p>

                <div className="mt-3 flex items-center gap-6 text-sm">
                  <button
                    onClick={() => openReplyModal(comment.id)}
                    className="flex items-center gap-1.5 text-gray-500 transition hover:text-gray-800"
                  >
                    <FaComment />
                    <span>{replyCount}</span>
                  </button>
                  <button
                    onClick={() => handleToggleWishlist(comment.id)}
                    disabled={isPending || isUnLiking}
                    className="flex items-center gap-1.5 text-gray-500 transition hover:text-gray-800"
                  >
                    {likedCommentsState[comment.id] ? (
                      <AiFillHeart size={18} className="text-red-500" />
                    ) : (
                      <AiOutlineHeart size={18} />
                    )}
                    <span>{likeCount}</span>
                  </button>
                  {replyCount > 0 && (
                    <button
                      onClick={() => toggleReplies(comment.id)}
                      className="text-gray-500 transition hover:text-gray-800"
                    >
                      {showReplies[comment.id] ? "Hide replies" : "Show replies"}
                    </button>
                  )}
                </div>

                {showModalForComment === comment.id && (
                  <div className="mt-3 rounded-md bg-gray-50 p-3">
                    <textarea
                      value={replyContent}
                      onChange={(e) => setReplyContent(e.target.value)}
                      placeholder="Type your reply..."
                      rows={3}
                      className="w-full rounded-md border border-gray-300 p-2 text-sm outline-none focus:border-gray-500"
                    />
                    <div className="mt-2 flex justify-end gap-2">
                      <button
                        onClick={handleCancel}
                        className="rounded-md border border-gray-300 px-3 py-1.5 text-sm text-gray-700 transition hover:bg-gray-100"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleReply}
                        className="rounded-md bg-gray-900 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-gray-700"
                      >
                        {isSubmittingReply ? "Submitting..." : "Submit Reply"}
                      </button>
                    </div>
                  </div>
                )}

                {showReplies[comment.id] && commentReplies ? (
                  <div className="mt-3 space-y-3 border-l-2 border-gray-100 pl-4">
                    {commentReplies?.data?.length ? (
                      commentReplies.data.map((reply: any) => (
                        <div key={reply.id} className="flex items-start gap-3">
                          <Image
                            src={
                              reply.attributes.user.data?.attributes
                                ?.profilepicture?.data?.attributes?.url
                            }
                            alt={
                              reply.attributes.user.data?.attributes?.username
                            }
                            width={30}
                            height={30}
                            className="h-[30px] w-[30px] shrink-0 rounded-full object-cover"
                          />
                          <div className="min-w-0">
                            <p className="text-sm font-semibold text-gray-900">
                              {reply?.attributes?.user?.data?.attributes
                                ?.username || "Anonymous"}
                            </p>
                            <p className="text-sm text-gray-700">
                              {reply?.attributes?.Reply}
                            </p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-gray-500">
                        No replies to this comment yet.
                      </p>
                    )}
                  </div>
                ) : null}
              </div>
            );
          })
        ) : (
          <div className="flex items-center justify-center rounded-lg border border-dashed border-gray-300 py-10">
            <p className="text-sm font-medium text-gray-500">
              No comments yet. Be the first to comment!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Discussion;
