"use client";

import React, { useEffect } from "react";
import VideoCard from "./videocard";
import SimilarCourses from "./similar";
import similarCoursesData from "./data.json";
import TopicsCard from "./topics";
import Tabs from "./tabs";

const DetailsPage: React.FC = () => {
  useEffect(() => {
    localStorage.setItem("hideNavLayout", "true");
    return () => {
      localStorage.removeItem("hideNavLayout");  
    };
  }, []);

  return (
    <div className="flex-1 overflow-y-auto ">
        {/* <div className="grid grid-cols-6 gap-4 max-md:grid-cols-1  bg-gray-100 py-4  px-3">

          <div className="sm:col-span-4">
            <VideoCard />
          </div>
          <div className="sm:col-span-2">
            <TopicsCard />
          </div>
        </div> */}
        <div className="flex sm:flex-row max-md: flex-col gap-3 cursor-pointer bg-gray-100 py-4 px-3 ">
          <VideoCard />
          <TopicsCard />
        </div>
      <Tabs />
      <SimilarCourses courses={similarCoursesData} />
    </div>
  );
};

export default DetailsPage;
