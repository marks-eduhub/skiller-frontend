import { useAuthContext } from "@/Context/AuthContext";
import api from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

const fetchCommunitydetails = async () => {
  const response = await api.get("/api/communities?populate=*");
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

const fetchQuestionWithResponses = async (questionId: number) => {
  const response = await api.get(
    `/api/community-responses?populate=community,responderpicture&sort[0]=createdAt:desc`
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
  nameofquestioner: string
) => {
  try {
    const response = await api.post("/api/communities", {
      data: {
        Question,
        nameofquestioner,
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
  questionId: number
) => {
  const response = await api.post(`/api/community-responses`, {
    data: {
      responseText,
      responderName,
      community: questionId,
    },
  });
  return response.data;
};

const fetchSearchCommunity = async (searchTerm: string) => {
  const response = await api.get(`/api/communities?_q=${searchTerm}`);

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

const fetchLikedResponses = async () => {
  const response = await api.get(
    `/api/response-likes?&populate[community_response][populate]=*`
  );
  return response.data;
};
export const useLikedResponses = () => {
  return useQuery<{ data: any }, Error>({
    queryFn: fetchLikedResponses,
    queryKey: ["likedResponses"],
    meta: {
      errorMessage: "Failed to fetch likes",
    },
  });
};
export const likeResponse = async (
  responseId: number | null,
  userId: number
) => {
  try {
    const response = await api.post("/api/response-likes", {
      data: {
        community_response: responseId,
        user: userId,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const removeLikedResponse = async (
  responseId: number | null,
  userId: number
) => {
  const response = await api.get(
    `/api/response-likes?filters[user][id][$eq]=${userId}&filters[community_response][id][$eq]=${responseId}`
  );

  const likedResponse = response.data?.data?.[0];

  if (!likedResponse) {
    throw new Error("Liked course not found");
  }

  const likedResponseId = likedResponse.id;
  await api.delete(`/api/response-likes/${likedResponseId}`);
};

export const commentOnResponse = async (
  responseId: number,
  commentText: string,
  commenterName: string
) => {
  try {
    const response = await api.post("/api/response-comments", {
      data: {
        community_response: responseId,
        commentText,
        commenterName,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
