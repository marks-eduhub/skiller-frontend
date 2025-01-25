"use client";
import React, { useState } from "react";
import Overview from "./overview";
import Image from "next/image";
import Link from "next/link";
import Assessments from "./assessments";
import Analytics from "./analytics";
import TutorNav from "../dashboard/tutor-nav";
import Topics from "./topics";
import { useParams } from "next/navigation";
import { useFetchOverview } from "@/hooks/useCourseOverview";
import api from "@/lib/axios";

const CourseOverview = () => {
  const [Tab, setTab] = useState("Course Overview");
  const { slug } = useParams();
  const { data, isLoading, error } = useFetchOverview(Number(slug));
  console.log("dd", data);

  const handleClicks = (tabName: string) => {
    setTab(tabName);
  };

  const rating = data?.data?.attributes?.rating;
  const days = data?.data?.attributes?.days;
  const enrolledLearners = data?.data?.attributes?.users?.data || [];
  const learners = enrolledLearners.length;
  const coursename = data?.data?.attributes?.coursename;
  const description = data?.data?.attributes?.coursedescription;
  const tutorname = data?.data?.attributes?.tutor?.data?.attributes?.tutorname;
  const courseImage = data?.data?.attributes?.card?.data?.attributes?.url;
  const ImageUrl = courseImage ? `${api.defaults.baseURL}${courseImage}` : null;

  return (
    <div className="px-5 sm:py-0 py-7  h-full w-full cursor-pointer">
      <div className="flex flex-col sm:pr-0 pr-4  sm:mt-10 mt-20 sm:flex-row sm:justify-between sm:items-center">
        <div className="flex gap-2 items-center hidden md:flex">
          <Link href="/tutor/dashboard">
            <Image src="/backarrow.svg" alt="back" width={20} height={20} />
          </Link>
          <div className="flex pl-5 gap-1">
            <Image src="/star.svg" alt="star" width={15} height={15} />
            {rating}
          </div>
          <div className="flex pl-5 gap-1">
            <Image src="/clock.svg" alt="clock" width={15} height={15} />
            {days}
          </div>
          <div className="flex pl-5 gap-1">
            {learners}
            <Image src="/learners.svg" alt="learners" width={20} height={20} />
            <h1>Learner(s)</h1>
          </div>
        </div>
        <div className="justify-end">
          <TutorNav />
        </div>
      </div>

      <div
        className="w-full sm:h-[450px] h-[300px] relative rounded-2xl mt-10 mb-10 bg-no-repeat bg-center bg-cover"
        style={{ backgroundImage: `url(${ImageUrl})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60 z-10 rounded-2xl"></div>

        <div className="p-6 z-20 w-full relative sm:block hidden">
          <h1 className="text-white font-bold sm:text-[40px] sm:w-1/4 mb-10 text-[20px] sm:mx-0 mx-2">
            {coursename}
          </h1>
          <p className="text-white mt-6 sm:w-2/3 ">{description}</p>
        </div>

        <div className="p-6 z-20 w-full relative sm:hidden flex flex-col justify-end h-full">
          <h1 className="text-white font-bold text-[20px] ">{coursename}</h1>
          <p className="text-white font-bold text-[20px]  mt-10">{tutorname}</p>
        </div>
      </div>
      <p className="mt-4  mb-6 sm:hidden text-gray-600 font-bold text-[17px] mx-2 underline">
        See course description
      </p>

      <div className="flex sm:justify-evenly  sm:gap-0 gap-10 mb-10 sm:overflow-hidden items-center hide-scrollbar overflow-x-scroll">
        <div
          className={`cursor-pointer ${
            Tab === "Course Overview"
              ? "inline-block py-2 sm:px-12 px-6 text-center font-semibold text-black transition-colors duration-300 border-r-4 border-b-4 border-black shadow-md rounded-xl"
              : "sm:text-[20px] text-gray-600"
          }`}
          onClick={() => handleClicks("Course Overview")}
        >
          <h2>Course Overview</h2>
        </div>
        <div
          className={`cursor-pointer ${
            Tab === "Topics"
              ? "inline-block py-2 sm:px-12 px-6 text-center font-semibold text-black transition-colors duration-300 border-r-4 border-b-4 border-black shadow-md rounded-xl "
              : "sm:text-[20px] text-gray-600"
          }`}
          onClick={() => handleClicks("Topics")}
        >
          <h2>Topics</h2>
        </div>
        <div
          className={`cursor-pointer ${
            Tab === "Assessments"
              ? "inline-block py-2 sm:px-12 px-6 text-center font-semibold text-black transition-colors duration-300 border-r-4 border-b-4 border-black shadow-md rounded-xl"
              : "sm:text-[20px] text-gray-600"
          }`}
          onClick={() => handleClicks("Assessments")}
        >
          <h2>Assessments</h2>
        </div>
        <div
          className={`cursor-pointer ${
            Tab === "Analytics"
              ? "inline-block py-2 sm:px-12 px-6 text-center font-semibold text-black transition-colors duration-300 border-r-4 border-b-4 border-black shadow-md rounded-xl"
              : " sm:text-[20px] text-gray-600"
          }`}
          onClick={() => handleClicks("Analytics")}
        >
          <h2>Analytics</h2>
        </div>
        
        
      </div>
      {Tab === "Topics" && <Topics />}

      {Tab === "Course Overview" && <Overview />}

      {Tab === "Assessments" && <Assessments />}
      {Tab === "Analytics" && <Analytics />}
    </div>
  );
};

export default CourseOverview;
