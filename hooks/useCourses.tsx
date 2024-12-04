import { useQuery } from "@tanstack/react-query";
import api from "../lib/axios";
import { Category, Course, Tutor } from "@/lib/types";

const fetchCourses = async () => {
  const response = await api.get("/api/courses?populate=*");

  return response.data;
};

export const useFetchCourses = () => {
  return useQuery<{ data:any}, Error>({
    queryFn: fetchCourses,
    queryKey: ["courses"],
    meta: {
      errorMessage: "Failed to fetch courses",
    },
  });
};

const fetchTutors = async () => {
  const response = await api.get("/api/tutors?populate=profilepicture");

  return response.data;
};

export const useFetchTutors = () => {
  return useQuery<{ data:Tutor[]}, Error>({
    queryFn: fetchTutors,
    queryKey: ["tutors"],
    meta: {
      errorMessage: "Failed to fetch tutors",
    },
  });
};




const fetchSearchTutors = async (searchTerm: string) => {
  const response = await api.get(`/api/tutors?search=${searchTerm}&populate=profilepicture`);
  return response.data;
};

export const useFetchSearchTutors = (searchTerm: string) => {
  return useQuery<{ data: any }, Error>({
    queryKey: ["searchtutors", searchTerm],
    queryFn: () => fetchSearchTutors(searchTerm),
    enabled: Boolean(searchTerm), 
    meta: {
      errorMessage: "Failed to fetch tutors",
    },
  });
};

const fetchSearchCourses = async (searchTerm: string) => {
  const response = await api.get(`/api/courses?search=${searchTerm}`);
  return response.data;
};

export const useFetchSearchCourses = (searchTerm: string) => {
  return useQuery<{ data: any }, Error>({
    queryKey: ["searchcourses", searchTerm],
    queryFn: () => fetchSearchCourses(searchTerm),
    enabled: Boolean(searchTerm), 
    meta: {
      errorMessage: "Failed to fetch courses",
    },
  });
};


const fetchTutorCourses = async (userId: number) => {
  const response = await api.get(`/api/courses?filters[users][id][$eq]=${userId}&populate=*`);
  return response.data;
};

export const useFetchTutorCourses = (userId: number) => {
  return useQuery<{ data: any }, Error>({
    queryFn: () => fetchTutorCourses(userId), 
    queryKey: ["tutor_courses", userId],
    meta: {
      errorMessage: "Failed to fetch courses",
    },
  });
};
