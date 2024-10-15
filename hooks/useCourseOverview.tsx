import api from "@/lib/axios";
import { Course } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";

export const useFetchOverview = (id: number) => {
  return useQuery<{
    data: any; course: Course 
}, Error>({
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