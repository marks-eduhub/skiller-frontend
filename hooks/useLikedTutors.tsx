import api from "@/lib/axios";
import { useAuthContext } from "@/components/AuthProvider/AuthContext";
import { useQuery } from "@tanstack/react-query";

const fetchLikedTutors = async (userId: number) => {
  const response = await api.get(
    `/api/liked-tutors?filters[user][id][$eq]=${userId}&populate[tutor][populate][0]=user`
  );
  return response.data;
};

export const useLikedTutors = () => {
  const { user } = useAuthContext();
  const userId = user?.id;
  return useQuery<{ data: any[] }, Error>({
    queryFn: () => {
      if (!userId) {
        throw new Error("User not logged in");
      }
      return fetchLikedTutors(userId);
    },
    queryKey: ["likedTutors", userId],
    meta: {
      errorMessage: "Failed to fetch liked tutors",
    },
    enabled: !!userId,
  });
};

export const addLikedTutor = async (tutorId: number, userId: number) => {
  const response = await api.post("/api/liked-tutors", {
    data: {
      tutor: tutorId,
      user: userId,
      dateCreated: new Date(),
    },
  });
  return response.data;
};

export const removeLikedTutor = async (tutorId: number, userId: number) => {
  const response = await api.get(
    `/api/liked-tutors?filters[user][id][$eq]=${userId}&filters[tutor][id][$eq]=${tutorId}`
  );

  const likedTutorEntry = response.data?.data?.[0];

  if (!likedTutorEntry) {
    throw new Error("Liked tutor not found");
  }

  const likedTutorId = likedTutorEntry.attributes.documentId;
  await api.delete(`/api/liked-tutors/${likedTutorId}`);
};
