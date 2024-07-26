"use client";
import React, { useState } from "react";
import Curriculum from "./curriculum";
import Overview from "./overview";
import Image from "next/image";
import Link from "next/link";
import Assessments from "./assessments";
import Analytics from "./analytics";
import TutorNav from "../dashboard/tutor-nav";

const CoursePage = () => {
  const [Tab, setTab] = useState("Course Overview");
  const handleClicks = (tabName: string) => {
    setTab(tabName);
  };
  return (
    <div className="px-5 sm:py-0 py-7  h-full w-full cursor-pointer">
      <div className="flex flex-col sm:pr-0 pr-4  sm:mt-10 mt-20 sm:flex-row sm:justify-between sm:items-center">
        <div className="flex gap-2 items-center ">
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
        className="w-full h-[450px] relative rounded-2xl mt-10 mb-10 bg-no-repeat bg-center bg-cover"
        style={{ backgroundImage: `url("/keyboard.webp")` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60 z-10 rounded-2xl"></div>
        <div className="p-6 z-20 w-full relative">
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
      </div>

      <div className="flex sm:justify-evenly  sm:gap-0 gap-10 mb-10 sm:overflow-hidden items-center overflow-x-auto">
        <div
          className={`cursor-pointer ${
            Tab === "Course Overview"
              ? "inline-block py-2 px-12 text-center font-semibold text-black transition-colors duration-300 border-r-4 border-b-4 border-black shadow-md rounded-md"
              : "sm:text-[20px] text-gray-600"
          }`}
          onClick={() => handleClicks("Course Overview")}
        >
          <h2>Course Overview</h2>
        </div>
        <div
          className={`cursor-pointer ${
            Tab === "Curriculum"
              ? "inline-block py-2 px-12 text-center font-semibold text-black transition-colors duration-300 border-r-4 border-b-4 border-black shadow-md rounded-md "
              : "sm:text-[20px] text-gray-600"
          }`}
          onClick={() => handleClicks("Curriculum")}
        >
          <h2>Curriculum</h2>
        </div>
        <div
          className={`cursor-pointer ${
            Tab === "Assessments"
              ? "inline-block py-2 px-12 text-center font-semibold text-black transition-colors duration-300 border-r-4 border-b-4 border-black shadow-md rounded-md"
              : "sm:text-[20px] text-gray-600"
          }`}
          onClick={() => handleClicks("Assessments")}
        >
          <h2>Assessments</h2>
        </div>
        <div
          className={`cursor-pointer ${
            Tab === "Analytics"
              ? "inline-block py-2 px-12 text-center font-semibold text-black transition-colors duration-300 border-r-4 border-b-4 border-black shadow-md rounded-md"
              : " sm:text-[20px] text-gray-600"
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
