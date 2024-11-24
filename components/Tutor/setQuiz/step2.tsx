import { useFetchTopic } from "@/hooks/useSetQuiz";
import React from "react";
import {message} from "antd"
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
const Step2 = ({
  duration,
  setDuration,
  topic,
  setTopic,
}: {
  duration: string;
  setDuration: React.Dispatch<React.SetStateAction<string>>;
  topic: string;
  setTopic: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const { data, isLoading, error } = useFetchTopic();
  console.log("topic", data);
  if (isLoading) {
    return (
      <div>
        <h2 className="text-lg font-300 my-4 ">
          <Skeleton
            width={200}
            height={24}
            baseColor="#e0e0e0"
            highlightColor="#f0f0f0"
          />
        </h2>

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
    message.error("Error fetching courses. Please try again later.");
  }
  const handleTopicChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTopic(e.target.value);
  };
  return (
    <div className="rouded-lg bg-gray-100 border sm:mb-0 mb-5 border-gray-100 py-6 sm:px-2">
      <div className="border-b border-gray-300 flex items-center justify-center">
        <h1 className="mb-2">Select Quiz Duration and Topic</h1>
      </div>
      <div className="flex flex-col space-y-6 sm:w-[50%] w-full mt-6 mx-auto">
        <div>
          <label htmlFor="duration">Duration</label>
          <input
            type="text"
            id="duration"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            placeholder="e.g., 30 minutes"
            className="mt-1 px-4 py-2 rounded-md w-full border border-gray-200"
          />
        </div>
        <div>
          <label htmlFor="topic">Topic</label>
          <select
            id="topic"
            value={topic}
            onChange={handleTopicChange}
            className="mt-1 px-4 py-2 rounded-md w-full border text-black border-gray-200 outline-none"
          >
            <option value="" className="text-black">
              Select a topic
            </option>
            <div className="rounded-lg">
            {data?.data?.map(
              (topicData: {
                id: string;
                attributes: { topicname: string };
              }) => (
                <option
                  key={topicData.id}
                  value={topicData.id}
                  className="text-black"
                >
                  {topicData.attributes.topicname}
                </option>
              )
            )}
            </div>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Step2;
