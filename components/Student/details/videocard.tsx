import React, { useState } from "react";
import { topics } from "../../../components/Student/details/tabs.json";
import Image from "next/image";
const VideoCard: React.FC = () => {
  const videoFilePath = "/Video1.mp4";
  const thumbnail = "/Thumb Nail.svg";
  const [selectedTopic, setSelectedTopic] = useState(topics[0]);
  const [showTopics, setShowTopics] = useState(false);

  const handleToggle = () => {
    setShowTopics(!showTopics);
  };

  const handleSelectTopic = (topic: any) => {
    setSelectedTopic(topic);
    setShowTopics(false);
  };

  return (
    <>
      <div className=" max-md:hidden relative w-full rounded-lg  ">
        {/* <video controls poster={thumbnail} className="w-full rounded-lg"> */}
        <video controls className="w-full rounded-lg">
          <source src={videoFilePath} type="video/mp4" />
        </video>

        <div className="text-left mt-4 text-black max-md:text-lg">
          <h2 className="text-md font-bold">
            Typescript Fundamentals in 20 days
          </h2>
          <p className="text-md max-md:mt-4">
            Michael Kizito : Software Engineer, Lecturer
          </p>
        </div>
      </div>

      <div className="sm:hidden w-full rounded-lg relative">
        <div className="flex items-center  mb-3 ">
          <h2 className="p-1 text-[19px] font-bold text-gray-600">
            {selectedTopic.name}
          </h2>
          <div onClick={handleToggle} className=" cursor-pointer">
            <Image
              src="/dropdown.svg"
              alt="arrow"
              width={18}
              height={18}
              className={`${
                showTopics ? "rotate-180 transition-all duration 0.3s" : ""
              }`}
            />
            {showTopics && (
              <div className="absolute top-12 left-0 z-40 text-white  bg-gray-900 rounded-lg shadow">
                {topics.map((topic, index) => (
                  <div
                    key={index}
                    className="px-8 py-3 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleSelectTopic(topic)}
                  >
                    {topic.name}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <video controls className="w-full rounded-lg ">
          <source src={videoFilePath} type="video/mp4" />
        </video>
       
        <div className="text-left mt-4 text-black max-md:text-lg">
          <h2 className="text-md font-bold">
            Typescript Fundamentals in 20 days
          </h2>
          <p className="text-md max-md:mt-4">
            Michael Kizito : Software Engineer, Lecturer
          </p>
        </div>
      </div>
    </>
  );
};

export default VideoCard;
