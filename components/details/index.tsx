import React from "react";
import SideNav from "@/components/dashboadLayout/sidenav";
import Navbar from "@/components/dashboadLayout/NavBar";
import VideoCard from "./videocard";
import SimilarCourses from "./similar";
import similarCoursesData from "./data.json";
import TopicsCard from "./topics";
import Tabs from "./tabs";

const DetailsPage: React.FC = () => {
  return (
    <div className="">
      <div className=" flex-1 overflow-y-auto">
      <div className=" flex flex-col gap-6 md:overflow-y-auto bg-[#282828] p-4">
        <Navbar />
        <div className="video-area grid max-md:grid-cols-1 md:grid-cols-4fr-2fr gap-4">

            <VideoCard />

            <TopicsCard />
          </div>
      </div>
      <Tabs />
      <SimilarCourses courses={similarCoursesData} />
    </div>
    </div>
  );
};

export default DetailsPage;

