import api from "@/lib/axios";
import TurndownService from "turndown";


export const addTutor = async (
  tutorname: string,
  profilepicture: string,
  role: string,
  lastName: string,
  firstName: string,
  Biography:string,
  Qualifications:string,
  socialLinks: { email: string; facebook: string; twitter: string; linkedin: string }
) => {
  const turndownService = new TurndownService();
  const markdownBio = turndownService.turndown(Biography);
  try {
    const response = await api.post("/api/tutors", {
      
      data: {
        tutorname,
        profilepicture,
        role,
        lastName,
        firstName,
        Biography: markdownBio,
        Qualifications,
        socialLinks,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

  
// export const addStudent = async (
//   studentname: string,
//   profilepicture: string,
//   lastName: string,
//   firstName: string,
//   userId:number,
//   socialLinks: { email: string; facebook: string; twitter: string; linkedin: string }
// ) => {
//   try {
//     const response = await api.put(`/api/users/${userId}`, {
//       data: {
//         studentname,
//         profilepicture,
//         lastName,
//         firstName,
//         socialLinks,
//       },
//     });
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };
export const addStudent = async (
  studentname: string,
  profilepicture: string,
  lastName: string,
  firstName: string,
  userId: number | null, 
  socialLinks: { email: string; facebook: string; twitter: string; linkedin: string }
) => {
  try {
    if (!userId) {
      throw new Error("Try again later.");
    }

    const response = await api.put(`/api/users/${userId}`, {
      data: {
        studentname,
        profilepicture,
        lastName,
        firstName,
        socialLinks,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error in addStudent:", error);
    throw error;
  }
};
