import React from "react";
import Image from "next/image";
import {Topic } from "@/lib/types";

interface CourseOverviewProps {
  introduction: string;
  requirements: string;
  expectations: string;
  topics: Topic[];
}
const CourseOverview: React.FC<CourseOverviewProps> = ({introduction,requirements,expectations,topics,}) => {
  const parseTextToList = (text: string)=> {
    if (!text) return [];
  
    const isBulletPointText = text.startsWith("*");
  
    if (isBulletPointText) {
      const items = text.split("\n").map(line => line.trim()).filter(line => line !== "");
      return items.map(item => ({ text: item }));
    }
  
    const items = text.split("\n").map(line => line.trim()).filter(line => line !== "");
    return items.map(item => ({ text: `* ${item}` }));
  };
  
  const parsedExpectations = parseTextToList(expectations);
  const parsedRequirements = parseTextToList(requirements);

  return (
    <div>
      <div className="flex flex-col gap-2">
        <h1 className="text-xl mt-10 font-semibold">Brief Introduction</h1>
        <p>{introduction}</p>
      </div>
      <h1 className="text-xl mt-10 font-semibold">What you&apos;ll learn</h1>
      {parsedExpectations.length > 0 ? (
        parsedExpectations.map((expectation, index) => (
          <div key={index} className="flex my-2">
            {/* <Image src="/tick1.svg" width={20} height={20} alt="tick" /> */}
            <p className="ml-2">{expectation.text}</p>
          </div>
        ))
      ) : (
        <p>No learning expectations available.</p>
      )}
      <h1 className="text-xl mt-10 font-semibold">Requirements</h1>
      {parsedRequirements.length > 0 ? (
        parsedRequirements.map((requirement, index) => (
          <p className="p-2" key={index}>{requirement.text}</p>
        ))
      ) : (
        <p>No requirements available.</p>
      )}
      <h1 className="text-xl mt-10 font-semibold mb-4">Course Content</h1>
      <div className="w-full h-auto border border-black">
        <div className="flex justify-between bg-gray-300 p-6 m-3">
          <h1 className="font-semibold">Course Topics</h1>
          <h1 className="font-semibold">Duration</h1>
        </div>
        <div className="divide-y divide-gray-300">
          {topics.map((topic) => (
            <div
              key={topic.id}
              className="flex items-center  cursor-pointer w-full justify-between p-6"
            >
              <h1 className="font-semibold">{topic.attributes.name}</h1>
              <h1 className="font-semibold">{topic.attributes.duration}</h1>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseOverview;
