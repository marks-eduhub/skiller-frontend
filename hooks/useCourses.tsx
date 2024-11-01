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

const fetchSearchTutors = async () => {
  const response = await api.get("/api/tutors?search=${searchTerm}&populate=profilepicture");

  return response.data;
};

export const useFetchSearchTutors = () => {
  return useQuery<{ data: any }, Error>({
    queryFn: fetchSearchTutors,
    queryKey: ["searchtutors"],
    meta: {
      errorMessage: "Failed to fetch tutors",
    },
  });
};

const fetchSearchCourses = async () => {
  const response = await api.get("/api/courses?search=${searchTerm}");

  return response.data;
};

export const useFetchSearchCourses = () => {
  return useQuery<{ data:Course[] }, Error>({
    queryFn: fetchSearchCourses,
    queryKey: ["searchcourses"],
    meta: {
      errorMessage: "Failed to fetch courses",
    },
  });
};