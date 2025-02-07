import api from "@/lib/axios";
import { useAuthContext } from "@/Context/AuthContext";
import { useQuery } from "@tanstack/react-query";

const fetchRecentCourses = async (userId: number) => {
  const response = await api.get(
    `/api/recent-courses?filters[user][id][$eq]=${userId}&sort=dateAccessed:desc&populate[course][populate]=card,tutor`
  );

  return response.data;
};
export const useRecentCourses = () => {
  const { user } = useAuthContext();
  const userId = user?.id;

  return useQuery({
    queryFn: () => {
      if (!userId) {
        throw new Error("User not logged in");
      }
      return fetchRecentCourses(userId);
    },
    queryKey: ["recentCourses", userId],
    enabled: !!userId,
    meta: {
      errorMessage: "Failed to fetch recent courses",
    },
  });
};

export const addRecentCourse = async (courseId: number, userId: number) => {
  try {
    const response = await api.post("/api/recent-courses", {
      data: {
        course: courseId,
        user: userId,
        dateAccessed: new Date().toISOString(),
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
