import { useQuery } from "@tanstack/react-query";
import api from "../lib/axios";
import { Category, Course } from "@/lib/types";

const fetchCourses = async () => {
  const response = await api.get("/api/courses?populate=*");

  return response.data;
};

const fetchCategories = async () => {
  const response = await api.get("/api/categories?populate=*");
  return response.data;
};

export const useFetchCategories = () => {
  return useQuery<{ data: string[] }, Error>({
    queryFn: fetchCategories,
    queryKey: ["categories"],
    meta: {
      errorMessage: "Failed to fetch categories",
    },
  });
};

export const useFetchCourses = () => {
  return useQuery<{ data: Course[] }, Error>({
    queryFn: fetchCourses,
    queryKey: ["courses"],
    meta: {
      errorMessage: "Failed to fetch courses",
    },
  });
};

const fetchCoursesByCategory = async () => {
  const res = await api.get("/api/courses?populate=tutor,card,categories");

  return res.data;
};

export const useCoursesByCategory =  () => {
  return useQuery<{ data: Category[] }, Error>({
    queryFn: () => fetchCoursesByCategory(),
    queryKey: ["categories"],
    meta: {
      errorMessage: "Failed to fetch courses",
    },
  });
};
