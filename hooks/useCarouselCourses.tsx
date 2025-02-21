import { useQuery } from "@tanstack/react-query";
import api from "../lib/axios";
import { CarouselCourses } from "@/lib/types";


const fetchCarouselCourses = async () => {
  const response = await api.get("/api/courses?populate=*&filters[featured]=true")
  return response.data;
};


export const useFetchCarouselCourses = () => {
  return useQuery<{ data: CarouselCourses[] }, Error>({
    queryFn: fetchCarouselCourses,
    queryKey: ["carousel"],
    meta: {
      errorMessage: "Failed to display",
    },
  });
};    