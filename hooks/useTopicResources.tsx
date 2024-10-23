import api from "@/lib/axios"
import { useQuery } from "@tanstack/react-query"

const fetchTopicResources = async (topicId: number) => {
    const response = await api.get(`/api/topics/${topicId}?populate[course][populate]=tutors&populate=resources`)
return response.data
}

export const useFetchTopicResources = (topicId: number) => {
    return useQuery({
        queryKey: ["topicResources", topicId],
        queryFn: () => fetchTopicResources(topicId),
        meta: {
          errorMessage: "Failed to fetch topic resources",
        },
      });
}