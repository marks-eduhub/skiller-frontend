import api from "@/lib/axios"; 
import { QuizData } from "@/lib/types";
import { useMutation, useQuery } from "@tanstack/react-query";

const fetchQuestions = async (topicId: number) => {
    const response = await api.get(`/api/tests?filters[topic]=${topicId}&populate=questions`);
    return response.data; 
};


export const useFetchQuizQuestions = (topicId: number) => {
    return useQuery({
        queryKey: ["questions", topicId],
        queryFn: () => fetchQuestions(topicId), 
        enabled: !!topicId, 
        meta: {
            errorMessage: "Failed to fetch questions",
        },
    });
};



   

  
