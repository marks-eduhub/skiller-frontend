import api from "@/lib/axios"
import { useQuery } from "@tanstack/react-query";

export const PostTest = async(courseId:string, testname:string, testdescription:string, testduration:string, topicId:string, passmark:number) => {

    const response = await api.post("/api/tests?populate=*", {
        data: {
            course:courseId,
            testname,
            testdescription,
            testduration,
            topic: topicId,
            passmark: String(passmark)

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


const fetchTopic = async (courseId:string, userId:number) => {

    const response = await api.get (`/api/topics?filters[course][documentId]=${courseId}&user=${userId}&populate=course`);

    return response.data;
  };
  
  export const useFetchTopic = (courseId:string, userId:number) => {
    return useQuery({
      queryKey: ["select_topic", courseId, userId],
      queryFn: () => fetchTopic(courseId, userId),
      meta: {
        errorMessage: "Failed to fetch topic(s)",
      },
    });
  };

  const fetchTestQuestions = async(testId:number) => {
    const response = await api.get(`/api/questions?filters[test][id]=${testId}&populate=test`);
    return response.data;
  }

  export const useFetchTestQuestions = (testId:number) => {
    return useQuery({
      queryKey: ["test_questions", testId],
      queryFn: () => fetchTestQuestions(testId),
      meta: {
        errorMessage: "Failed to fetch test questions",
      },
    });
  };
  export const EditTest = async (
    testDocumentId: string,
    testname: string,
    testdescription: string,
    testduration: string,
    topicId: string,
    passmark: number
  ) => {


    const response = await api.put(`/api/tests/${testDocumentId}?populate=*`, {
      data: {
        testname,
        testdescription,
        testduration,
        topic: topicId,
        passmark: String(passmark),
      },
      meta: {
        errorMessage: "Failed to edit test details",
      },
    });
  
    return response.data;
  };
  
  export const EditTestQuestion = async ({
    questionId,
    questions,
    options,
    answers,
    testDocumentId,
  }: {
    questionId: number;
    questions: string;
    options: string[];
    answers: string;
    testDocumentId: string;
  }) => {
    // test.questions.data (populated via populate=*) doesn't reliably carry
    // documentId on the nested question rows, so resolve it with a direct
    // top-level query instead of trusting the nested populate shape.
    const questionResponse = await api.get(
      `/api/questions?filters[id][$eq]=${questionId}`
    );
    const questionDocumentId =
      questionResponse?.data?.data?.[0]?.attributes?.documentId;

    if (!questionDocumentId) {
      throw new Error("Question not found");
    }

    const response = await api.put(`/api/questions/${questionDocumentId}`, {
      data: {
        questions,
        options,
        answers,
        test: testDocumentId,
      },
      meta: {
        errorMessage: "Failed to edit quiz questions",
      },
    });
    return response.data;
  };

  export const DeleteTest = async (testDocumentId: string) => {
    try {
      const response = await api.delete(`/api/tests/${testDocumentId}`);
      return response.data;
    } catch (error) {
      throw new Error("Failed to delete the test. Please try again.");
    }
  };

  