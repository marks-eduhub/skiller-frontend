import api from "@/lib/axios"
import { useQuery } from "@tanstack/react-query";
import TurndownService from "turndown";

export const PostTest = async(testname:string, testdescription:string, testduration:string, topicId:string) => {
    const turndownService = new TurndownService();
    const description = turndownService.turndown(testdescription);

    const response = await api.post("/api/tests?populate=*", {
        data: {
            testname,
            testdescription:description,
            testduration,
            topic: topicId,
            // dateCreated: new Date().toISOString(),
        },
        meta:{
            errorMessage: "Failed to display",

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
            errorMessage: "Failed to display",
        }
    });
    return response.data;
}


const fetchTopic = async () => {

    const response = await api.get(`/api/topics?populate=*`);

    return response.data;
  };
  
  export const useFetchTopic = () => {
    return useQuery({
      queryKey: ["selecttopic"],
      queryFn: () => fetchTopic(),
      meta: {
        errorMessage: "Try again later!",
      },
    });
  };