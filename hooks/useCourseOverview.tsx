import api from "@/lib/axios";
import { Course } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";

export const useFetchOverview = (id: string) => {
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

const fetchReviews = async (courseId: string) => {
  const response = await api.get(
    `/api/courseratings?filters[course][documentId][$eq]=${courseId}&populate[user][populate]=*`);
  return response.data;
};

export const useFetchReviews = (courseId: string) => {
  return useQuery({
    queryKey: ["coursereviews", courseId],
    queryFn: () => fetchReviews(courseId),
    enabled: !!courseId,
    meta: {
      errorMessage: "Failed to fetch reviews",
    },
  });
};

export const updateReview = async (
  userId: number,
  courseId: string,
  comment: string,
  rating: number
) => {
  try {
    const reviewExists = await api.get(
      `/api/courseratings?filters[course][documentId][$eq]=${courseId}&filters[user][id][$eq]=${userId}`
    );

    if (reviewExists.data.data.length > 0) {
      const review = reviewExists.data.data[0];

      const response = await api.put(`/api/courseratings/${review.attributes.documentId}`, {
        data: {
          review: comment,
          score: rating,
        },
      });

      return response.data;
    } else {
      throw new Error("Review not found. You must leave a review before updating.");
    }
  } catch (error) {
    throw new Error( "Failed to update review");
  }
};



export const postReview = async (
  userId: number,
  courseId: string,
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

