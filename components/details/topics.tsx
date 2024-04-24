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
    { name: "Topic 10", time: "5:00" },
    { name: "Topic 10", time: "5:00" },


  ];

  return (
    <div className="topics-card   overflow-hidden flex flex-col ">
      {/* Card title */}
      <div className="p-4 ">
        <h2 className="text-xl text-right font-bold text-gray-800">10 Topics</h2>
      </div>

      {/* Topics list */}
      <ul className="p-4 flex flex-col gap-2 overflow-y-auto max">
        {topics.map((topic, index) => (
          <li key={index} className="flex justify-between items-center">
            <span className="text-gray-700">{topic.name}</span>
            <span className="text-gray-500 ml-auto">{topic.time}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopicsCard;
