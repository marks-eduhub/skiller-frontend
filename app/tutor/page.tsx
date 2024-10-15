import React from "react";
import SideBar from "../../components/Tutor/dashboard/sidebar";
import TutorNav from "@/components/Tutor/dashboard/tutor-nav";
import Link from "next/link";

const page = () => {
  return (
    <div className="p-5 sm:pt-5">
      <TutorNav />

        <div className="flex flex-col items-center text-center justify-center sm:pr-8 sm:pt-20">
          <h3 className="font-bold sm:text-[150px] text-[50px] sm:pt-20 pt-40 text-transparent outline mb-20 ">
            WELCOME
          </h3>
          <div className="flex flex-col items-center justify-center sm:pb-20">
            <h3 className="sm:text-5xl text-[30px] sm:mt-10">its Lonely here</h3>
            <h3 className="sm:text-4xl text-[30px]  mt-10">
              Educate others by
              <Link
                href="/tutor/dashboard/courses"
                className="text-[#0000FF] ml-2 mr-2"
              >
                creating
              </Link>
              a course
            </h3>
            <h3 className="sm:text-4xl text-[30px] mt-10">
              or
              <Link
                href="/tutor/dashboard/courseview"
                className="text-[#0000FF] ml-2 mr-2"
              >
                get started here
              </Link>
            </h3>
          </div>
        </div>
      </div>
  );
};

export default page;
