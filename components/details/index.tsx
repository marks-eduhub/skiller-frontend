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
      <Footer />
    </div>
    </div>
  );
};

export default DetailsPage;
// {activeTab === "Description" && (
//   <div className="flex flex-col md:flex-row gap-9">
//     <div
//       className="mb-6 md:mb-0 md:ml-9 mt-2 bg-[#a8a8a8] w-full md:w-1/2"
//       style={{ height: 600 }}
//     ></div>
//     <div className="flex flex-col w-full md:w-1/2">
//       <div className="flex items-center justify-between gap-4 mt-4 md:mt-0">
//         <button className="rounded-md bg-white px-10 py-2 hover:bg-gray-600 focus:outline-none flex items-center">
//           <BsBookmarkCheck className="text-lg" />
//           <span className="ml-2">Save</span>
//         </button>
//         <button className="rounded-md bg-white px-10 py-2 hover:bg-gray-600 focus:outline-none flex items-center">
//           <BsFillShareFill className="text-lg" />
//           <span className="ml-2">Share</span>
//         </button>
//       </div>
//       <div
//         className="bg-[#a8a8a8] flex flex-col justify-center items-center mt-7"
//         style={{ height: 540 }}
//       >
//         <h2 className="font-bold">Screenshots go here</h2>
//       </div>
//     </div>
//   </div>
// )}
