import api from "@/lib/axios";

import { useQuery } from "@tanstack/react-query";

const fetchCommunitydetails = async () => {
  const response = await api.get(
    "/api/communities?populate[user][populate]=*&populate[community_responses]=true&sort=createdAt:desc"
  );

  return response.data;
};

export const useFetchCommunityDetails = () => {
  return useQuery<{ data: any }, Error>({
    queryFn: fetchCommunitydetails,
    queryKey: ["communityDetails"],
    meta: {
      errorMessage: "Failed to fetch community details",
    },
  });
};

const fetchLikeCounts = async () => {
  const response = await api.get("/api/response-likes?populate=*");
  return response.data;
};

export const useFetchLikeCount = () => {
  return useQuery<{ data: any }, Error>({
    queryFn: fetchLikeCounts,
    queryKey: ["likeCount"],
    meta: {
      errorMessage: "Failed to fetch total like count",
    },
  });
};

const fetchQuestionWithResponses = async (questionId: number) => {
  const response = await api.get(
  `/api/community-responses?populate[user][populate]=*&populate[community]=true&sort[0]=createdAt:desc`
  
  );
  return response.data;
};

export const useFetchQuestionResponses = (questionId: number) => {
  return useQuery<{ data: any }, Error>({
    queryFn: () => fetchQuestionWithResponses(questionId),
    queryKey: ["question_responses", questionId],
    meta: {
      errorMessage: "Failed to fetch question responses",
    },
  });
};

export const postQuestion = async (
  Question: string,
  userId: string
) => {
  try {
   
    const response = await api.post("/api/communities", {
      data: {
        Question,
        user: userId,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addResponse = async (
  responseText: string,
  responderName: string,
  questionId: number,
  userId:number
) => {
  try {
    const response = await api.post("/api/community-responses", {
      data: {
        responseText,
        responderName,
        community: questionId,
        user:userId
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

const fetchSearchCommunity = async (searchTerm: string) => {
  const response = await api.get(`/api/communities?_q=${searchTerm}&populate[user][populate]=*&populate[community_responses]=true`);

  return response.data;
};

export const useFetchSearchCommuity = (searchTerm: string) => {
  return useQuery<{ data: any }, Error>({
    queryKey: ["searchcommunity", searchTerm],
    queryFn: () => fetchSearchCommunity(searchTerm),
    enabled: Boolean(searchTerm),
    meta: {
      errorMessage: "Failed to fetch community data",
    },
  });
};

const fetchLikedResponses = async (userId: number) => {
  const response = await api.get(
    `/api/response-likes?filters[user][id][$eq]=${userId}&populate=community_response`
  );

  const likedResponses = response.data?.data?.map(
    (item: any) => item?.attributes?.community_response?.data?.id
  );

  return likedResponses || [];
};

export const useLikedResponses = (userId: number) => {
  return useQuery<number[], Error>({
    queryFn: () => fetchLikedResponses(userId),
    queryKey: ["likedResponses", userId],
    meta: {
      errorMessage: "Failed to fetch liked responses.",
    },
  });
};

export const addLiked = async (responseId: number, userId: number) => {
  try {
    const response = await api.post("/api/response-likes", {
      data: {
        community_response: responseId,
        user: userId,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to add like.");
  }
};

export const removeLiked = async (responseId: number, userId: number) => {
  try {
    const response = await api.get(
      `/api/response-likes?filters[user][id][$eq]=${userId}&filters[community_response][id][$eq]=${responseId}`
    );

    const likedEntry = response.data?.data?.[0];

    if (!likedEntry) {
      throw new Error("Liked response not found");
    }

    const likedId = likedEntry.id;
    await api.delete(`/api/response-likes/${likedId}`);
  } catch (error) {
    throw new Error("Failed to remove like.");
  }
};
