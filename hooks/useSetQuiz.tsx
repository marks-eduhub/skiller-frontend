import api from "@/lib/axios"
import { useQuery } from "@tanstack/react-query";
import TurndownService from "turndown";

export const PostTest = async(testname:string, testdescription:string, testduration:string, topicId:string, passmark:string) => {
    const turndownService = new TurndownService();
    const description = turndownService.turndown(testdescription);

    const response = await api.post("/api/tests?populate=*", {
        data: {
            testname,
            testdescription:description,
            testduration,
            topic: topicId,
            passmark

        },
        meta:{
            errorMessage: "Failed to submit test details",

        }
    });
    return response.data;
}


export const PostQuestion = async(questions:string, options:string[], answers:string, testId:number) => {
    const response = await api.post("/api/questions", {
        data: {
            questions,
            options,
            answers,
            test:testId
        },
        meta:{
            errorMessage: "Failed to submit quiz questions",
        }
    });
    return response.data;
}


const fetchTopic = async (courseId:number, userId:number) => {

    const response = await api.get (`/api/topics?filters[course][id]=${courseId}&user=${userId}&populate=course,user`);

    return response.data;
  };
  
  export const useFetchTopic = (courseId:number, userId:number) => {
    return useQuery({
      queryKey: ["select_topic", courseId, userId],
      queryFn: () => fetchTopic(courseId, userId),
      meta: {
        errorMessage: "Failed to fetch topic(s)",
      },
    });
  };

  