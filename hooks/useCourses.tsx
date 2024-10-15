import { useQuery } from "@tanstack/react-query";
import api from "../lib/axios";
import { Category, Course } from "@/lib/types";

const fetchCourses = async () => {
  const response = await api.get("/api/courses?populate=*");

  return response.data;
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
