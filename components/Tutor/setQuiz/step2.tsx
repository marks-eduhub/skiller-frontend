import { useFetchTopic } from "@/hooks/useSetQuiz";
import React, { useState } from "react";
import { message } from "antd";
import { useAuthContext } from "@/components/AuthProvider/AuthContext";
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
  courseId: string;
  passmark: number | "";
  setPassmark: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const { user } = useAuthContext();
  const userId = user?.id;
  const { data, isLoading, error } = useFetchTopic(
    courseId,
    Number(userId)
  );

  const [hours, setHours] = useState("");
  const [minutes, setMinutes] = useState("");
  const [seconds, setSeconds] = useState("");

  if (isLoading) {
    <div>
      <Loader />
    </div>;
  }

  if (error) {
    message.error("Error fetching topics. Please try again later.");
  }
  const handleTopicChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTopic(e.target.value);
  };

  const handleDurationChange = () => {
    const formattedDuration = `${(hours || "00").padStart(2, "0")}:${(
      minutes || "00"
    ).padStart(2, "0")}:${(seconds || "00").padStart(2, "0")}.000`;
    setDuration(formattedDuration);
  };

  return (
    <div className="rounded-lg sm:bg-gray-100 sm:border sm:mb-0 mb-5 sm:border-gray-100 py-6 sm:px-2">
      <div className="border-b border-gray-300 flex items-center justify-center">
        <h1 className="mb-2">Select Quiz Duration and Topic</h1>
      </div>
        <div className="flex items-center sm:w-[50%] w-full mt-6 mx-auto">
          <label htmlFor="duration" className="sm:mr-0 mr-2">Duration:</label>

          <input
            type="number"
            min="0"
            value={hours}
            onChange={(e) => setHours(e.target.value)}
            onBlur={() => {
              setHours((hours || "00").padStart(2, "0"));
              handleDurationChange();
            }}
            placeholder="HH"
            className="border rounded-md sm:ml-2 mr-2 border-black w-16 text-center bg-[#F9F9F9] px-3 py-2 outline-none"
          />
          <span>:</span>
          <input
            type="number"
            min="0"
            max="59"
            value={minutes}
            onChange={(e) => setMinutes(e.target.value)}
            onBlur={() => {
              setMinutes((minutes || "00").padStart(2, "0"));
              handleDurationChange();
            }}
            placeholder="MM"
            className="border rounded-md ml-2 mr-2 border-black w-16 text-center bg-[#F9F9F9] px-3 py-2 outline-none"
          />
          <span>:</span>
          <input
            type="number"
            min="0"
            max="59"
            value={seconds}
            onChange={(e) => setSeconds(e.target.value)}
            onBlur={() => {
              setSeconds((seconds || "00").padStart(2, "0"));
              handleDurationChange();
            }}
            placeholder="SS"
            className="border rounded-md ml-2 border-black w-16 text-center bg-[#F9F9F9] px-3 py-2 outline-none"
          />
        </div>

        <div className="flex  items-center  sm:w-[50%]  w-full mt-6 mx-auto">
          <label htmlFor="duration">Passmark</label>
          <input
            type="number"
            id="passmark"
            value={passmark === 0 ? "" : passmark}
            onChange={(e) => {
              const val = e.target.value;
              const num = Number(val);
              setPassmark(num > 0 ? num : 0);
            }}
            placeholder="e.g, 50"
            className="mt-1 px-4 py-2 ml-3 rounded-md w-full sm:w-[50%] border outline-none bg-gray-100  border-gray-200"
          />
        </div>

        <div className="flex  items-center  sm:w-[50%] w-full mt-6 mx-auto">
          <label htmlFor="topic">Topic</label>
          <select
            id="topic"
            value={topic}
            onChange={handleTopicChange}
            className="mt-1 px-4 py-2 rounded-md w-full sm:w-[55%] bg-gray-100 ml-5 border text-black border-gray-200 outline-none"
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
  );
};

export default Step2;
