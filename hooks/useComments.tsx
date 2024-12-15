import axios from "axios";
import api from "@/lib/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuthContext } from "@/Context/AuthContext";

const fetchComments = async (topicId:number) => {
  const response = await api.get(`/api/comments?filters[topic][id]=${topicId}&populate=user`);

  return response.data;
};

export const useFetchComments = (topicId:number) => {
  return useQuery({
    queryKey: ["comments", topicId],
    queryFn: () => fetchComments(topicId),
    meta: {
      errorMessage: "Failed to fetch comments",
    },
  });
};
const fetchCommentReplies = async (commentId: number | null) => {
  const response = await api.get(`/api/comment-replies?filters[comment][id]=${commentId}&populate=user,comment`);
  return response.data;
};


export const useFetchCommentReplies = (commentId:number) => {
  return useQuery({
    queryKey: ["comment_replies", commentId],
    queryFn: () => fetchCommentReplies(commentId),
    meta: {
      errorMessage: "Failed to fetch comments replies",
    },
  });
};


export const addComment = async ( topicId:number, userId:number, topicComment:string ) => {
    const response = await api.post("/api/comments", {
      data: {
        topic: topicId,
        user: userId,
        topicComment, 
        dateCreated: new Date().toISOString(),
      },
    });
    return response.data; 
  };

  export const addReply = async (
    commentId: number | null,
    userId: number,
    replyComment: string
  ) => {
    const response = await api.post(`/api/comment-replies`, {
      data: {
        comment: commentId,
        user: userId,
        Reply: replyComment,
        dateCreated: new Date().toISOString(),
      },
    });
    return response.data;
  };
  
  const fetchLikes = async ( userId:number) => {
    const response = await api.get(
      `/api/comment-likes?filters[user][id][$eq]=${userId}&populate=user,comment`
    );
    return response.data;
  };
  export const useFetchLikedComments = (userId: number) => {
    return useQuery({
      queryKey: ["comment_likes", userId],
      queryFn: () => fetchLikes( userId),
      meta: {
        errorMessage: "Failed to fetch comments likes",
      },
    });
  };
  
  export const addLikedComment = async (commentId: number| null , userId: number) => {
    const response = await api.post("/api/comment-likes", {
      data: {
        comment: commentId,
        user: userId,
      },
    });
    return response.data;
  };
  
  export const removeLikedComment = async (commentId: number| null , userId: number) => {
    const response = await api.get(
      `/api/comment-likes?filters[user][id][$eq]=${userId}&filters[comment][id][$eq]=${commentId}`
    );
  
    const likedComment = response.data?.data?.[0]; 
  
    if (!likedComment) {
      throw new Error("Liked comment not found");
    }
  
    const likedCommentId = likedComment.id;
    await api.delete(`/api/comment-likes/${likedCommentId}`);
  };
