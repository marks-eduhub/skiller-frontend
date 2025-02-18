import { useAuthContext } from "@/Context/AuthContext";
import { UsefetchResult, useFetchTests } from "@/hooks/useSubmit";
import { message } from "antd";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import AttemptTestModal from "@/lib/warning";
import "react-loading-skeleton/dist/skeleton.css";
import Skeleton from "react-loading-skeleton";
import { UsefetchTestResult } from "@/hooks/useQuestions";

const Knowledge = () => {
  const searchParams = useSearchParams();
  const topicId = searchParams.get("topicId");
  const { user } = useAuthContext();
  const userId = user?.id;
  const [selectedTab, setselectedTab] = useState("Tests");
  const handleselectedClick = (tabName: string) => {setselectedTab(tabName); };
  const [selectedTestId, setSelectedTestId] = useState<number | null>(null);
  const [highestScores, setHighestScores] = useState<{ [key: number]: number }>({});
  const [mostRecentScores, setMostRecentScores] = useState<{[key: number]: number }>({});
  const [showModal, setShowModal] = useState(false);
  const [attemptsByTest, setAttemptsByTest] = useState<{[key: number]: number}>({});
  const [isFirstAttempt, setIsFirstAttempt] = useState(false);
  const [isLastAttempt, setIsLastAttempt] = useState(false);
  const router = useRouter();
  const totalAttempts = 3;

  const { data, isLoading, error } = UsefetchTestResult(Number(topicId),Number(userId));
  const testresultdata = data?.data;

  const isTestAvailable = Boolean(testresultdata && testresultdata.length > 0);
  const {data: tests,isLoading: isTests, error: isError } = useFetchTests(Number(topicId), Number(userId), isTestAvailable);

  const hasTests = tests?.data?.length > 0;
 

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
  
      if (!mostRecentByTest[testId] || createdAt > new Date(mostRecentByTest[testId])) {
        mostRecentByTest[testId] = score;
      }
    });
  
    return { scoresByTest, mostRecentByTest };
  };
  
  
  useEffect(() => {
    if (testresultdata && testresultdata.length > 0) {
      const { scoresByTest, mostRecentByTest } = getHighestAndMostRecentScores(testresultdata);
      setHighestScores(scoresByTest);
      setMostRecentScores(mostRecentByTest);
    }
  }, [testresultdata, topicId, userId]);
  

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
        router.push(
          `/dashboard/quizreview?topicId=${topicId}&testId=${testId}`
        );
      }
    }
  };

  const handleStartTest = () => {
    setIsFirstAttempt(false);
    setIsLastAttempt(false);
  
    router.push(
      `/dashboard/quizreview?topicId=${topicId}&testId=${selectedTestId}`
    );
  
    setShowModal(false);
  };
 

  const handleCancel = () => {
    setShowModal(false);
  };

  

  if (isLoading || isLoading || isTests) {
    return (
      <div>
        <Skeleton
          width={200}
          height={24}
          baseColor="#e0e0e0"
          highlightColor="#f0f0f0"
        />

        <div>
          <Skeleton
            height={300}
            count={3}
            baseColor="#e0e0e0"
            highlightColor="#f5f5f5"
            enableAnimation={true}
          />
        </div>
      </div>
    );
  }
  if (error) {
    message.error("Error fetching testresults.");
  }
  if (isError) {
    message.error("Error fetching tests");
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
               const attemptsremaining = totalAttempts - (attemptsByTest[test.id] || 0);
                 const hasAttempted = attemptsremaining < totalAttempts;
                 const passmark = tests?.data[0]?.attributes?.passmark;

                 return (
                  <div key={test.id} className="w-full py-6 cursor-pointer">
                  <div className="flex flex-col sm:flex-row sm:space-x-4">
          
                  <div className="bg-gray-200 w-full sm:w-1/4 mb-2 sm:mb-0">
                  <h1 className="font-bold text-[15px] p-4 sm:p-6">{testname}</h1>
                   </div>

                 {!hasAttempted ? (
                  <div className="w-full sm:w-1/4 mb-2 sm:mb-0">
                  <button
                  onClick={() => handleAttemptTest(test.id)}
                  className="bg-gray-600 text-white font-bold text-[15px] p-4 sm:p-6 rounded-md"
                    >
                   Attempt Test
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
                    Most Recent Score: {mostRecentScores[test.id] || 0}
                  </h1>
                   </div>
                  </div>

                  <div className="bg-gray-300 w-full sm:w-1/6 flex flex-col items-center justify-center py-3">
                  <h1 className="font-bold text-[15px] p-4 sm:p-6">
                  {highestScores[test.id] >= passmark ? "Passed" : "Failed"}
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
    </div>
  );
};

export default Knowledge;
