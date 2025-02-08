import api from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

export const usePostBio = () => {
  return useMutation({
    mutationFn: async ({
      userId,
      date_birth,
      gender,
      phone,
      isLoading,
    }: {
      userId: number;
      date_birth: string;
      gender: string;
      phone: string;
      isLoading: boolean;
    }) => {
      if (!userId) throw new Error("User ID is required");

      const response = await api.put(`/api/users/${userId}`, {
        data: { date_birth, gender, phone },
      });

      return response.data;
    },
  });
};

// const fetchPreferences = async () => {
//   const response = await api.get("/api/comment-likes?populate=*");
//   return response.data;
// };
