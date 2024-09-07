import React from "react";
import { CiShare2 } from "react-icons/ci";
import { topics } from "../../../components/Student/details/tabs.json";
const TopicsCard: React.FC = () => {
  return (
    <div>
      <div className="h-auto max-md:h-[400px] max-md:hidden  rounded-lg flex flex-col overflow-y-auto scroll bg-gray-900 ">
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
      <div className="flex items-center  gap-3 mt-7 w-full justify-between">
        <div className="flex flex-col">
          <div className="flex items-center justify-between font-bold">
            <h2>Progress</h2>
            <span>30%</span>
          </div>

          <div className="mt-1 flex flex-row space-x-4 items-center">
            <div className="w-48 h-4 bg-gray-300 flex flex-row">
              <div
                className="h-full bg-[#1C4E85]"
                style={{ width: "30%" }}
              ></div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 mt-4 font-bold">
          <CiShare2  className=" ml-2 text-[20px]"/>
          <h1 >Share</h1>
        </div>
      </div>
    </div>
  );
};

export default TopicsCard;
