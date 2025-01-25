import courses from "@/app/tutor/dashboard/courseoverview/[slug]/page";
import api from "@/lib/axios";
import { Course } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";

export const useFetchOverview = (id: number) => {
  return useQuery<{ data: any; course: Course }, Error>({
    queryFn: async () => {
      if (!id) {
        throw new Error("Course ID is required");
      }
      const response = await api.get(`/api/courses/${id}?populate=*`);
      return response.data;
    },
    queryKey: ["courseoverview", id],
    enabled: !!id,
    meta: {
      errorMessage: "Course Details not found",
    },
  });
};

const fetchReviews = async (id: number) => {
  const response = await api.get(
    `/api/courses/${id}?populate[reviews][populate]=profilepicture`
  );
  return response.data;
};

export const useFetchReviews = (id: number) => {
  return useQuery({
    queryKey: ["coursereviews", id],
    queryFn: () => fetchReviews(id),
    enabled: !!id,
    meta: {
      errorMessage: "Failed to fetch reviews",
    },
  });
};
