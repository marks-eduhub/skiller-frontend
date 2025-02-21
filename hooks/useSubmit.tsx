import api from "@/lib/axios";
import { Question, Test } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";



const fetchResult = async (userId: number, topicId: number) => {
  const response = await api.get(
    `/api/test-results?filters[topic][id][$eq]=${topicId}&filters[user][id][$eq]=${userId}&populate=user_question_results,topic,test,user`
  );
  return response.data;
};

export const UsefetchResult = (topicId: number, userId: number) => {
  return useQuery({
    queryKey: ["testresults_2", topicId, userId],
    queryFn: () => fetchResult(userId, topicId),

    meta: {
      errorMessage: "Failed to fetch test result",
    },
    enabled: !!userId && !!topicId,
  });
};

const fetchQuestionResultsByTestResult = async (testResultId: number) => {
  const response = await api.get(
    `/api/user-question-results?filters[test_result][id][$eq]=${testResultId}&populate=questions`
  );
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

const fetchTests = async (topicId: number, userId: number) => {
  const response = await api.get(
    `/api/tests?filters[topic][id]=${topicId}&user=${userId}&populate=topic,user`
  );
  return response.data;
};

export const useFetchTests = (
  topicId: number,
  userId: number,
  enabled: boolean = true
) => {
  return useQuery({
    queryKey: ["test", topicId, userId],
    queryFn: () => fetchTests(topicId, userId),
    enabled,
  });
};

const fetchCourseTests = async(topicId:number) => {
  const response = await api.get(`/api/tests?filters[topic][id]=${topicId}&populate=*`);
  return response.data;
}

export const useFetchCourseTests = (topicId: number) => {
  return useQuery<{ data: Test }, Error>({
    queryKey: ["topic_tests", topicId],
    queryFn: () => fetchCourseTests(topicId),
  });
 
}


export const createTestResult = async (
  userId: number,
  topicId: number,
  testId: number,
  times_attempted: number
) => {
  const response = await api.post("/api/test-results", {
    data: {
      user: userId,
      topic: topicId,
      score: 0,
      times_of_attempt: times_attempted,
      test: testId,
      latestscore: new Date().toISOString(),
    },
  });

  return response.data;
};

export const createQuestionResult = async (
  passed: boolean,
  testResultId: number,
  userAnswer: string,
  questionId: number
) => {
  const response = await api.post("/api/user-question-results", {
    data: {
      passed,
      test_result: testResultId,
      useranswer: userAnswer,
      question: questionId,
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
  const response = await api.put(
    `/api/user-question-results/${userQuestionResultId}`,
    {
      data: {
        useranswer: userAnswer,
        passed: passed,
        questions: questionId,
      },
    }
  );
  return response.data;
};

export const updateTestResultScore = async (
  testResultId: number,
  score: number
) => {
  const response = await api.put(`/api/test-results/${testResultId}`, {
    data: { score: score },
  });
  return response.data;
};
