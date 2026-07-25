import api from "@/lib/axios";
import { useAuthContext } from "@/components/AuthProvider/AuthContext";
import { Course } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";

const fetchLikedCourses = async (userId: number) => {
  const response = await api.get(
    `/api/liked-courses?filters[user][id][$eq]=${userId}&populate[course][populate][0]=card&populate[course][populate][1]=tutor`
  );
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
      errorMessage: "Failed to fetch liked courses",
    },
    enabled: !!userId,
  });
};

// courseId is the course documentId: course is a draft-and-publish type, so its
// numeric id is replaced whenever a tutor edits the course.
export const addLikedCourse = async (courseId: string, userId: number) => {
  const response = await api.post("/api/liked-courses", {
    data: {
      course: courseId,
      user: userId,
      dateCreated: new Date(),
    },
  });
  return response.data;
};

export const removeLikedCourse = async (courseId: string, userId: number) => {
  const response = await api.get(
    `/api/liked-courses?filters[user][id][$eq]=${userId}&filters[course][documentId][$eq]=${courseId}`
  );

  const likedCourseEntry = response.data?.data?.[0];

  if (!likedCourseEntry) {
    throw new Error("Liked course not found");
  }

  const likedCourseId = likedCourseEntry.attributes.documentId;
  await api.delete(`/api/liked-courses/${likedCourseId}`);
};
