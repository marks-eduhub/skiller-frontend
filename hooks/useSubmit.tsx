import api from "@/lib/axios";
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
    `/api/user-question-results?filters[test_result][id][$eq]=${testResultId}&populate=question`
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
    `/api/tests?filters[topic][id]=${topicId}&user=${userId}&populate=topic`
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

const fetchCourseTests = async (topicId: number) => {
  const response = await api.get(
    `/api/tests?filters[topic][id]=${topicId}&populate=*`
  );
  return response.data;
};

export const useFetchCourseTests = (topicId: number) => {
  return useQuery<{ data: any }, Error>({
    queryKey: ["topic_tests", topicId],
    queryFn: () => fetchCourseTests(topicId),
  });
};
const fetchAllCourseTests = async (topicId: number, userId: number) => {
  const response = await api.get(
    `/api/tests?filters[topic][id]=${topicId}&populate[test_results][filters][user][id][$eq]=${userId}&populate[topic]=true&populate[questions]=true&populate[course]=true`
  );
  return response.data;
};

export const useFetchAllCourseTests = (topicId: number, userId: number) => {
  return useQuery<{ data: any }, Error>({
    queryKey: ["course_tests", topicId, userId],
    queryFn: () => fetchAllCourseTests(topicId, userId),
  });
};

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
  testResultId: string,
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
  userQuestionResultId: string,
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
  testResultId: string,
  score: number
) => {
  const response = await api.put(`/api/test-results/${testResultId}`, {
    data: { score: score },
  });
  return response.data;
};

export const courseRating = async (
  userId: number,
  courseId: string,
  score: number,
  progressId: string,
  comment :string
) => {
  try {
    const response = await api.post(`/api/courseratings`, {
      data: {
        user: userId,
        course: courseId,
        score,
        user_course_progress: progressId,
        comment
      },
      
    });
    return response.data;
  } catch (error) {
    throw new Error("Error attaching a rating to course");
  }
};

export const createCourseProgress = async (
  userId: number,
  courseId: string,
  progressStatus: boolean
) => {
  try {
    const progressResponse = await api.get(
      `/api/user-course-progresses?filters[user][id][$eq]=${userId}&filters[course][documentId][$eq]=${courseId}`
    );

    const progressEntries = progressResponse.data?.data || [];

    if (progressEntries.length > 0) {
      const progressId = progressEntries[0].attributes.documentId;
      const response = await api.put(
        `/api/user-course-progresses/${progressId}`,
        {
          data: {
            user: userId,
            course: courseId,
            completed: progressStatus,
          },
        }
      );

      return response.data;
    } else {
      const response = await api.post(`/api/user-course-progresses`, {
        data: {
          user: userId,
          course: courseId,
          completed: progressStatus,
        },
      });

      return response.data;
    }
  } catch (error) {
    throw new Error("Error updating course progress");
  }
};

export const topicProgress = async (
  userId: number,
  topicId: number,
  courseTrackerId: number,
  isCompleted: boolean
) => {
  try {
    if (!courseTrackerId) {
      throw new Error("Course Tracker ID is missing");
    }

    const existingTopicProgress = await api.get(
      `/api/topic-progress-trackers?filters[user][id][$eq]=${userId}&filters[topic][id][$eq]=${topicId}&filters[course_tracker][id][$eq]=${courseTrackerId}`
    );

    const progress = existingTopicProgress?.data?.data || [];
    
    if (progress.length > 0) {
      const topicProgressId = progress[0]?.attributes?.documentId;
      const response = await api.put(
        `/api/topic-progress-trackers/${topicProgressId}`,
        {
          data: {
            user: userId,
            topic: topicId,
            course_tracker: courseTrackerId,
            completion_status: isCompleted,
          },
        }
      );
      return response.data;
    } else {
      const response = await api.post("/api/topic-progress-trackers", {
        data: {
          user: userId,
          topic: topicId,
          course_tracker: courseTrackerId,
          completion_status: isCompleted,
        },
      });
      return response.data;
    }
  } catch (error) {
    throw new Error("Error updating topic progress");
  }
};


export const useCompletedTopics = (userId:number, courseId:string) => {
  return useQuery({
    queryKey: ["completed-topics", userId, courseId],
    queryFn: async () => {
      const response = await api.get(`/api/topic-progress-trackers?filters[user][id][$eq]=${userId}&filters[course_tracker][course][documentId][$eq]=${courseId}&filters[completion_status][$eq]=true`);
      return response.data.data; 
    },
    enabled: !!userId && !!courseId, 
  });
};
export const useFetchUserCourses = (userId: number) => {
  return useQuery({
    queryKey: ["user-courses", userId],
    queryFn: async () => {
      const response = await api.get(
        `/api/course-trackers?filters[user][id][$eq]=${userId}&populate[course][populate]=*&populate[topic_progress_trackers]=true`

      );
      return response.data.data; 
    },
    enabled: !!userId,
  });
};

export const useFetchEnrolledCourses = (courseId: string) => {
  return useQuery({
    queryKey: ["enrolled-courses", courseId],
    queryFn: async () => {
      const response = await api.get(
        `/api/course-trackers?filters[course][documentId][$eq]=${courseId}&populate[course][populate]=*&populate[topic_progress_trackers]=true`

      );
      return response.data.data; 
    },
    enabled: !!courseId,
  });
};



export const courseTracker = async (userId: number, courseId: string) => {
  try {
    const currentDate = new Date().toISOString().split("T")[0];

    const existingCourseTracker = await api.get(
      `/api/course-trackers?filters[user][id][$eq]=${userId}&filters[course][documentId][$eq]=${courseId}&populate=*`
    );
    const tracker = existingCourseTracker?.data?.data || [];

    if (tracker.length > 0) {
      const trackerId = tracker[0].attributes.documentId;
      const response = await api.put(`/api/course-trackers/${trackerId}`, {
        data: {
          user: userId,
          course: courseId,
          date: currentDate,
        },
      });
      return response.data;
    } else {
      const response = await api.post("/api/course-trackers", {
        data: {
          user: userId,
          course: courseId,
          date: currentDate,
        },
      });
      return response.data;
    }
  } catch (error) {
    throw new Error("Error creating course tracker");
  }
};

const fetchCourseTracker = async (userId: number, courseId: string) => {
  const response = await api.get(
    `/api/course-trackers?filters[user][id][$eq]=${userId}&filters[course][documentId][$eq]=${courseId}&populate=*`
  );
  return response.data;
};

export const useFetchCourseTracker = (userId: number, courseId: string) => {
  return useQuery<{ data: any }, Error>({
    queryKey: ["course_trackers", userId, courseId],
    queryFn: () => fetchCourseTracker(userId, courseId),
  });
};

const fetchCourseRating = async (courseId: string, userId: number) => {
  const response = await api.get(
    `/api/courseratings?filters[course][documentId][$eq]=${courseId}&filters[user][id][$eq]=${userId}&populate=user_course_progress`
  );
  return response.data;
};

export const useFetchCourseRating = (courseId: string, userId: number) => {
  return useQuery({
    queryKey: ["course_rating", courseId, userId],
    queryFn: () => fetchCourseRating(courseId, userId),
    meta: {
      errorMessage: "Failed to fetch course rating",
    },
    enabled: !!userId && !!courseId,
  });
};
const fetchCourseCompletion = async (courseId: string, userId: number) => {
  const response = await api.get(
    `/api/user-course-progresses?filters[user][id][$eq]=${userId}&filters[course][documentId][$eq]=${courseId}&populate=*`
  );
  return response.data;
};

export const useFetchCourseCompletion = (courseId: string, userId: number) => {
  return useQuery({
    queryKey: ["course_completion", courseId, userId],
    queryFn: () => fetchCourseCompletion(courseId, userId),
    meta: {
      errorMessage: "Failed to fetch course status",
    },
    enabled: !!userId && !!courseId,
  });
};

const fetchSpecificCourseRate = async (courseId: string) => {
  const response = await api.get(
    `/api/courseratings?filters[course][documentId][$eq]=${courseId}&populate=*`
  );
  return response.data;
};

export const useFetchSpecificCourseRate = (courseId: string) => {
  return useQuery({
    queryKey: ["specific-course-rating", courseId],
    queryFn: () => fetchSpecificCourseRate(courseId),
    meta: {
      errorMessage: "Failed to fetch course status",
    },
    enabled: !!courseId,
  });
};

const fetchCourseRate = async () => {
  const response = await api.get(
    `/api/courseratings?populate=*`
  );
  return response.data;
};


export const useFetchCourseRate = () => {
  return useQuery({
    queryKey: ["course-rating"],
    queryFn: () => fetchCourseRate(),
    meta: {
      errorMessage: "Failed to fetch rating"
    },
  });
};

export const updateCourseRating = async (
  courseId: string,
  averageRating: number
) => {
  try {
    const response = await api.put(`/api/courses/${courseId}`, {
      data: {
        averageRating,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
