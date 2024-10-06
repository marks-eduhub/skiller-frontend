import api from "@/lib/axios";
import { useAuthContext } from "@/Context/AuthContext";
import { Course } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";


const fetchLikedCourses = async (userId: number) => {
  const response = await api.get(`/api/liked-courses?filters[user][id][$eq]=${userId}&populate=*`);
  return response.data;
};

export const useLikedCourses = () => {
  const { user } = useAuthContext();
  const userId = user?.id;
  return useQuery<{ data: Course[] }, Error>({
    queryFn: () => {
      if (!userId) {
        throw new Error("User not logged in");
      }
      return fetchLikedCourses(userId);
    },
    queryKey: ["likedCourses", userId],
    meta: {
      errorMessage: "Failed to fetch courses",
    },
    enabled: !!userId,
  });
};

export const addLikedCourse = async (courseId: number, userId: number) => {
  const response = await api.post("/api/liked-courses", {
    data: {
      course: courseId,
      user: userId,
      dateCreated: new Date(),
    },
  });
  return response.data;
};

export const removeLikedCourse = async (courseId: number, userId: number) => {
  const response = await api.get(
    `/api/liked-courses?filters[user][id][$eq]=${userId}&filters[course][id][$eq]=${courseId}`
  );

  const likedCourseEntry = response.data?.data?.[0]; // The first matched liked-course entry

  if (!likedCourseEntry) {
    throw new Error("Liked course entry not found");
  }

  // Now delete the liked-course entry by its ID
  const likedCourseId = likedCourseEntry.id;
  await api.delete(`/api/liked-courses/${likedCourseId}`);
};
