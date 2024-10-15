import React from "react";
import Image from "next/image";
import { useFetchOverview } from "@/hooks/useCourseOverview";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { message } from "antd";

const CourseOverview = () => {
  const { data: courseData, isLoading, error } = useFetchOverview();

  if (isLoading) {
    return (
      <div>
        <h2 className="text-lg font-300 my-4 ">
          <Skeleton
            width={200}
            height={24}
            baseColor="#e0e0e0"
            highlightColor="#f0f0f0"
          />
        </h2>
        <div>
          <Skeleton
            height={300}
            count={3}
            baseColor="#e0e0e0"
            highlightColor="#f5f5f5"
            enableAnimation={true}
          />
        </div>
      </div>
    );
  }

  if (error) {
    message.error("Error fetching course details.");
  }

  const details = courseData?.data[0] || {};

  const introduction = details.attributes?.introduction[0]?.children[0]?.text || "";
  const requirements =  details.attributes?.requirements[0]?.children[0]?.text || "";
  const expectations = details.attributes?.expectations[0]?.children || [];
  const topics = details.attributes?.topics?.data || [];

  return (
    <div className="">
      <div className="flex flex-col gap-2">
        <h1 className="text-xl mt-10 font-semibold">Brief Introduction</h1>
        <p>{introduction}</p>
      </div>

      <h1 className="text-xl mt-10 font-semibold">What you&apos;ll learn</h1>
      {expectations.map((expectation: any, index: number) => (
        <div key={index} className="flex my-2">
          <Image src="/tick1.svg" width={20} height={20} alt="tick" />
          <p className="ml-2">{expectation.children[0].text}</p>
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
          {topics.map((topic: any) => (
            <div
              key={topic.id}
              className="flex items-center w-full justify-between p-6"
            >
              <h1 className="font-semibold">{topic.attributes.name}</h1>
              <h1 className="font-semibold">
                {topic.attributes.duration || "N/A"}
              </h1>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseOverview;
