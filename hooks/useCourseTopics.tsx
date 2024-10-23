import api from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

const fetchTopicDetails = async (topicId: number) => {

  const response = await api.get(`/api/topics/${topicId}?populate[course][populate]=tutors&populate=video`);


  return response.data;
};

export const useFetchTopicDetails = (topicId: number) => {
  return useQuery({
    queryKey: ["topicDetails", topicId],
    queryFn: () => fetchTopicDetails(topicId),
    meta: {
      errorMessage: "Failed to fetch topic details",
    },
  });
};
