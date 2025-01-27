import api from "@/lib/axios";
import { UserDetails } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import TurndownService from "turndown";


export const addTutor = async (
  tutorname: string,
  profilepicture: string,
  role: string,
  lastName: string,
  firstName: string,
  Biography: string,
  Qualifications: string,
  socialLinks: {
    email: string;
    facebook: string;
    twitter: string;
    linkedin: string;
  }
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

export const addStudent = async (
  studentname: string,
  profilepicture: string,
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


export const linkTutorToUser = async (userId: number, tutorId: number) => {
  try {
    if (!userId || !tutorId) {
      throw new Error("Both User ID and Tutor ID are required.");
    }

    const response = await api.put(`/api/users/${userId}`, {
      tutor: tutorId, 
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
      profilepicture: null;
      data: UserDetails;
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
    `/api/tutors?filters[user][id]=${userId}&populate=user, profilepicture,socialLinks`
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
  tutorId: number, 
  tutorname: string,
  profilepicture: string,
  role: string,
  lastName: string,
  firstName: string,
  Biography: string,
  Qualifications: string,
  socialLinks: {
    email: string;
    facebook: string;
    twitter: string;
    linkedin: string;
  }
) => {
  const turndownService = new TurndownService();
  const markdownBio = turndownService.turndown(Biography);
  try {
    const response = await api.put(`/api/tutors/${tutorId}`, {
      data: {
        tutorId,
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



const fetchTutorId = async (userId:number) => {
  const response = await api.get(`/api/tutors?filters[user][id]=${userId}`);

  return response.data;
};

export const useFetchTutorId = (userId:number) => {
  return useQuery<{ data:any}, Error>({
    queryFn: () => fetchTutorId(userId),

    queryKey: ["profile_tutorId,", userId],
    meta: {
      errorMessage: "Failed to fetch tutor information",
    },
  });
};

