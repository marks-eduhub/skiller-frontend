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
    <div className="topics-card shadow-md flex flex-col">
      {/* Card title */}
      <div className="p-4">
        <h2 className="text-xl text-right font-bold text-white">Topics</h2>
      </div>

      {/* Topics list */}
      <ul className="p-4 flex flex-col">
        {topics.map((topic, index) => (
          <li
            key={index}
            className="flex justify-between items-center px-4 py-3 rounded hover:bg-zinc-600 transition duration-300 ease-in-out"
          >
            <span className="text-white">{`${index + 1}. ${topic.name}`}</span>
            <span className="text-white ml-auto">{topic.time}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopicsCard;
