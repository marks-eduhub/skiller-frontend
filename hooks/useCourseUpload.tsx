import api from "@/lib/axios";
import TurndownService from "turndown";

export const courseUpload = async (
  coursename: string,
  expectations: string,
  coursedescription: string,
  requirements: string,
  cardId: number
) => {
  try {
    const turndownService = new TurndownService();

    const markdownExpectations = turndownService.turndown(expectations);
    const markdownDescription = turndownService.turndown(coursedescription);
    const markdownRequirements = turndownService.turndown(requirements);

    const response = await api.post("/api/courses?populate[card]=*", {
      data: {
        coursename,
        expectations: markdownExpectations,
        coursedescription: markdownDescription,
        requirements: markdownRequirements,
        card: cardId,
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
    console.error("No file selected");
    return;
  }

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
    console.error("Error uploading media:", error);
    throw error;
  }
};
