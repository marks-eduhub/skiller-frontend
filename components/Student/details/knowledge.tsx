import { useAuthContext } from "@/Context/AuthContext";
import { UsefetchResult, UsefetchTestResult, useFetchTests } from "@/hooks/useSubmit";
import { message } from "antd";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import AttemptTestModal from "@/lib/warning";
import "react-loading-skeleton/dist/skeleton.css";
import Skeleton from "react-loading-skeleton";

const Knowledge = () => {
  const searchParams = useSearchParams();
  const topicId = searchParams.get("topicId");
  const { user } = useAuthContext();
  const userId = user?.id;
  const [selectedTab, setselectedTab] = useState("Tests");
  const handleselectedClick = (tabName: string) => {
    setselectedTab(tabName);
  };
  const [highestScore, setHighestScore] = useState(0);
  const [mostRecentScore, setMostRecentScore] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [isFirstAttempt, setIsFirstAttempt] = useState(false);
  const [isLastAttempt, setIsLastAttempt] = useState(false);
  const [attemptsByTopic, setAttemptsByTopic] = useState<{ [key: number]: number }>({});
  const { data, isLoading, error } = UsefetchResult(Number(topicId), Number(userId));
  const testresultdata = data?.data
  const isTestAvailable= Boolean(testresultdata && testresultdata.length > 0);
  const { data: tests, isLoading: isTests, error: isError } = useFetchTests(Number(topicId), Number(userId), isTestAvailable);

  const router = useRouter();
  const totalAttempts = 3;
  
  const getHighestAndMostRecentScore = (testResults:any) => {
    let highestScore = 0;
    let mostRecentScore = 0;
    let latestDate = new Date(0);
  
    testResults.forEach((test:any) => {
      const score = test.attributes.score; 
      const createdAt = new Date(test.attributes.latestscore); 
  
      if (score > highestScore) {
        highestScore = score;
      }
  
      if (createdAt > latestDate) {
        latestDate = createdAt;
        mostRecentScore = score;
      }
    });
  
    return { highestScore, mostRecentScore }; 
  };
  
  useEffect(() => {
    if (testresultdata && testresultdata.length > 0) {
      const { highestScore, mostRecentScore } = getHighestAndMostRecentScore(testresultdata);
      setHighestScore(highestScore);  
      setMostRecentScore(mostRecentScore);  
    }
  }, [testresultdata, topicId, userId]);


  useEffect(() => {
    const fetchAndSetTimesAttempted = () => {
      if (data) {
        const attemptCount = data?.data?.length || 0;
        setAttemptsByTopic((prev) => ({
          ...prev,
          [Number(topicId)]: attemptCount,
        }));
      }
    };
  
    fetchAndSetTimesAttempted();
  }, [data, topicId, userId]);


  const handleAttemptTest = () => {
    
    const timesAttempted = attemptsByTopic[Number(topicId)] || 0;
    const attemptsRemaining = totalAttempts - timesAttempted;

if (attemptsRemaining <= 0) {
  message.error("You have reached the maximum number of attempts.");
  return;
}

if (attemptsRemaining > 0) {
  if (timesAttempted === 0) {
    setIsFirstAttempt(true);
    setShowModal(true);
  } else if (attemptsRemaining === 1) {
    setIsLastAttempt(true);
    setShowModal(true);
  } else {
    setIsFirstAttempt(false);
    setIsLastAttempt(false);
    router.push(`/dashboard/quizreview?topicId=${topicId}`);
  }
}
  };

 
  const handleStartTest = () => {
    if (isFirstAttempt || isLastAttempt) {
      setIsFirstAttempt(false);
      setIsLastAttempt(false);
    }
 
    router.push(`/dashboard/quizreview?topicId=${topicId}`);
 
    setShowModal(false);
  };
 
 
 
  const handleCancel = () => {
    setShowModal(false);
  };
 
 
  const passmark = tests?.data[0]?.attributes?.passmark;
  const testname = tests?.data[0]?.attributes?.testname;
  if (isLoading || isLoading || isTests ) {
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
  if (error || isError) {
    message.error("Error fetching details. Please try again later.");
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
              selectedTab === "Quizzes" ? "p-4 font-bold text-[20px]" : "p-4 text-[20px]"
            }`}
          >
            Quizzes
          </h2>
        </div>
      </div>
 
      {selectedTab === "Tests" && (
        <>
         {tests?.data && tests?.data.length > 0 ? (
            tests?.data?.map((test: any) => {
              const attemptsremaining = totalAttempts - (attemptsByTopic[Number(topicId)] || 0);

 
              return (
                <div key={test.id} className="w-full py-6 cursor-pointer">
                  <div className="flex flex-col sm:flex-row sm:space-x-4">
                    <div className="bg-gray-200 w-full sm:w-1/3 mb-2 sm:mb-0">
                      <h1 className="font-bold text-[15px] p-4 sm:p-6">
                        {testname}
                      </h1>
                    </div>
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
                          onClick={() => handleAttemptTest()}
                          className="font-bold text-[15px] p-4 sm:p-6 hover:text-blue-600 hover:underline"
                        >
                          Re-attempt Test
                        </button>
                      )}
                    </div>
                    
                    <div className="bg-gray-700 w-full sm:w-1/5 mb-2 sm:mb-0">
                    <div className="flex flex-col">
                      <h1 className="text-white  text-[15px] sm:p-6">
                        <h1 className="my-2">Highest Score: {highestScore}</h1>
                        <h1>Most Recent Score: {mostRecentScore}</h1>

                      </h1>
                      </div>
                    </div>
                    <div className="bg-gray-200 w-full sm:w-1/6 flex flex-col items-center justify-center py-3">
                      <h1 className="font-bold text-[15px] p-4 sm:p-6">
                        {highestScore >= passmark ? "Passed" : "Failed"}
                      </h1>
                      {highestScore >= passmark ? (
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
                  </div>
                </div>
              );
            })
          ) : (
            <div className="w-full flex flex-col items-center justify-center py-6">
              <h1 className="font-bold text-[15px] p-4">
                No attempts made yet.
              </h1>
              <button
                className="bg-slate-900 text-white p-2 rounded hover:bg-gray-300 hover:text-black"
                onClick={() => handleAttemptTest()}
              >
                Attempt Test
              </button>
            </div>
          )}
        </>
      )}
 
      {showModal && (
        <AttemptTestModal
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
 


{/* {selectedTab === "Quizzes" &&
        tabs.tests.map((test, index) => (
          <>
            <div
              key={index}
              className="w-full py-6 cursor-pointer max-md:hidden "
            >
              <div className="flex flex-col sm:flex-row sm:space-x-4">
                <div className="bg-gray-200 w-full sm:w-1/3 mb-2 sm:mb-0">
                  <h1 className="font-bold text-[15px] p-4 sm:p-6">
                    {test.Test}
                  </h1>
                </div>
                <div className="bg-gray-700 w-full sm:w-1/4 mb-2 sm:mb-0">
                  <h1 className="text-white font-bold text-[15px] p-4 sm:p-6">
                    {test.topic}
                  </h1>
                </div>
                <div className="bg-gray-200 w-full sm:w-1/4 mb-2 sm:mb-0">
                  <Link href="/dashboard/quizreview">
                    <h1 className="font-bold text-[15px] p-4 sm:p-6 hover:text-blue-600 hover:underline">
                      {test.actionText}
                    </h1>
                  </Link>
                </div>
                <div className="bg-gray-700 w-full sm:w-1/6 mb-2 sm:mb-0">
                  <h1 className="text-white font-bold text-[15px] p-4 sm:p-6">
                    {test.score}
                  </h1>
                </div>
                <div className="bg-gray-200 w-full sm:w-1/6 flex flex-col items-center justify-center py-3">
                  <h1 className="font-bold text-[15px] p-4 sm:p-6">
                    {test.status}
                  </h1>
                  {test.status === "Passed" ? (
                    <Image src="/tick1.svg" alt="tick" width={25} height={25} />
                  ) : (
                    <Image src="/fail.svg" alt="fail" width={20} height={20} />
                  )}
                </div>
              </div>
            </div>
            <div className="sm:hidden w-full flex mb-4 ">
              <div className="flex flex-col w-[55%] ">
                <div className="bg-gray-200 h-[235px]">
                  <h1 className="font-bold text-[15px] p-4 sm:p-6">
                    {test.Test}
                  </h1>
                  <h1 className="text-gray-600 font-bold text-[15px] p-4 sm:p-6">
                    {test.topic}
                  </h1>
                  <h1 className="font-bold text-[15px] underline p-4 sm:p-6">
                    {test.status}
                  </h1>
                  <Link href="/dashboard/quizreview">
                    <h1 className="font-bold text-[15px] p-4 sm:p-6 hover:text-blue-600 hover:underline">
                      {test.actionText}
                    </h1>
                  </Link>
                </div>
              </div>

              <div className="flex flex-col w-[45%]">
                <div className="bg-gray-600  h-[230px] py-10 px-3 ">
                
                  <h1 className="font-bold text-[15px] text-white p-3">{test.status}</h1>
                  <div className="p-3">
                    {test.status === "Passed" ? (
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
                  <h1 className="text-white font-bold text-[15px] p-3 sm:p-6">
                    {test.score}
                  </h1>
                </div>
              </div>
            </div>
          </>
        ))} */}