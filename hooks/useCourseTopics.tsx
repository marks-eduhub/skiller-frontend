import api from "@/lib/axios";
import {useQuery } from "@tanstack/react-query";

const normalizeRelationId = (value: string | number) => {
  if (typeof value === "number") {
    return value;
  }

  return /^\d+$/.test(value) ? Number(value) : value;
};

const fetchTopicDetails = async (topicId: string) => {

  const response = await api.get(`/api/topics?filters[documentId][$eq]=${topicId}&populate[course][populate]=tutor&populate[topicVideo]=true`);
  return { data: response.data?.data?.[0], meta: response.data?.meta };
};

export const useFetchTopicDetails = (topicId: string) => {
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

export type TopicLink = { id: string; label: string; url: string };

export const topicUpload = async (
  courseId:string,
  topicname: string,
  topicExpectations: string,
  topicdescription: string,
  resourceIds: string[],
  videoIds: string | null,
  resourceInstructions:string,
  duration : string,
  tutor:number | undefined,
  links: TopicLink[] = []

) => {
  try {
    const response = await api.post("/api/topics?populate=*", {
      data: {
        course: normalizeRelationId(courseId),
        topicname,
        topicExpectations,
        topicdescription,
        topicResources: resourceIds.map((id) => normalizeRelationId(id)),
        ...(videoIds ? { topicVideo: normalizeRelationId(videoIds) } : {}),
        resourceInstructions,
        ...(duration ? { duration } : {}),
        ...(typeof tutor === "number" && Number.isFinite(tutor)
          ? { tutor: normalizeRelationId(tutor) }
          : {}),
        topicLinks: links,
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
  duration: string,
  links: TopicLink[] = []
) => {
  try {
    const response = await api.put(
      `/api/topics/${topicId}`, {

        data: {
          course: normalizeRelationId(courseId),
          topicname,
          topicExpectations,
          topicdescription,
          resourceInstructions,
          ...(duration ? { duration } : {}),
          topicResources: resourceIds.map((id) => normalizeRelationId(id)),
          ...(videoIds ? { topicVideo: normalizeRelationId(videoIds) } : { topicVideo: null }),
          topicLinks: links,
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

    await api.put(`/api/topics/${topicId}`, {
      data: { topicVideo: null },
    });

    try {
      await api.delete(`/api/upload/files/${videoId}`);
    } catch (_error) {
      // Some storage backends may refuse physical deletion even after detaching
      // the relation. The topic should still behave correctly, so do not fail
      // the whole action here.
    }

    return { message: "Video deleted successfully" };
  } catch (error) {
    throw new Error("Failed to delete the video. Please try again.");
  }
};

export const deleteTopicResource = async (topicId: string, resourceId: string) => {
  try {
    const response = await api.get(`/api/topics/${topicId}?populate=topicResources`);
    const topicData = response.data?.data;
    const rawResources = topicData?.attributes?.topicResources?.data;
    if (!topicData || !Array.isArray(rawResources)) {
      throw new Error("No resources found for this topic");
    }

    const updatedResourceIds = rawResources
      .filter((resource: { id: number | string }) => String(resource.id) !== String(resourceId))
      .map((resource: { id: number | string }) => resource.id);

    await api.put(`/api/topics/${topicId}`, {
      data: { topicResources: updatedResourceIds },
    });

    try {
      await api.delete(`/api/upload/files/${resourceId}`);
    } catch (_error) {
      // Some storage backends may refuse physical deletion even after detaching
      // the relation. The topic should still behave correctly, so do not fail
      // the whole action here.
    }

    return { message: "Resource deleted successfully", updatedResourceIds };
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



