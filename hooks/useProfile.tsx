import api from "@/lib/axios";
import { ProfilePicture } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";

export const addTutor = async (
  userId: number,
  tutorname: string,
  role: string,
  lastName: string,
  firstName: string,
  Biography: string,
  Qualifications: string
) => {
  
  try {
    const response = await api.post("/api/tutors", {
      data: {
        user: userId,
        tutorname,
        role,
        Biography,
        Qualifications,
      },
    });
    return response.data; 
  } catch (error) {
    throw error;
  }
};

export const updateStudent = async (
  studentname: string,
  profilepicture: number | null,
  lastName: string,
  firstName: string,
  userId: number | null,
  socialLinks: {
    email: string;
    facebook: string;
    twitter: string;
    linkedin: string;
  }
) => {
  try {
    if (!userId) {
      throw new Error("Try again later.");
    }

    const response = await api.put(`/api/users/${userId}`, {
      studentname,
      profilepicture,
      lastName,
      firstName,
      socialLinks,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};



const fetchUserDetails = async (userId: number) => {
  const response = await api.get(`/api/users/${userId}?populate=*`);
  return response.data;
};

export const useFetchUserDetails = (userId: number) => {
  return useQuery<
    {
      firstName: string;
      lastName: string;
      socialLinks: any;
      profilepicture: ProfilePicture | null;     
    },
    Error
  >({
    queryFn: () => fetchUserDetails(userId),
    queryKey: ["user_details", userId],
    meta: {
      errorMessage: "Failed to fetch user details",
    },
  });
};

const fetchTutorDetails = async (userId: number) => {
  const response = await api.get(
    `/api/tutors?filters[user][id]=${userId}&populate[user][populate][0]=profilepicture&populate[user][populate][1]=socialLinks`
  );

  return response.data;
};

export const useFetchTutorDetails = (userId: number) => {
  return useQuery<
    {
      Qualifications: string;
      role: string;
      Biography: string;
      data: any;
    },
    Error
  >({
    queryFn: () => fetchTutorDetails(userId),
    queryKey: ["tutor_details"],
    meta: {
      errorMessage: "Failed to fetch tutor details",
    },
  });
};

export const updateTutor = async (
  tutorId: string,
  tutorname: string,
  role: string,
  lastName: string,
  firstName: string,
  Biography: string,
  Qualifications: string
) => {

  try {
    const response = await api.put(`/api/tutors/${tutorId}`, {
      data: {
        tutorname,
        role,
        Biography,
        Qualifications,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

const fetchTutorId = async (userId: number) => {
  const response = await api.get(`/api/tutors?filters[user][id]=${userId}`);

  return response.data;
};

export const useFetchTutorId = (userId: number) => {
  return useQuery<{ data: any }, Error>({
    queryFn: () => fetchTutorId(userId),

    queryKey: ["profile_tutorId,", userId],
    meta: {
      errorMessage: "Failed to fetch tutor information",
    },
  });
};

export const deleteProfilePicture = async (
  userId: number,
  profilepictureId: string
) => {
  try {
    if (!profilepictureId) {
      throw new Error("No profile picture found to delete.");
    }

    await api.put(`/api/users/${userId}`, {
      profilepicture: null,
    });

    try {
      await api.delete(`/api/upload/files/${profilepictureId}`);
    } catch (_error) {
      // Some storage backends may refuse physical deletion even after detaching
      // the relation. The profile should still behave correctly, so do not fail
      // the whole action here.
    }

    return { message: "Profile picture deleted successfully." };
  } catch (error) {
    throw new Error("Failed to delete the image. Please try again.");
  }
};
