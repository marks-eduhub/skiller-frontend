import api from "@/lib/axios";
import {useQuery } from "@tanstack/react-query";

const fetchTestResult = async (userId: number, topicId: number) => {
  const response = await api.get(`/api/test-results?user=${userId}&topic=${topicId}`);
 return response.data
};

export const UsefetchTestResult = (topicId:number, userId:number) => {
    return useQuery({
        queryKey: ["testresult", topicId, userId],
        queryFn: () => fetchTestResult,
        meta: {
            errorMessage: "Failed to fetch test result",
        },
        enabled: !!userId && !!topicId
    })
}


const fetchQuestionResultsByTestResult = async (testResultId: number) => {
  const response = await api.get(`/api/user-question-results?filters[test_results][id][$eq]=${testResultId}&populate=questions`);
  return response.data;
};

export const useFetchUserQuestionResults = (testResultId: number) => {
  return useQuery<any, Error>({
    queryKey: ["userQuestionResults", testResultId],
    queryFn: () => fetchQuestionResultsByTestResult(testResultId),
    enabled: !!testResultId,
    meta: {
      errorMessage: "Failed to fetch user question results.",
    },
  });
};


const fetchTests = async (topicId: number) => {
    const response = await api.get (`/api/tests?filters[topic]=${topicId}&populate=topic`);
    return response.data
  };
  
  export const useFetchTests = (topicId: number) => {
    return useQuery({
      queryKey: ["test", topicId],
      queryFn: () => fetchTests(topicId),
      meta: {
        errorMessage: "Failed to fetch tests",
      },
    });
  };
  

export const createTestResult = async (userId: number, topicId: number, testId:number) => {
    const response = await api.post("/api/test-results", {
      data: {
        user: userId,
        topic: topicId,
        score: 70,
        times_attempted: 4,
        test: testId
      },
    });
    console.log("API response for Test Result creation:", response);

    return response.data;
  };

  
  export const createQuestionResult = async (
    passed: boolean, 
    testResultId: number, 
    userAnswer: string,
    questionId:number
  ) => {
    const response = await api.post("/api/user-question-results", {
     
      data: {
        passed,
        test_results: testResultId, 
        useranswer: userAnswer,  
        questions: questionId  
      },
    });
    return response.data;
  };
  

  export const UseUpdateQuestionResult = async (
    userQuestionResultId: number, 
    userAnswer: string, 
    passed: boolean,
    questionId: number
) => {
    const response = await api.put(`/api/user-question-results/${userQuestionResultId}`, {
        data: {
            useranswer: userAnswer,  
            passed,
            questions:questionId
        },
    });
    return response.data;
};





      