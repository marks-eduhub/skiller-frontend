"use client";
import React, { useState } from "react";
import Overview from "./overview";
import Image from "next/image";
import Link from "next/link";
import Assessments from "./assessments";
import Analytics from "./analytics";
import TutorNav from "../dashboard/tutor-nav";
import Topics from "./topics";

const CoursePage = () => {
  const [Tab, setTab] = useState("Course Overview");
  const handleClicks = (tabName: string) => {
    setTab(tabName);
  };
  return (
    <div className="px-5 sm:py-0 py-7  h-full w-full cursor-pointer">
      <div className="flex flex-col sm:pr-0 pr-4  sm:mt-10 mt-20 sm:flex-row sm:justify-between sm:items-center">
        <div className="flex gap-2 items-center hidden md:flex">
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
        <div className="justify-end">
          <TutorNav />
        </div>
      </div>

      <div
        className="w-full sm:h-[450px] h-[300px] relative rounded-2xl mt-10 mb-10 bg-no-repeat bg-center bg-cover"
        style={{ backgroundImage: `url("/keyboard.webp")` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60 z-10 rounded-2xl"></div>

        <div className="p-6 z-20 w-full relative sm:block hidden">
          <h1 className="text-white font-bold sm:text-[50px] sm:w-1/4 mb-10 text-[20px] sm:mx-0 mx-2">
            FUNDAMENTALS OF DESIGN
          </h1>
          <p className="text-white mt-6">
            Lorem ipsum dolor sit amet consectetur. Orci faucibus proin interdum
            eleifend condimentum tellus. Purus ut rutrum ultrices malesuada
            purus tempor massa sagittis. Vulputate at ut vitae vitae vel
            odio.osuere tellus suspendisse.
          </p>
          <p className="text-white mt-6">
            A quisque metus maecenas diam viverra facilisis ultricies. Massa
            enim faucibus eu iaculis integer eget. Turpis ultricies faucibus
            elementum aliquet viverra eget enim scelerisque. Rhoncus diam amet
            et at ut tincidunt varius viverra.
          </p>
        </div>

        <div className="p-6 z-20 w-full relative sm:hidden flex flex-col justify-end h-full">
          <h1 className="text-white font-bold text-[20px] mx-2">
            FUNDAMENTALS OF DESIGN
          </h1>
          <p className="text-white font-bold text-[20px] mx-2">
            By Sarah Muwangunzi
          </p>
        </div>
      </div>
      <p className="mt-4  mb-6 sm:hidden text-gray-600 font-bold text-[17px] mx-2 underline">See course description</p>

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

export default CoursePage;
