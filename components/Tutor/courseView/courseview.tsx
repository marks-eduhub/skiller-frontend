"use client";
import React, { useState } from "react";
import TutorNav from "../dashboard/tutor-nav";
import overview from "./data.json";
import Image from "next/image";
import { StarFilledIcon } from "@radix-ui/react-icons";

interface Courseview{
  image: string;
  title: string;
  duration: string;
  rating: number;
  status: string;
}
const Courseview = () => {
  const [courses, setCourses] = useState<Courseview[]>([]);

  const addCourse = () => {
    const newCourse = overview[courses.length];
    if (newCourse) {
      setCourses([...courses, newCourse]);
    }
  };

  return (
    <div className="p-6 w-full">
      <TutorNav />
      <div className="flex justify-between sm:mt-10 mt-20">
        <h1 className="font-semibold text-[25px]">Courses</h1>
        <div
          className="bg-black px-6 py-2 rounded-md cursor-pointer"
          onClick={addCourse}
        >
          <p className="text-white">Add new courses</p>
        </div>
      </div>
      <div className="mt-10">
        {courses.length === 0 ? (
          <div className="flex flex-col ">
            <h1 className="font-medium text-[25px] mb-5">Welcome!</h1>
            <p className="text-[20px] mb-5">Educate others by creating a course</p>
            <div
              className="w-[30%] h-[400px] bg-gray-100 flex flex-col items-center justify-center relative cursor-pointer"
              onClick={addCourse}
            >
              <div className="rounded-3xl bg-gray-300 flex px-8 py-5 items-center justify-center">
                <Image src="/Vector.png" alt="plus" width={30} height={30} />
              </div>
              <p className="mt-5">Add a course</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {courses.map((course, index) => (
              <div key={index} className="mr-4 max-md:pb-10">
                <div className="border border-gray-400">
                  <div className="rounded-lg flex relative overflow-hidden h-[180px]">
                    <Image
                      src={course.image}
                      alt={course.title}
                      fill
                      className="object-cover object-center p-1"
                    />
                    <div className="flex items-center absolute justify-between p-2 w-full">
                      <p className="text-black bg-white px-4 py-0 rounded-t rounded-b">
                        Free
                      </p>
                    </div>
                  </div>
                </div>
                <div className="p-2 bg-[#F3F4F3] text-black">
                  <div className="flex flex-col mt-3 gap-2">
                    <h1 className="font-medium">{course.title}</h1>
                    <div className="flex justify-between w-full">
                      <p className="italic">{course.duration}</p>
                      <div className="flex gap-1 items-center">
                        <StarFilledIcon className="w-4 h-4 text-black" />
                        <p>{course.rating}</p>
                      </div>
                    </div>
                    <div>
                      <p
                        className={`rounded-md px-3 py-1 mb-3 ${
                          course.status === "Draft"
                            ? "bg-[#FAECA6] w-[90px]"
                            : course.status === "Published"
                            ? "bg-[#A6FAAE] w-[100px]"
                            : course.status === "Unpublished"
                            ? "bg-[#FAA6A6] w-[130px]"
                            : "bg-[#A6D2FA] w-[140px]"
                        }`}
                      >
                        {course.status}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div
              className="w-full h-[320px] bg-gray-100 flex flex-col items-center justify-center relative cursor-pointer"
              onClick={addCourse}
            >
              <div className="rounded-3xl bg-gray-300 flex px-8 py-5 items-center justify-center">
                <Image src="/Vector.png" alt="plus" width={30} height={30} />
              </div>
              <p className="mt-5">Add a course</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Courseview;
