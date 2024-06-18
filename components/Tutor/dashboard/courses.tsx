"use client";
import React, { useState } from "react";
import Curriculum from "./curriculum";
import Overview from "./overview";
import Image from "next/image";
import TutorNav from "./tutor-nav";
import Link from "next/link";
import Assessments from "./assessments";
import Analytics from "./analytics";

const CoursePage = () => {
  const [Tab, setTab] = useState("Course Overview");
  const handleClicks = (tabName: string) => {
    setTab(tabName);
  };
  return (
    <div className="px-5 sm:py-0 py-7  h-full w-full cursor-pointer">
      
      <div className="flex flex-col sm:pr-0 pr-4  sm:mt-10 mt-20 sm:flex-row sm:justify-between sm:items-center">
        <div className="flex gap-2 items-center sm:mr-[450px]">
          <Link href="/tutor/dashboard">
            <Image src="/backarrow.svg" alt="back" width={20} height={20} />
          </Link>
          <div className="flex pl-5 gap-1">
            <h1>4.5</h1>
            <Image src="/star.svg" alt="star" width={15} height={15} />
            <h1>Ratings</h1>
          </div>
          <div className="flex pl-5 gap-1">
            <h1>27</h1>
            <Image src="/clock.svg" alt="clock" width={15} height={15} />
            <h1>Days</h1>
          </div>
          <div className="flex pl-5 gap-1">
            <h1>45</h1>
            <Image src="/learners.svg" alt="learners" width={20} height={20} />
            <h1>Learners</h1>
          </div>
        </div>
        <TutorNav />
      </div>

      <div
        className="w-full h-[350px] relative rounded-2xl mt-10 mb-10 bg-no-repeat bg-center bg-cover"
        style={{ backgroundImage: `url("/CAKE.svg")` }}
      >
        <div className="absolute inset-0 flex">
          <div className="flex-1 flex items-center justify-center">
            <h1 className="text-white font-bold sm:text-[30px] text-[20px] sm:mx-0 mx-2 ">
              CAKE MAKING IN 45 MINUTES
            </h1>
          </div>
          <div className="w-1/2 bg-black bg-opacity-70 rounded-2xl flex flex-col justify-center p-4">
            <div className="flex justify-end mb-auto">
              <div className="rounded-3xl w-[100px] h-[40px] border-2 flex items-center justify-center">
                <h1 className="text-white">Edit</h1>
              </div>
            </div>
            <div className="flex-1 flex justify-center mt-[95px]">
              <h1 className="text-white font-bold sm:text-[30px] text-[20px]">
                DESCRIPTION GOES HERE
              </h1>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-[100px] mb-10 sm:overflow-hidden items-center overflow-x-auto">
        <div
          className={`cursor-pointer ${
            Tab === "Course Overview"
              ? "bg-[#D9D9D9] rounded-sm sm:px-4 px-10 sm:py-1 py-3 "
              : "bg-[#F4F4F4] rounded-sm sm:px-4 px-10 sm:py-1 py-3"
          }`}
          onClick={() => handleClicks("Course Overview")}
        >
          <h2>Course Overview</h2>
        </div>
        <div
          className={`cursor-pointer ${
            Tab === "Curriculum"
              ? "bg-[#D9D9D9] rounded-sm sm:px-4 px-10 sm:py-1 py-3 "
              : "bg-[#F4F4F4] rounded-sm sm:px-4 px-10 sm:py-1 py-3"
          }`}
          onClick={() => handleClicks("Curriculum")}
        >
          <h2>Curriculum</h2>
        </div>
        <div
          className={`cursor-pointer ${
            Tab === "Assessments"
              ? "bg-[#D9D9D9] rounded-sm sm:px-4 px-10 sm:py-1 py-3 "
              : "bg-[#F4F4F4] rounded-sm sm:px-4 px-10 sm:py-1 py-3"
          }`}
          onClick={() => handleClicks("Assessments")}
        >
          <h2>Assessments</h2>
        </div>
        <div
          className={`cursor-pointer ${
            Tab === "Analytics"
              ? "bg-[#D9D9D9] rounded-sm sm:px-5 px-10 sm:py-1 py-3"
              : "bg-[#F4F4F4] rounded-sm sm:px-5 px-10 sm:py-1 py-3"
          }`}
          onClick={() => handleClicks("Analytics")}
        >
          <h2>Analytics</h2>
        </div>
      </div>
      {Tab === "Curriculum" && <Curriculum />}

      {Tab === "Course Overview" && <Overview />}

      {Tab === "Assessments" && <Assessments />}
      {Tab === "Analytics" && <Analytics />}
    </div>
  );
};

export default CoursePage;
