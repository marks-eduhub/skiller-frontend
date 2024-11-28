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
  topicResourcesId: number[],
  topicVideoId: number | null,
  instructions:string
) => {
  try {
    console.log("Uploading Topic with the following data:");
    console.log({
      courseId,
      topicname,
      topicExpectations,
      topicdescription,
      topicResourcesId,
      topicVideoId,
      instructions,
    });
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
        resourceInstructions: markdownInstructions

      },
    });
console.log("res", response)
    return response.data;
  } catch (error) {
    console.error("Error uploading topic:", error);
    throw new Error(
      "There was an error uploading the topic. Please check the relations and try again."
    );
  }
};
