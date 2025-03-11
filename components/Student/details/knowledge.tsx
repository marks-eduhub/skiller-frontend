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
  useCompletedTopics
} from "@/hooks/useSubmit";
import { message } from "antd";
import { useParams, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState , useRef} from "react";
import Image from "next/image";
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
  const courseId = Number(slug);
  const [selectedTab, setselectedTab] = useState("Tests");
  const [isAttempting, setIsAttempting] = useState(false)
  const { data: completedTopics} = useCompletedTopics(userId, courseId);
  const handleselectedClick = (tabName: string) => {
    setselectedTab(tabName);
  };
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
      courseId: number;
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
    }: {
      userId: number;
      courseId: number;
      score: number;
      progressId: number;
    }) => {
      return await courseRating(userId, courseId, score, progressId);
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
    message.success("Success");
  } catch (error) {
    message.error("Error updating topic progress");
  }
}, [hasUserPassedAllTests, userId, topicId, coursetrackerId, isTopicCompleted]);


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

    const progressId = courseStatus.data[0].id;

    try {
      createCourseRating({ userId, courseId, score: rating, progressId });

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
      <Loader/>
    );
  }
  if (error || isError) {
    message.error("Error fetching results.");
  }

  return (
    <div className="flex flex-col rounded-lg">
      <div className="flex w-full mb-4 cursor-pointer">
        <div
          className={`bg-gray-300 justify-center items-center flex w-1/2 h-full ${
            selectedTab === "Tests"
              ? "text-black transition-all duration-300 ease-in-out border-b-2 border-black"
              : "text-gray-400"
          }`}
          onClick={() => setselectedTab("Tests")}
        >
          <h2
            className={`p-4 ${
              selectedTab === "Tests" ? "font-bold text-[20px]" : "text-[20px]"
            }`}
          >
            Tests
          </h2>
        </div>

        <div
          className={`bg-gray-300 justify-center items-center flex w-1/2 h-full ${
            selectedTab === "Quizzes"
              ? "text-black transition-all duration-100 ease-in-out border-b-2 border-black"
              : "text-gray-400"
          }`}
          onClick={() => handleselectedClick("Quizzes")}
        >
          <h2
            className={`${
              selectedTab === "Quizzes"
                ? "p-4 font-bold text-[20px]"
                : "p-4 text-[20px]"
            }`}
          >
            Quizzes
          </h2>
        </div>
      </div>

      {selectedTab === "Tests" && (
        <>
          {hasTests ? (
            tests?.data?.map((test: any) => {
              const testname = test.attributes?.testname || "Test1";
              const attemptsremaining =
                totalAttempts - (attemptsByTest[test.id] || 0);
              const hasAttempted = attemptsremaining < totalAttempts;
              const passmark = tests?.data[0]?.attributes?.passmark;

              return (
                <div key={test.id} className="w-full py-6 cursor-pointer">
                  <div className="flex flex-col sm:flex-row sm:space-x-4">
                    <div className="bg-gray-200 w-full sm:w-[300px] mb-2 sm:mb-0">
                      <h1 className="font-bold text-[15px] p-4 sm:p-6">
                        {testname}
                      </h1>
                    </div>

                    {!hasAttempted ? (
                      <div className="w-full sm:w-1/4 mb-2 sm:mb-0">
                        <button
                          onClick={() => handleAttemptTest(test.id)}
                          className="bg-gray-600 text-white font-bold text-[15px] p-4 sm:p-6 rounded-md"
                        >
                        <span>Attempt test</span>
                        {isAttempting && (
                         <DotPulseWrapper size="20" speed="1.5" color="white" />
                         )}
                         </button>
                      </div>
                    ) : (
                      <>
                        <div className="bg-gray-700 w-full sm:w-1/4 mb-2 sm:mb-0">
                          <h1 className="text-white font-bold text-[15px] p-4 sm:p-6">
                            Attempts left: {attemptsremaining}
                          </h1>
                        </div>

                        <div className="bg-gray-200 w-full sm:w-1/4 mb-2 sm:mb-0">
                          {attemptsremaining === 0 ? (
                            <h1 className="font-bold text-[15px] p-4 sm:p-6 cursor-not-allowed opacity-50">
                              No attempts left
                            </h1>
                          ) : (
                            <button
                              onClick={() => handleAttemptTest(test.id)}
                              className="font-bold text-[15px] p-4 sm:p-6 hover:text-blue-600 hover:underline"
                            >
                              Re-attempt Test
                            </button>
                          )}
                        </div>

                        <div className="bg-gray-700 w-full sm:w-1/5 mb-2 sm:mb-0">
                          <div className="flex flex-col sm:my-0 sm:ml-0 my-4 ml-2">
                            <h1 className="font-semibold text-[15px] p-4  text-white">
                              Highest Score: {highestScores[test.id] || 0}
                            </h1>
                            <h1 className="font-semibold text-[15px] p-4 text-white">
                              Most Recent Score:{" "}
                              {mostRecentScores[test.id] || 0}
                            </h1>
                          </div>
                        </div>

                        <div className="bg-gray-300 w-full sm:w-1/6 flex flex-col items-center justify-center py-3">
                          <h1 className="font-bold text-[15px] p-4 sm:p-6">
                            {highestScores[test.id] >= passmark
                              ? "Passed"
                              : "Failed"}
                          </h1>
                          {highestScores[test.id] >= passmark ? (
                            <Image
                              src="/tick1.svg"
                              alt="tick"
                              width={25}
                              height={25}
                            />
                          ) : (
                            <Image
                              src="/fail.svg"
                              alt="fail"
                              width={20}
                              height={20}
                            />
                          )}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="w-full flex flex-col items-center justify-center py-6">
              <h1 className="font-bold text-[15px] p-4">
                No tests available for this topic.
              </h1>
            </div>
          )}
        </>
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
        />
      )}
    </div>
  );
};

export default Knowledge;
