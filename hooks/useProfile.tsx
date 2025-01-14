import api from "@/lib/axios";

export const addTutor = async (
  tutorname: string,
  profilepicture: string,
  role: string,
  lastName: string,
  firstName: string,
  socialLinks: { email: string; facebook: string; twitter: string; linkedin: string }
) => {
  try {
    const response = await api.post("/api/tutors", {
      data: {
        tutorname,
        profilepicture,
        role,
        lastName,
        firstName,
        socialLinks,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

  
export const addStudent = async (
  studentname: string,
  profilepicture: string,
  lastName: string,
  firstName: string,
  socialLinks: { email: string; facebook: string; twitter: string; linkedin: string }
) => {
  try {
    const response = await api.post("/api/profiles", {
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
    throw error;
  }
};
