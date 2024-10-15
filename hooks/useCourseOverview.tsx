import api from "@/lib/axios";
import { Course, courseDetail } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";

const fetchCourseDetails = async () => {
  const response = await api.get("/api/course-details?populate=*");

  return response.data;
};

export const useFetchOverview = () => {
  return useQuery<{ data: courseDetail }, Error>({
    queryFn: fetchCourseDetails,
    queryKey: ["courseDetails"],
    meta: {
      errorMessage: "Course Details not found",
    },
  });
};

const fetchUsers = async (courseId: number) => {
    const response = await api.get(`/api/courses/${courseId}?populate[users]=`);
    
    return response.data.data.attributes.users;
  };
  
  export const useFetchUsers = (courseId: number) => {
    return useQuery<{ data: any }, Error>({
      queryFn: () => fetchUsers(courseId), 
      queryKey: ["enrolled", courseId], 
      meta: {
        errorMessage: "Failed to fetch students",
      },
    });
  };
  

  const fetchCourses = async () => {
    const response = await api.get('/api/courses?populate=users,topicname,tutors,reviews,categories');
    return response.data;
  };
  
  export const useFetchCourses = () => {
    return useQuery<Course[], Error>({
      queryKey: ["courses"],
      queryFn: fetchCourses,
      meta: {
        errorMessage: "Failed to fetch courses",
      },
    });
  };
  