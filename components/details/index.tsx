import React from "react";
import SideNav from "@/app/dashboard/sidenav";
import Navbar from "@/app/dashboard/NavBar";
import VideoCard from "./videocard";
import Footer from "@/app/dashboard/Footer";
import SimilarCourses from "./similar";
import similarCoursesData from "./data.json";
import TopicsCard from "./topics";
import Tabs from "./tabs";

const DetailsPage: React.FC = () => {
  return (
    <div className="container mx-auto">
      <div className=" flex-1 overflow-y-auto">
      <div className=" flex flex-col gap-6 md:overflow-y-auto bg-[#282828] p-4 ">
        <Navbar />
        <div className="video-area">
            <VideoCard />

            <TopicsCard />
          </div>
      </div>
      <Tabs />
      <SimilarCourses courses={similarCoursesData} />
      <Footer />
    </div>
    </div>
  );
};

export default DetailsPage;
