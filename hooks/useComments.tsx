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