import api from "@/lib/axios"; 
import {  useQuery } from "@tanstack/react-query";

const fetchQuestions = async (testId: number) => {
    const response = await api.get(`/api/questions?filters[test]=${testId}&populate=questions`);
    return response.data; 
};


export const useFetchQuizQuestions = (testId: number) => {
    return useQuery({
        queryKey: ["questions", testId],
        queryFn: () => fetchQuestions(testId), 
        enabled: !!testId, 
        meta: {
            errorMessage: "Failed to fetch questions",
        },
    });
};

const fetchTestResult = async (userId: number, testId: number) => {
    const response = await api.get(
      `/api/test-results?user=${userId}&test=${testId}&populate=user_question_results,topic,test,user`
    );
    return response.data;
  };
  
  export const UsefetchTestResult = (testId: number, userId: number) => {
    return useQuery({
      queryKey: ["testresults_1", testId, userId],
      queryFn: () => fetchTestResult(userId, testId),
  
      meta: {
        errorMessage: "Failed to fetch test result",
      },
      enabled: !!userId && !!testId,
    });
  };


  
