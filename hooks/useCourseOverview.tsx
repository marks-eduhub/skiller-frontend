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

const fetchReviews = async (courseId: number) => {
  const response = await api.get(
    `/api/courseratings?filters[course][id][$eq]=${courseId}&populate[user][populate]=*`);
  return response.data;
};

export const useFetchReviews = (courseId: number) => {
  return useQuery({
    queryKey: ["coursereviews", courseId],
    queryFn: () => fetchReviews(courseId),
    enabled: !!courseId,
    meta: {
      errorMessage: "Failed to fetch reviews",
    },
  });
};

export const postReview = async (
  userId: number,
  courseId: number,
  comment: string,
  rating: number
) => {
  const response = await api.post(`/api/courseratings`, {
    data: {
      user: userId,
      course: courseId,
      review: comment,
      score:rating,
    },
  });
  return response.data;
};

