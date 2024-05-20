"use client";
import React, { useEffect, useState } from "react";
import VideoCard from "./videocard";
import SimilarCourses from "./similar";
import similarCoursesData from "./data.json";
import TopicsCard from "./topics";
import Tabs from "./tabs";
import Navbar from "../dashboadLayout/NavBar";

const DetailsPage: React.FC = () => {
  useEffect(() => {
    localStorage.setItem("hideNavLayout", "true");
  });

  return (
    <div className=" flex-1 overflow-y-auto sm:container sm:mx-auto">
      <div className=" flex flex-col gap-6 md:overflow-y-auto bg-[#282828] p-4">
        <Navbar showGreeting={false} />
        <div className="grid grid-cols-6 gap-4 max-md:grid-cols-1 ">
          <div className="col-span-4">
            <VideoCard />
          </div>
          <div className="col-span-2">
            <TopicsCard />
          </div>
        </div>
      </div>
      
      <Tabs />
      <SimilarCourses courses={similarCoursesData} />
    </div>
  );
};

export default DetailsPage;
