import api from "@/lib/axios";
import { useAuthContext } from "@/components/AuthProvider/AuthContext";
import { useQuery } from "@tanstack/react-query";

const fetchRecentCourses = async (userId: number) => {
  const response = await api.get(
    `/api/recent-courses?filters[user][id][$eq]=${userId}&sort=dateLastAccessed:desc&populate[course][populate][0]=card&populate[course][populate][1]=tutor`
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
    const existingEntry = await api.get(
      `/api/recent-courses?filters[user][id][$eq]=${userId}&filters[course][id][$eq]=${courseId}&sort=dateLastAccessed:desc&populate[course][populate][0]=card&populate[course][populate][1]=tutor`
    );

    if (existingEntry.data.data.length > 0) {
      const recentCourse = existingEntry.data.data[0];
      const updatedCount = (recentCourse.attributes.timesAccessed || 0) + 1;

      const response = await api.put(`/api/recent-courses/${recentCourse.attributes.documentId}`, {
        data: {
          timesAccessed: updatedCount,
          dateLastAccessed: new Date().toISOString(),
        },
      });

      return response.data;
    } else {
      const response = await api.post("/api/recent-courses", {
        data: {
          course: courseId,
          user: userId,
          dateFirstAccessed: new Date().toISOString(),
          dateLastAccessed: new Date().toISOString(),
          timesAccessed: 1,
        },
      });

      return response.data;
    }
  } catch (error) {
    throw error;
  }
};
