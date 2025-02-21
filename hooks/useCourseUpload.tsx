import api from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { message } from "antd";
import TurndownService from "turndown";

export const courseUpload = async (
  coursename: string,
  expectations: string,
  coursedescription: string,
  requirements: string,
  cardId: number,
  categories:string,

  tutor: number | undefined,
  duration: string
) => {
  try {
    const turndownService = new TurndownService();

    const markdownExpectations = turndownService.turndown(expectations);
    const markdownDescription = turndownService.turndown(coursedescription);
    const markdownRequirements = turndownService.turndown(requirements);

    const formattedDuration = duration.includes(":") ? `${duration}:00` : duration;

    const response = await api.post("/api/courses?populate[card][populate][categories]=*", {
      data: {
        coursename,
        expectations: markdownExpectations,
        coursedescription: markdownDescription,
        requirements: markdownRequirements,
        card: cardId,
        categories,
        tutor,
        duration: formattedDuration,
      },
    });

    return response.data;
  } catch (error) {
    throw new Error(
      "There was an error uploading the course. Please try again."
    );
  }
};

export const courseEditing = async (
  courseId:number,
  coursename: string,
  expectations: string,
  coursedescription: string,
  requirements: string,
  cardId: number,
  categories:string,

  duration: string
) => {
  try {
    const turndownService = new TurndownService();

    const markdownExpectations = turndownService.turndown(expectations);
    const markdownDescription = turndownService.turndown(coursedescription);
    const markdownRequirements = turndownService.turndown(requirements);

    const formattedDuration = duration.includes(":") ? `${duration}:00` : duration;

    const response = await api.put(`/api/courses/${courseId}?populate=*`, {
      data: {
        coursename,
        expectations: markdownExpectations,
        coursedescription: markdownDescription,
        requirements: markdownRequirements,
        card: cardId,
        categories,
        duration: formattedDuration, 
      },
    });

    return response.data;
  } catch (error) {
    throw new Error(
      "There was an error editing the course. Please try again."
    );
  }
};

export const uploadMedia = async (file: File | null) => {
  if (!file) {
    message.error("No file selected");
    return;
  }

  const formData = new FormData();
  formData.append("files", file);

  try {
    const response = await api.post("/api/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data[0].id;
  } catch (error) {
    message.error("Error uploading media:");
    throw error;
  }
};

const fetchCategory = async () => {

  const response = await api.get (`/api/categories?populate=*`);

  return response.data;
};

export const useFetchCategory = () => {
  return useQuery({
    queryKey: ["course_category"],
    queryFn: () => fetchCategory(),
    meta: {
      errorMessage: "Failed to fetch category",
    },
  });
};