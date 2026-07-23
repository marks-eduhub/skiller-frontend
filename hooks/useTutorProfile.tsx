import api from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

const fetchTutorProfile = async (tutorId: string) => {
  const response = await api.get(
    `/api/tutors/${tutorId}?populate[user][populate][0]=profilepicture&populate[courses][populate][0]=card`
  );
  return response.data;
};

export const useFetchTutorProfile = (tutorId: string) => {
  return useQuery<{ data: any }, Error>({
    queryFn: () => fetchTutorProfile(tutorId),
    queryKey: ["tutorProfile", tutorId],
    enabled: !!tutorId,
    meta: {
      errorMessage: "Failed to load tutor profile",
    },
  });
};
