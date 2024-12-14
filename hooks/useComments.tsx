import axios from "axios";
import api from "@/lib/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

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
  console.log("Fetched replies response:", response.data);
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
    commentId: number,
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
  
  export const addLikedReply = async (commentId: number, userId: number) => {
    const response = await api.post("/api/comments", {
      data: {
        comment: commentId,
        user: userId,
      },
    });
    return response.data;
  };
  
  export const removeLikedCourse = async (courseId: number, userId: number) => {
    const response = await api.get(
      `/api/liked-courses?filters[user][id][$eq]=${userId}&filters[course][id][$eq]=${courseId}`
    );
  
    const likedCourseEntry = response.data?.data?.[0]; 
  
    if (!likedCourseEntry) {
      throw new Error("Liked course not found");
    }
  
    const likedCourseId = likedCourseEntry.id;
    await api.delete(`/api/liked-courses/${likedCourseId}`);
  };
  