import React from "react";
import Image from "next/image";
import { Expectation, Topic } from "@/lib/types";


interface CourseOverviewProps {
  introduction: string;
  requirements: string;
  expectations: Expectation[];
  topics: Topic[];
}
const CourseOverview: React.FC<CourseOverviewProps> = ({introduction, requirements, expectations, topics,}) => {

  
  return (
    <div>
      <div className="flex flex-col gap-2">
        <h1 className="text-xl mt-10 font-semibold">Brief Introduction</h1>
        <p>{introduction }</p>
      </div>

      <h1 className="text-xl mt-10 font-semibold">What you&apos;ll learn</h1>
      {expectations.length > 0 ? (
        expectations.map((expectation, index) => (
          <div key={index}>
            {expectation.children.map((child, childIndex) => (
              <div key={childIndex}>
                {child.children.map((grandChild, grandChildIndex) => (
                  <div key={grandChildIndex} className="flex my-2">
                    <Image src="/tick1.svg" width={20} height={20} alt="tick" />
                    <p className="ml-2">{grandChild.text}</p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        ))
      ) : (
        <p>No learning expectations available.</p>
      )}

      <h1 className="text-xl mt-10 font-semibold">Requirements</h1>
      <p>{requirements}</p>

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
              <h1 className="font-semibold">
                {topic.attributes.duration}
              </h1>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseOverview;
