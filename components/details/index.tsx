import React from "react";
import SideNav from "@/app/dashboard/sidenav";
import Navbar from "@/app/dashboard/NavBar";
import VideoCard from "./videocard";
import Footer from "@/app/dashboard/Footer";
import SimilarCourses from "./similar";
import similarCoursesData from "./data.json";
import TopicsCard from "./topics";
import Tabs from "./tabs";

const NewPage: React.FC = () => {
  return (
    <div className="flex ">
        <div className="">
          <SideNav />
        </div>
        <div className="flex-grow">
          <div className=" md:overflow-y-auto color3">
            <Navbar />
            <div className="flex pl-12">

              <VideoCard />
              <div className="ml-6">
              <TopicsCard />
              </div>
            </div>
          </div>
          <div>
            <Tabs />
          </div>
          <div>
            <SimilarCourses courses={similarCoursesData} />
          </div>

          <div className="h-70">
            <Footer />
          </div>
        </div>
      </div>
  );
};

export default NewPage;
