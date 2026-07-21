import api from "@/lib/axios"
import { useQuery } from "@tanstack/react-query"

const fetchTopicResources = async (topicId: number) => {
    const response = await api.get(`/api/topics?filters[id][$eq]=${topicId}&populate[course][populate]=tutor&populate[topicResources]=true`)
    return { data: response.data?.data?.[0], meta: response.data?.meta }
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