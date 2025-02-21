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
      `/api/test-results?filters[user][id][$eq]=${userId}&filters[test][id][$eq]=${testId}&populate=user_question_results,topic,test,user`
    );
    return response.data;
  };
  
  export const UsefetchTestResult = (userId: number, testId: number) => {
    return useQuery({
      queryKey: ["testresults_1", userId, testId],
      queryFn: () => fetchTestResult(userId, testId),
  
      meta: {
        errorMessage: "Failed to fetch test result",
      },
      enabled: !!userId && !!testId,
    });
  };

  const fetchTopicResult = async (userId: number, topicId: number) => {
    const response = await api.get(
      `/api/test-results?filters[user][id][$eq]=${userId}&filters[topic][id][$eq]=${topicId}&populate=user_question_results,topic,test,user`
    );
    return response.data;
  };
  
  export const useFetchTopicResult = (userId: number, topicId: number) => {
    return useQuery({
      queryKey: ["topicresults_1", userId, topicId],
      queryFn: () => fetchTopicResult(userId, topicId),
  
      meta: {
        errorMessage: "Failed to fetch topic test results",
      },
      enabled: !!userId && !!topicId,
    });
  };

  
