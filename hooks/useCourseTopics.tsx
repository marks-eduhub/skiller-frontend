import api from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import TurndownService from "turndown";

const fetchTopicDetails = async (topicId: number) => {

  const response = await api.get(`/api/topics/${topicId}?populate[course][populate]=tutors&populate=topicVideo`);
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

export const topicUpload = async (
  courseId:number,
  topicname: string,
  topicExpectations: string,
  topicdescription: string,
  topicResourcesId: number[] | File[],
  topicVideoId: number | null,
  instructions:string,
  duration : string
) => {
  try {
    const turndownService = new TurndownService();
    const markdownInstructions = turndownService.turndown(instructions);
    const markdownExpectations = turndownService.turndown(topicExpectations);
    const markdownDescription = turndownService.turndown(topicdescription);

    const response = await api.post("/api/topics?populate=*", {
      data: {
        course:courseId,
        topicname,
        topicExpectations: markdownExpectations,
        topicdescription: markdownDescription,
        topicResources: topicResourcesId,
        topicVideo: topicVideoId, 
        resourceInstructions: markdownInstructions,
        duration

      },
    });
    return response.data;
  } catch (error) {
    throw new Error(
      "There was an error uploading the topic. Please try again."
    );
  }
};

const fetchAllResults = async (userId: number) => {
  const response = await api.get(
    `/api/test-results?filters[user][id][$eq]=${userId}&populate=user_question_results,topic,test,user`
  );
  return response.data;
};

export const useFetchAllResults = (userId: number) => {
  return useQuery({
    queryKey: ["testresults_all", userId], 
    queryFn: () => fetchAllResults(userId),

    meta: {
      errorMessage: "Failed to fetch test results",
    },
    enabled: !!userId,
  });
};
