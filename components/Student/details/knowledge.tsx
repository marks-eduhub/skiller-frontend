import { useAuthContext } from "@/components/AuthProvider/AuthContext";
import {
  useFetchTests,
  useFetchAllCourseTests,
  courseRating,
  useFetchCourseCompletion,
  useFetchCourseRating,
  updateCourseRating,
  useFetchSpecificCourseRate,
  topicProgress,
  useFetchCourseTracker,
  useCompletedTopics,
  createCourseProgress
} from "@/hooks/useSubmit";
import { message } from "antd";
import { useParams, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState , useRef} from "react";
import AttemptTestModal from "@/components/Student/details/warning";
import { useFetchTopicResult } from "@/hooks/useQuestions";
import { useMutation } from "@tanstack/react-query";
import RatingModal from "./ratingmodal";
import dynamic from "next/dynamic";
import Loader from "../loader";

const DotPulseWrapper = dynamic(() => import("@/hooks/pulse"), { ssr: false });
const Knowledge = () => {
  const searchParams = useSearchParams();
  const idTopic = searchParams.get("topicId");
  const topicId = Number(idTopic)
  const { user } = useAuthContext();
  const userId = Number(user?.id);
  const { slug } = useParams();
  const courseId = String(slug);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [selectedTab, setselectedTab] = useState("Tests");
  const [isAttempting, setIsAttempting] = useState(false)
  const { data: completedTopics} = useCompletedTopics(userId, courseId);
 const [selectedTestId, setSelectedTestId] = useState<number | null>(null);
  const [highestScores, setHighestScores] = useState<{ [key: number]: number }>(
    {}
  );
  const [mostRecentScores, setMostRecentScores] = useState<{
    [key: number]: number;
  }>({});
  const [showModal, setShowModal] = useState(false);
  const [attemptsByTest, setAttemptsByTest] = useState<{
    [key: number]: number;
  }>({});
  const [isFirstAttempt, setIsFirstAttempt] = useState(false);
  const [isLastAttempt, setIsLastAttempt] = useState(false);
  const router = useRouter();
  const totalAttempts = 3;
  const [showRatingModal, setShowRatingModal] = useState(false);
  const { data: allCourseTests } = useFetchAllCourseTests(topicId, userId);
  const all = allCourseTests?.data
  const {data:coursetrackerdata} = useFetchCourseTracker(userId, courseId)
  const coursetrackerId = coursetrackerdata?.data?.[0]?.id;  
  const { data: courseStatus } = useFetchCourseCompletion(courseId, userId);
  const { data: courseratings } = useFetchCourseRating(courseId, userId);
  const hasRated = courseratings?.data?.length > 0;
  const courseprogress = courseStatus?.data?.[0]?.attributes?.completed;
  const shouldShowRatingModal = !hasRated && courseprogress;
  const { data: specificCourseRate } = useFetchSpecificCourseRate(courseId);
  const ratings = specificCourseRate?.data || [];
  const { data, isLoading, error } = useFetchTopicResult(
    Number(userId),
    Number(topicId)
  );
  const testresultdata = data?.data;
  const isTestAvailable = Boolean(testresultdata && testresultdata.length > 0);
  const {
    data: tests,
    isLoading: isTests,
    error: isError,
  } = useFetchTests(Number(topicId), Number(userId), isTestAvailable);
  const hasTests = tests?.data?.length > 0;
  
  useEffect(() => {
    if (!isLoading && completedTopics) {
    }
  }, [completedTopics, isLoading]);

  const isTopicCompleted = completedTopics?.some((topic: { id: number; }) => topic.id === topicId);

 
  const { mutate: updateRate } = useMutation({
    mutationFn: async ({
      courseId,
      averageRating,
    }: {
      courseId: string;
      averageRating: number;
    }) => {
      return await updateCourseRating(courseId, averageRating);
    },
    onError: (err) => {
      message.error("Error updating rating");
    },
  });

  const handleRatingUpdate = async (rating: number) => {
    const totalRatings = ratings?.length || 0;
    const totalScore = ratings.reduce(
      (sum: number, r: any) => sum + r.attributes.score,
      0
    );

    const averageRating =
      totalRatings > 0 ? (totalScore + rating) / (totalRatings + 1) : rating;
    updateRate({ courseId, averageRating });
  };

  const { mutate: createCourseRating } = useMutation({
    mutationFn: async ({
      userId,
      courseId,
      score,
      progressId,
      comment
    }: {
      userId: number;
      courseId: string;
      score: number;
      progressId: string;
      comment:string
    }) => {
      return await courseRating(userId, courseId, score, progressId, comment);
    },
    onSuccess: (_, { score }) => {
      handleRatingUpdate(score);
    },
    onError: () => {
      message.error("Error attaching a rating to course");
    },
  });

const hasUserPassedAllTests = useCallback(() => {
  return all?.every((test: { attributes: { test_results: { data: any[] }; passmark: any } }) => {
    const testResults = test?.attributes?.test_results?.data ?? [];

    if (testResults.length === 0) {
      return false;
    }

    const scores = testResults
      .map((result) => result?.attributes?.score ?? 0)
      .filter((score) => typeof score === "number");

    const maxScore = scores.length ? Math.max(...scores) : 0;

    return maxScore >= Number(test?.attributes?.passmark ?? 0);
  });
}, [all]);

const hasUpdatedProgress = useRef(false);

const handleTopicCompletion = useCallback(async () => {
  if (!hasUserPassedAllTests()) {
    return;
  }

  if (isTopicCompleted) {  
    return;
  }

  if (hasUpdatedProgress.current) {
    return;
  }

  hasUpdatedProgress.current = true; 

  try {
    await topicProgress(userId, topicId, coursetrackerId, true);
    // message.success("Success");
  } catch (error) {
    // message.error("Error updating topic progress");
  }
}, [hasUserPassedAllTests, userId,  topicId, coursetrackerId, isTopicCompleted]);


useEffect(() => {
  if (isTopicCompleted) {
    return;
  }

  if (hasUserPassedAllTests()) {
    handleTopicCompletion();
  }
}, [hasUserPassedAllTests, handleTopicCompletion, isTopicCompleted]);

  const submitRating = async (rating: number) => {
    if (!courseStatus || courseStatus.length === 0) {
      message.error("No course progress found!");
      return;
    }

    if(!comment) {
      message.error("Please add a comment");
      return;
    }

    const progressId = courseStatus.data[0].attributes.documentId;

    try {
      createCourseRating({ userId, courseId, score: rating, progressId , comment});

      message.success("Thank you for your rating!");
      setShowRatingModal(false);
    } catch (error) {
      message.error("Failed to submit rating.");
    }
  };

  const getHighestAndMostRecentScores = (testResults: any) => {
    const scoresByTest: { [key: number]: number } = {};
    const mostRecentByTest: { [key: number]: number } = {};

    testResults.forEach((test: any) => {
      const testId = test.attributes.test?.data?.id;
      if (!testId) return;

      const score = test.attributes.score;
      const createdAt = new Date(test.attributes.latestscore);

      if (!scoresByTest[testId] || score > scoresByTest[testId]) {
        scoresByTest[testId] = score;
      }

      if (
        !mostRecentByTest[testId] ||
        createdAt > new Date(mostRecentByTest[testId])
      ) {
        mostRecentByTest[testId] = score;
      }
    });

    return { scoresByTest, mostRecentByTest };
  };

  const calculateScores = useCallback(() => {
    if (testresultdata && testresultdata.length > 0) {
      const { scoresByTest, mostRecentByTest } =
        getHighestAndMostRecentScores(testresultdata);
      setHighestScores(scoresByTest);
      setMostRecentScores(mostRecentByTest);
    }
  }, [testresultdata]);

  useEffect(() => {
    calculateScores();
  }, [calculateScores]);

  useEffect(() => {
    if (data) {
      const attempts = data?.data?.reduce((acc: any, test: any) => {
        const testId = test.attributes.test?.data?.id;
        if (!testId) return acc;
        acc[testId] = (acc[testId] || 0) + 1;
        return acc;
      }, {});
      setAttemptsByTest(attempts || {});
    }
  }, [data, topicId, userId]);

  const handleAttemptTest = (testId: number) => {
    setSelectedTestId(testId);
    setShowModal(true);
    setIsAttempting(true);
   const timesAttempted = attemptsByTest[testId] || 0;
    const attemptsRemaining = totalAttempts - timesAttempted;

    if (attemptsRemaining <= 0) {
      message.error("You have reached the maximum number of attempts.");
      return;
    }

    if (attemptsRemaining > 0) {
      if (timesAttempted === 0) {
        setIsFirstAttempt(true);
      } else if (attemptsRemaining === 1) {
        setIsLastAttempt(true);
      } else {
        setIsFirstAttempt(false);
        setIsLastAttempt(false);
        setShowModal(false);
        router.push(
          `/dashboard/quizreview?topicId=${topicId}&testId=${testId}`
        );
      }
    }
    setIsAttempting(false);
  };

  const handleStartTest = () => {
    setIsFirstAttempt(false);
    setIsLastAttempt(false);
    router.push(
      `/dashboard/quizreview?topicId=${topicId}&testId=${selectedTestId}`
    );
    setIsAttempting(false);
    setShowModal(false);
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  if (isLoading || isTests) {
    return (
      <div className ="flex items-center justify-center">
      <Loader/>

      </div>
    );
  }
  if (error || isError) {
    message.error("Error fetching results.");
  }

  return (
    <div className="flex flex-col rounded-lg">
      <div className="mb-4">
        <span className="inline-block border-b-2 border-black pb-1 text-sm font-bold text-black">
          Tests
        </span>
      </div>

      {selectedTab === "Tests" && (
        <div className="flex flex-col gap-2.5">
          {hasTests ? (
            tests?.data?.map((test: any) => {
              const testname = test.attributes?.testname || "Test1";
              const attemptsremaining =
                totalAttempts - (attemptsByTest[test.id] || 0);
              const hasAttempted = attemptsremaining < totalAttempts;
              const passmark = tests?.data[0]?.attributes?.passmark;
              const passed = highestScores[test.id] >= passmark;

              return (
                <div
                  key={test.id}
                  className="flex flex-col gap-3 rounded-lg border border-gray-200 bg-white p-3 sm:flex-row sm:items-center sm:justify-between sm:p-4"
                >
                  <div className="min-w-0 flex-1">
                    <h3 className="truncate text-sm font-semibold text-gray-900 sm:text-base">
                      {testname}
                    </h3>
                    {hasAttempted && (
                      <div className="mt-1 flex flex-wrap gap-x-4 gap-y-0.5 text-xs text-gray-500">
                        <span>Highest: {highestScores[test.id] || 0}%</span>
                        <span>Recent: {mostRecentScores[test.id] || 0}%</span>
                        <span>
                          {attemptsremaining} attempt
                          {attemptsremaining === 1 ? "" : "s"} left
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="flex shrink-0 items-center gap-2.5">
                    {hasAttempted && (
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                          passed
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {passed ? "Passed" : "Failed"}
                      </span>
                    )}

                    {!hasAttempted ? (
                      <button
                        onClick={() => handleAttemptTest(test.id)}
                        className="flex items-center gap-2 rounded-md bg-gray-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-gray-700"
                      >
                        <span>Attempt test</span>
                        {isAttempting && (
                          <DotPulseWrapper size="14" speed="1.5" color="white" />
                        )}
                      </button>
                    ) : attemptsremaining === 0 ? (
                      <span className="text-sm font-medium text-gray-400">
                        No attempts left
                      </span>
                    ) : (
                      <button
                        onClick={() => handleAttemptTest(test.id)}
                        className="rounded-md border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-800 transition hover:bg-gray-100"
                      >
                        Re-attempt
                      </button>
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="flex items-center justify-center rounded-lg border border-dashed border-gray-300 py-10">
              <p className="text-sm font-medium text-gray-500">
                No tests available for this topic.
              </p>
            </div>
          )}
        </div>
      )}

      {showModal && selectedTestId && (
        <AttemptTestModal
          testId={selectedTestId}
          isFirstAttempt={isFirstAttempt}
          isLastAttempt={isLastAttempt}
          onClose={handleCancel}
          onStartTest={handleStartTest}
          MAX_ATTEMPTS={totalAttempts}
        />
      )}
      {shouldShowRatingModal && (
        <RatingModal
          isOpen={showRatingModal}
          onClose={() => setShowRatingModal(false)}
          onSubmit={submitRating}
          setComment={setComment}
          setRating={setRating}
          comment={comment}
        />
      )}
    </div>
  );
};

export default Knowledge;
