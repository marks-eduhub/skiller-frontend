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

    const response = await api.post("/api/courses?populate[card][populate][categories]=*", {
      data: {
        coursename,
        expectations: markdownExpectations,
        coursedescription: markdownDescription,
        requirements: markdownRequirements,
        card: cardId,
        categories,
        tutor,
        duration
      },
    });

    return response.data;
  } catch (error) {
    throw new Error(
      "There was an error uploading the course. Please try again."
    );
  }
};

export const uploadMedia = async (file: File | null) => {
  if (!file) {
    message.error("No file selected");
    return;
  }

  // const maxSize = 1 * 1024 * 1024; 
  // if (file.size > maxSize) {
  //   message.error("File size exceeds 1MB.");
  //   return;
  // }
  const formData = new FormData();
  formData.append("files", file);


  //   const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  // console.log("token", token);
  //   if (!token) {
  //     console.error("No token found.");
  //     throw new Error("Unauthorized: Token not found.");
  //   }

  try {
    const response = await api.post("/api/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        // Authorization: `Bearer ${token}`,
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