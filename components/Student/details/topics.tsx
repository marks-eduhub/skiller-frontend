import React from "react";

const TopicsCard: React.FC = () => {
  const topics = [
    { name: "Topic 1", time: "5:00" },
    { name: "Topic 2", time: "5:00" },
    { name: "Topic 3", time: "5:00" },
    { name: "Topic 4", time: "5:00" },
    { name: "Topic 5", time: "5:00" },
    { name: "Topic 6", time: "5:00" },
    { name: "Topic 7", time: "5:00" },
    { name: "Topic 8", time: "5:00" },
    { name: "Topic 9", time: "5:00" },
    { name: "Topic 10", time: "5:00" },
    { name: "Topic 11", time: "5:00" },
    { name: "Topic 12", time: "5:00" },
  ];

  return (
    <div>
      <div className="topics-card h-[370px] max-md:h-[400px] shadow-md flex flex-col overflow-y-auto scroll bg-[#282828] ">
        <div className="sm:p-4 ">
          <h2 className="text-xl text-right font-bold text-white max-md:mr-4">
            {topics.length} Topics
          </h2>
        </div>
        <ul className="p-4 flex flex-col">
          {topics.map((topic, index) => (
            <li
              key={index}
              className="flex justify-between items-center px-4 py-3 rounded hover:bg-zinc-600 transition duration-300 ease-in-out"
            >
              <span className="text-white">{`${index + 1}. ${
                topic.name
              }`}</span>
              <span className="text-white ml-auto">{topic.time}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-4 font-bold text-white">
        <h2>Progress</h2>
      </div>
      <div className="mt-1 flex flex-row space-x-4 items-center">
        <div className="w-80 h-4 bg-gray-300 flex flex-row">
          <div className="h-full bg-[#1C4E85]" style={{ width: "30%" }}></div>
        </div>
        <span className="text-white">30%</span>
      </div>
    </div>
  );
};

export default TopicsCard;
