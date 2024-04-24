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
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-64">
        <SideNav />
      </div>

      <div className="flex-grow  md:overflow-y-auto md:p-12">
        <div className="">
          <Navbar />

          <div className="flex-grow flex">
            <div className="mr-6">
              {" "}
              {/* Added margin to create space */}
              <VideoCard />
            </div>
            <div className="">
              <TopicsCard />
            </div>
          </div>
        </div>
        <div className="border-t border-gray-500 flex-grow"></div>

        <div className="">
          <Tabs />
        </div>
        <div className="p-6">
          <SimilarCourses courses={similarCoursesData} />
        </div>

        <div className="p-6">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default NewPage;
