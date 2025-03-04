import { useQuery } from "@tanstack/react-query";
import api from "../lib/axios";
import { Tutor } from "@/lib/types";

const fetchCourses = async () => {
const response = await api.get("/api/courses?populate=*");
return response.data;
};

export const useFetchCourses = () => {
  return useQuery<{ data:any}, Error>({
    queryFn: fetchCourses,
    queryKey: ["courses"],
    meta: {
      errorMessage: "Failed to fetch courses",
    },
  });
};

const fetchTutorCourses = async () => {
  const response = await api.get(
    "/api/courses?populate[tutor][populate]=user&populate[card]=*&populate[category]=*&populate[ratings]=*"
  );
    return response.data;
};

export const useFetchTutorCourses = () => {
  return useQuery<{ data:any}, Error>({
    queryFn: fetchTutorCourses,
    queryKey: ["tutor_courses"],
    meta: {
      errorMessage: "Failed to fetch your courses",
    },
  });
};

const fetchTutors = async () => {
  const response = await api.get("/api/tutors?populate=profilepicture,courses, user");

  return response.data;
};

export const useFetchTutors = () => {
  return useQuery<{ data:Tutor[]}, Error>({
    queryFn: fetchTutors,
    queryKey: ["tutors"],
    meta: {
      errorMessage: "Failed to fetch tutors",
    },
  });
};

const fetchTutorPicture = async () => {
  const response = await api.get("/api/tutors?populate[user][profilepicture]");

  const tutors = response.data.data.map((tutor: any) => ({
    ...tutor.attributes,
    profilePictureUrl: tutor.attributes.user?.data?.attributes?.profilepicture?.data?.attributes?.url || '/default-profile.png',
  }));

  return tutors;
};

export const useFetchTutorsPictures = () => {
  return useQuery<{ data: any }, Error>({
    queryFn: fetchTutorPicture,
    queryKey: ["tutor_pictures"],
    meta: {
      errorMessage: "Failed to load tutor profile pictures",
    },
  });
};


const fetchSearchTutors = async (searchTerm: string) => {
  const response = await api.get(`/api/tutors?search=${searchTerm}&populate=profilepicture`);
  return response.data;
};

export const useFetchSearchTutors = (searchTerm: string) => {
  return useQuery<{ data: any }, Error>({
    queryKey: ["searchtutors", searchTerm],
    queryFn: () => fetchSearchTutors(searchTerm),
    enabled: Boolean(searchTerm), 
    meta: {
      errorMessage: "Failed to fetch tutors",
    },
  });
};

const fetchSearchCourses = async (searchTerm: string) => {
  const response = await api.get(`/api/courses?search=${searchTerm}`);
  return response.data;
};

export const useFetchSearchCourses = (searchTerm: string) => {
  return useQuery<{ data: any }, Error>({
    queryKey: ["searchcourses", searchTerm],
    queryFn: () => fetchSearchCourses(searchTerm),
    enabled: Boolean(searchTerm), 
    meta: {
      errorMessage: "Failed to fetch courses",
    },
  });
};


const fetchCourseTopics = async(courseId:number) => {
  const response = await api.get(`/api/topics?filters[course][id][$eq]=${courseId}&populate=*`);
  return response.data;
}

export const useFetchCourseTopics = (courseId: number) => {
  return useQuery<{ data: any }, Error>({
    queryFn: () => fetchCourseTopics(courseId), 
    queryKey: ["course_topics", courseId],
    meta: {
      errorMessage: "Failed to fetch topics",
      },
  });
};

const fetchTutorSlug = async (slug:string) => {
  const response = await api.get(`api/tutors?filters[slug][$eq]=${slug}&populate=profilepicture`);
  return response.data;
};

export const useFetchTutorSlug = (slug:string) => {
  return useQuery<{ data: Tutor[] }, Error>({
    queryFn: () => fetchTutorSlug(slug), 
    queryKey: ["tutor_slug", slug],
    meta: {
      errorMessage: "Failed to fetch tutor",
    },
  });
};