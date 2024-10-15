import React from "react";
import Image from "next/image";

interface Expectation {
  children: Array<{
    children: any; text: string 
}>;
}

interface Topic {
  id: number;
  attributes: {
    name: string;
    duration?: string; 
  };
}

interface CourseOverviewProps {
  introduction: string; 
  requirements: string;
  expectations: Expectation[];
  topics: Topic[];
}

const CourseOverview: React.FC<CourseOverviewProps> = ({
  introduction,
  requirements,
  expectations,
  topics,
}) => {
  return (
    <div>
      <div className="flex flex-col gap-2">
        <h1 className="text-xl mt-10 font-semibold">Brief Introduction</h1>
        <p>{introduction}</p>
      </div>

      <h1 className="text-xl mt-10 font-semibold">What you&apos;ll learn</h1>
      {expectations.map((expectation, index) => (
        <div key={index} className="flex flex-col my-2">
          {expectation.children.map((child, childIndex) => (
            child.children.map((grandChild:any, grandChildIndex:any) => (
              <div key={grandChildIndex} className="flex my-2">
                <Image src="/tick1.svg" width={20} height={20} alt="tick" />
                <p className="ml-2">{grandChild.children[0]?.text || "N/A"}</p>
              </div>
            ))
          ))}
        </div>
      ))}

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
            <div key={topic.id} className="flex items-center w-full justify-between p-6">
              <h1 className="font-semibold">{topic.attributes.name}</h1>
              <h1 className="font-semibold">{topic.attributes.duration || "N/A"}</h1>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

};

export default CourseOverview;
