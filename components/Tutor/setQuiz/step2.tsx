import { useFetchTopic } from "@/hooks/useSetQuiz";
import React from "react";
import { message } from "antd";
import { useAuthContext } from "@/Context/AuthContext";
import Loader from "@/components/Student/loader";
const Step2 = ({
  duration,
  setDuration,
  topic,
  setTopic,
  courseId,
  passmark,
  setPassmark,
}: {
  duration: string;
  setDuration: React.Dispatch<React.SetStateAction<string>>;
  topic: string;
  setTopic: React.Dispatch<React.SetStateAction<string>>;
  courseId: number | string;
  passmark: string;
  setPassmark: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const { user } = useAuthContext();
  const userId = user?.id;
  const { data, isLoading, error } = useFetchTopic(
    Number(courseId),
    Number(userId)
  );
 

  if (isLoading) {
      <div>
       <Loader/>
      </div>
    
  }

  if (error) {
    message.error("Error fetching topics. Please try again later.");
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
            placeholder="e.g, 30 minutes"
            className="mt-1 px-4 py-2 rounded-md w-full border border-gray-200"
          />
        </div>
        <div>
          <label htmlFor="duration">Passmark</label>
          <input
            type="text"
            id="passmark"
            value={passmark}
            onChange={(e) => setPassmark((e.target.value))}
            placeholder="e.g,50"
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
            <option value="">Select a topic</option>
            {Array.isArray(data?.data) &&
              data.data.map((topicData: any) => (
                <option
                  key={topicData.id}
                  value={topicData.id}
                  className="text-black"
                >
                  {topicData.attributes.topicname}
                </option>
              ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default Step2;
