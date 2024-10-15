import React from "react";
import Image from "next/image";

const Topics = () => {
  const topics = [
    "Topic 1: How to get started in design",
    "Topic 2: Figma Basics",
    "Topic 3: Layout grids, columns and rows",
    "Topic 4: Creating components and variants",
    "Topic 5: Creating onboarding screens",
    "Topic 6: How to make a navigation bar",
    "Topic 7: How to design for desktop",
    "Topic 8: Creating a design for case study",
  ];
  return (
    <div>
      {topics.map((topic, index) => (
        <div key={index}>
          <div className="relative w-full bg-[#E7E8EA] py-2 px-4">
            <div className="w-full h-[90px] mt-4 bg-gray-700 pt-7">
              <div className=" flex items-center justify-between px-4">
                <h1 className="text-white">{topic}</h1>
              </div>
            </div>
          </div>
         
        </div>
      ))}
      <div className="relative w-full bg-[#E7E8EA] pt-2 pb-4 px-4 mb-4">
        <div className="w-full h-[90px] mt-4 gap-2 bg-gray-300  flex items-center justify-center cursor-pointer">
          <Image src="/pluss.svg" alt="plus" width={20} height={20} />
          <h1 className="text-black text-[20px]">Add a topic</h1>
        </div>
      </div>
    </div>
  );
};

export default Topics;

