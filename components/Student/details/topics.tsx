import { useFetchOverview } from "@/hooks/useCourseOverview";
import { Topic } from "@/lib/types";
import { useParams, useSearchParams } from "next/navigation";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { CiShare2 } from "react-icons/ci";
import { message } from "antd";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { UsefetchResult, useFetchTests } from "@/hooks/useSubmit";
import { useAuthContext } from "@/Context/AuthContext";
import { markTopicCompleted, useFetchAllResults } from "@/hooks/useCourseTopics";
import { useMutation } from "@tanstack/react-query";

const TopicsCard: React.FC = () => {
  const { slug } = useParams();
  const { user } = useAuthContext();
  const userId = user?.id;
  const searchParams = useSearchParams();
  const topicId = searchParams.get("topicId");
  const { data: topicsData, isLoading, error } = useFetchOverview(Number(slug));
  const { data: testResults } = UsefetchResult(Number(topicId), Number(userId));
  const [selectedTopicId, setSelectedTopicId] = useState<string | null>(null);
  const { data: testsData } = useFetchTests(Number(topicId), Number(userId));
  const currentTopicId = searchParams.get("topicId");
  const [progress, setProgress] = useState(0);
  const { data: allTestResults, isLoading: resultsLoading, error: resultsError } = useFetchAllResults(Number(userId));

  const { mutate: topicCompleted } = useMutation({
    mutationFn: async ({ isCompleted, topicId }: { isCompleted: boolean, topicId: number }) => {
      return await markTopicCompleted(isCompleted, topicId);
    },
    onSuccess: () => {
      message.success("Topic status updated!");
    },
    onError: (err) => {
      message.error("Error updating topic status");
      console.error("Error updating topic status:", err);

    },
  });

  const handleMarkTopicCompleted = (topicId: number, isCompleted: boolean) => {
    topicCompleted({ isCompleted, topicId });
  };

  useEffect(() => {
    if (currentTopicId) {
      setSelectedTopicId(currentTopicId);
    }
  }, [currentTopicId]);

  const topics = topicsData?.data?.attributes?.topicname?.data || [];

  const sortedTopics = topics.sort(
    (a: any, b: any) =>
      (a.attributes.position || 0) - (b.attributes.position || 0)
  );
  const total = sortedTopics.length;

  const canAccessTopic = (
    topics: any[],
    testResults: any,
    currentTopicIndex: number
  ): boolean => {
    if (currentTopicIndex === 0) {
      return true;
    }

    const previousTopic = topics[currentTopicIndex - 1];

    const previousTest = testsData?.data?.find(
      (test: any) => test.attributes.topic.data.id === previousTopic.id
    );

    if (!previousTest) {
      return true;
    }

    const hasPassedTest = testResults?.data?.some(
      (result: any) =>
        result.attributes.test.data.id === previousTest.id &&
        result.attributes.score >= previousTest.attributes.passmark
    );

    return hasPassedTest ?? false;
  };

  // useEffect(() => {
  //   const topics = topicsData?.data?.attributes?.topicname?.data || [];
  //   const results = allTestResults?.data || [];

  //   if (!topics.length || !results.length) {
  //     setProgress(0);
  //     return;
  //   }

  //   const completedTopics = topics.filter((topic: any) => {
  //     const topicResults = results.filter(
  //       (result: any) => result.attributes.topic.data.id === topic.id
  //     );

  //     if (topicResults.length === 0) {
  //       return false;
  //     }

  //     const bestResult = topicResults.reduce((max: any, current: any) => {
  //       return current.attributes.score > max.attributes.score ? current : max;
  //     });

  //     const testPassmark = parseInt(
  //       bestResult.attributes.test.data.attributes.passmark,
  //       10
  //     );

  //     const passed = bestResult.attributes.score >= testPassmark;

  //     return passed;
  //   });

  //   const calculatedProgress = (completedTopics.length / topics.length) * 100;

  //   setProgress(calculatedProgress);
  // }, [topicsData, allTestResults]);


  useEffect(() => {
    const topics = topicsData?.data?.attributes?.topicname?.data || [];
    const results = allTestResults?.data || [];

    if (!topics.length || !results.length) {
      setProgress(0);
      return;
    }

    const completedTopics = topics.filter((topic: any) => {
      const topicResults = results.filter(
        (result: any) => result.attributes.topic.data.id === topic.id
      );

      if (topicResults.length === 0) {
        return false;
      }

      const bestResult = topicResults.reduce((max: any, current: any) => {
        return current.attributes.score > max.attributes.score ? current : max;
      });

      const testPassmark = parseInt(
        bestResult.attributes.test.data.attributes.passmark,
        10
      );

      const passed = bestResult.attributes.score >= testPassmark;

      if (passed) {
        topicCompleted({ isCompleted: true, topicId: topic.id });
      }

      return passed;
    });

    const calculatedProgress = (completedTopics.length / topics.length) * 100;
    setProgress(calculatedProgress);
  }, [topicsData, allTestResults, topicCompleted]);

  if (isLoading) {
    return (
      <div>
        <h2 className="rounded-lg my-4">
          <Skeleton
            width={350}
            height={500}
            baseColor="#e0e0e0"
            highlightColor="#f0f0f0"
            enableAnimation={true}
          />
        </h2>
      </div>
    );
  }

  if (error) {
    message.error("Error fetching course topics. Please try again later.");
  }

  return (
    <div>
      <div className="max-md:hidden rounded-lg h-[500px] flex flex-col overflow-y-auto scroll bg-gray-900 ">
        <div className="sm:p-4 ">
          <h2 className="text-xl text-right font-bold text-white max-md:mr-4">
            {total} Topics
          </h2>
        </div>
        <ul className="p-4 flex flex-col">
          {sortedTopics?.map((topic: Topic, index: number) => {
            const canAccess = canAccessTopic(sortedTopics, testResults, index);
            return (
              <Link
                key={topic.id}
                href={
                  canAccess
                    ? `/dashboard/overview/${slug}/topics?topicId=${topic.id}`
                    : "#"
                }
                onClick={(e) => {
                  if (!canAccess) {
                    e.preventDefault();
                    message.warning(
                      "You must pass the previous test to access this topic."
                    );
                  }
                }}
              >
                <li
                  className={`flex justify-between items-center px-4 py-[14px] rounded transition duration-300 ease-in-out ${
                    selectedTopicId === String(topic.id)
                      ? "bg-zinc-600"
                      : "hover:bg-zinc-600 mt-4"
                  } ${canAccess ? "" : "opacity-50 cursor-not-allowed"}`}
                  onClick={() => setSelectedTopicId(String(topic.id))}
                >
                  <span className="text-white">{`${index + 1}. ${
                    topic.attributes.topicname
                  }`}</span>
                  <span className="text-white ml-auto">
                    {topic.attributes.duration}
                  </span>
                  {!canAccess && <span className="ml-4 text-gray-400">🔒</span>}
                  
                </li>
              </Link>
            );
          })}
        </ul>
      </div>
      <div className="flex items-center gap-3 sm:mt-6 w-full justify-between">
        <div className="flex flex-col">
          <div className="flex items-center justify-between font-bold">
            <h2>Progress</h2>
            <span>{`${Math.round(progress)}%`}</span>
          </div>
          <div className="mt-1 flex flex-row space-x-4 items-center">
            <div className="sm:w-48 w-60 h-4 bg-gray-300 flex flex-row">
              <div
                className="h-full bg-[#1C4E85]"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 mt-4 font-bold">
          <CiShare2 className="ml-2 text-[20px]" />
          <h1>Share</h1>
        </div>
      </div>
    </div>
  );
};

export default TopicsCard;
