"use client";
import React from "react";
import VideoCard from "./videocard";
import SimilarCourses from "./similar";
import similarCoursesData from "./data.json";
import TopicsCard from "./topics";
import Tabs from "./tabs";

const DetailsPage: React.FC = () => {
  return (
    <div className="flex-1 overflow-y-auto ">
      <div className="flex sm:flex-row max-md: flex-col gap-3 cursor-pointer sm:bg-gray-100 py-4 sm:px-3 ">
        <VideoCard />
        <TopicsCard />
      </div>
      <Tabs />
      <SimilarCourses  />
    </div>
  );
};

export default DetailsPage;
