import api from "@/lib/axios";
import {useQuery } from "@tanstack/react-query";
const fetchTopicDetails = async (topicId: number) => {

  const response = await api.get(`/api/topics?filters[id][$eq]=${topicId}&populate[course][populate]=tutor&populate[topicVideo]=true`);
  return { data: response.data?.data?.[0], meta: response.data?.meta };
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

const fetchTopics = async () => {

  const response = await api.get(`/api/topics?populate[course][populate]=tutor&populate[topicVideo]=true`);
  return response.data;
};

export const useFetchTopics = () => {
  return useQuery({
    queryKey: ["course_topics"],
    queryFn: () => fetchTopics(),
    meta: {
      errorMessage: "Failed to fetch course-topic details",
    },
  });
};

export const topicUpload = async (
  courseId:string,
  topicname: string,
  topicExpectations: string,
  topicdescription: string,
  resourceIds: string[],
  videoIds: string | null,
  resourceInstructions:string,
  duration : string,
  tutor:number | undefined

) => {
  try {
  
   
    const response = await api.post("/api/topics?populate=*", {
      data: {
        course:courseId,
        topicname,
        topicExpectations,
        topicdescription,
        topicResources: resourceIds,
        topicVideo: videoIds, 
        resourceInstructions,
        duration,
        tutor

      },
    });
    return response.data;
  } catch (error) {
    throw new Error(
      "There was an error uploading the topic. Please try again."
    );
  }
};


export const topicEditing = async (
  topicId: string,
  courseId: string,
  topicname: string,
  topicExpectations: string,
  topicdescription: string,
  resourceIds: string[],
  videoIds: string | null, 
  resourceInstructions: string,
  duration: string
) => {
  try {
    const response = await api.put(
      `/api/topics/${topicId}`, {
    
        data: {
          course: courseId,
          topicname,
          topicExpectations,
          topicdescription,
          resourceInstructions,
          duration,
          topicResources: resourceIds,
          topicVideo: videoIds 
        },
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};



export const topicDelete = async (topicId: string) => {
  try {
    const response = await api.delete(`/api/topics/${topicId}`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to delete the topic. Please try again.");
  }
};


export const deleteTopicVideo = async (topicId: string, videoId: string) => {
  try {
    const response = await api.get(`/api/topics/${topicId}?populate=topicVideo`);
    const topicData = response.data?.data;

    if (!topicData || !topicData.attributes?.topicVideo) {
      throw new Error("No video found for this topic");
    }

    await api.delete(`/api/upload/files/${videoId}`);

    await api.put(`/api/topics/${topicId}`, {
      data: { topicVideo: null },
    });

    return { message: "Video deleted successfully" };
  } catch (error) {
    throw new Error("Failed to delete the video. Please try again.");
  }
};

export const deleteTopicResource = async (topicId: string, resourceId: string) => {
  try {
    const response = await api.get(`/api/topics/${topicId}?populate=topicResources`);
    const topicData = response.data?.data;
    if (!topicData || !topicData.attributes?.topicResources) {
      throw new Error("No resources found for this topic");
    }
    const topicResources = Array.isArray(topicData.attributes.topicResources)
      ? topicData.attributes.topicResources
      : [];


    await api.delete(`/api/upload/files/${resourceId}`);

    const updatedResources = topicResources.filter(
      (resource: { id: string }) => resource.id !== resourceId
    );

    await api.put(`/api/topics/${topicId}`, {
      data: { topicResources: updatedResources },
    });

    return { message: "Resource deleted successfully", updatedResources };
  } catch (error) {
    throw new Error("Failed to delete the resource. Please try again.");
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



export const markTopicCompleted = async (
  isCompleted: boolean,
  topicId: string
) => {
  const response = await api.put(`/api/topics/${topicId}`, {
    data: {
     isCompleted,
     topicId
    },
  });
  return response.data;
};

