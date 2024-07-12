"use client";
import React, { useState } from "react";
import SimilarCourses from "../details/similar";
import CourseOverview from "./courseOverview";
import CourseReview from "./courseReviews";
import similarCoursesData from "../details/data.json";
import reviews from "./data.json";

const Enroll = ({ course }: { course: string }) => {
  const [tab, setTab] = useState("Course Overview");
  const handleTab = (tabName: string) => {
    setTab(tabName);
  };
  return (
    <div className="">
      <div
        className="w-full relative rounded-lg h-[500px]"
        style={{
          backgroundImage: `url("/enroll.webp")`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0 video-overlay rounded-lg"></div>
        <div className="flex justify-between w-full absolute inset-0 mb-5 z-50">
          <div className="flex flex-col text-white p-4 self-end">
            <h1 className="font-bold text-[20px]">
              Fundamentals of UI/UX Design
            </h1>
            <p className="font-semibold">By Sarah Muwanguzi</p>
          </div>
          <div className="p-4 self-end">
            <button className="rounded-md px-7 py-2 bg-white text-black">
              Enroll today!
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-col mt-5 mb-3">
        <h1 className="font-semibold text-[18px]">
          Cost : <span className="font-bold text-[18px]">FREE</span>
        </h1>
        <h1 className="font-semibold text-[18px]">
          Duration :{" "}
          <span className="font-bold text-[18px]">2hours 40 minutes</span>
        </h1>

        <h1 className="font-semibold text-[18px]">
          Students enrolled : <span className="font-bold text-[18px]">112</span>
        </h1>
      </div>
      <div className="flex w-full justify-around items-center mt-10 ">
        <div
          className={`cursor-pointer flex sm:w-1/4 h-full ${
            tab === "Course Overview"
              ? "text-black transition-all duration-300 ease-in-out border-b-2 border-black"
              : "text-gray-500"
          } `}
          onClick={() => handleTab("Course Overview")}
        >
          <h1 className="font-semibold sm:text-[20px] text-[17px] sm:ml-20">Course Overview</h1>
        </div>

        <div
          className={`cursor-pointer items-center justify-center flex sm:w-1/4 ${
            tab === "Course Reviews"
              ? "text-black transition-all duration-300 ease-in-out border-b-2 border-black"
              : "text-gray-500"
          } `}
          onClick={() => handleTab("Course Reviews")}
        >
          <h1 className="font-semibold sm:text-[20px] text-[17px]">Course Reviews</h1>
        </div>
      </div>
      {tab === "Course Overview" ? <CourseOverview /> : <CourseReview reviews={reviews.Reviews}  />}
        <SimilarCourses courses={similarCoursesData} />
    </div>
  );
};

export default Enroll;
