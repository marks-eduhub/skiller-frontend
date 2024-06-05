import React from "react";
import SideBar from "../../components/Tutor/dashboard/sidebar";
import TutorNav from "@/components/Tutor/dashboard/tutor-nav";

const page = () => {
  return (
    

    <div className="flex h-screen items-center justify-center pr-8">
      <div className="flex flex-col items-center text-center">
        <h3 className="font-bold text-[190px] mt-20 text-transparent outline mb-20">
          WELCOME
        </h3>
        <div className="flex flex-col items-center justify-center pb-40">
          <h3 className="text-5xl mt-10">It is Lonely here</h3>
          <h3 className="text-5xl mt-10">
            Educate others by creating a course
          </h3>
          <h3 className="text-5xl mt-10">or get started here</h3>
        </div>
      </div>
    </div>
  );
};

export default page;
