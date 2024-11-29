"use client";
import React from "react";
import TutorNav from "../dashboard/tutor-nav";
import Image from "next/image";
import { StarFilledIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { useFetchTutorCourses } from "@/hooks/useCourses";
import { useAuthContext } from "@/Context/AuthContext";
import api from "@/lib/axios";
import "react-loading-skeleton/dist/skeleton.css";
import { message } from "antd";
import Skeleton from "react-loading-skeleton";
interface Courseview {
  image: string | null;
  title: string;
  duration: string;
  rating: number;
  status: string;
}
const Courseview = () => {
  const { user } = useAuthContext();
  const userId = user?.id;
  const username = user?.username;
  const { data, isLoading, error } = useFetchTutorCourses(Number(userId));
  const coursedata = data?.data;
  if (isLoading) {
    return (
      <div>
        <h2 className="text-lg font-300 my-4 ">
          <Skeleton
            width={200}
            height={24}
            baseColor="#e0e0e0"
            highlightColor="#f0f0f0"
          />
        </h2>

        <div>
          <Skeleton
            height={300}
            count={3}
            baseColor="#e0e0e0"
            highlightColor="#f5f5f5"
            enableAnimation={true}
          />
        </div>
      </div>
    );
  }

  if (error) {
    message.error("Error fetching courses. Please try again later.");
  }
  return (
    <div className="p-6 w-full">
      <TutorNav />
      <h1 className="font-semibold text-[25px]">Courses</h1>

      <div className="mt-10">
        {coursedata?.length === 0 ? (
          <div className="flex flex-col ">
            <h1 className="font-medium text-[25px] mb-5">Welcome!</h1>
            <p className="text-[20px] mb-5">
              Educate others by creating a course
            </p>
            <div className="sm:w-[30%] h-[350px] bg-gray-100 flex flex-col items-center justify-center relative cursor-pointer">
              <Link href="/tutor/dashboard/uploadCourse">
                <div className="rounded-3xl bg-gray-300 flex px-8 py-5 items-center justify-center">
                  <Image src="/Vector.png" alt="plus" width={30} height={30} />
                </div>
                <p className="mt-5">Add a course</p>
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 sm:gap-6">
            {coursedata?.map((course: any, index: number) => {
              const courseAttributes = course?.attributes;
              const image =
                courseAttributes?.card?.data?.attributes?.url ||
                "/placeholder.png";
              const imageurl = `${api.defaults.baseURL}${image}`;
              return (
                <div key={index} className="mr-4 max-md:pb-10">
                  <div className="border border-gray-400">
                    <div className="rounded-lg flex relative overflow-hidden h-[180px]">
                      <Image
                        src={imageurl}
                        alt={courseAttributes.coursename}
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
                      <h1 className="font-medium">
                        {courseAttributes.coursename}
                      </h1>
                      <div className="flex justify-between w-full">
                        <p className="italic">{courseAttributes.duration}</p>
                        <div className="flex gap-1 items-center">
                          <StarFilledIcon className="w-4 h-4 text-black" />
                          <p>{courseAttributes.rating}</p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <p
                        className={`rounded-md px-3 py-1 mb-3 mt-2 ${
                          courseAttributes.status === "Draft"
                            ? "bg-[#FAECA6] w-[90px]"
                            : course.status === "Published"
                            ? "bg-[#A6FAAE] w-[100px]"
                            : course.status === "Unpublished"
                            ? "bg-[#FAA6A6] w-[130px]"
                            : "bg-[#A6D2FA] w-[140px]"
                        }`}
                      >
                        {courseAttributes.status}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
            <div className="w-full h-[320px] bg-gray-100 flex flex-col items-center justify-center relative cursor-pointer">
              <Link href="/tutor/dashboard/uploadCourse">
                <div className="rounded-3xl bg-gray-300 flex px-8 py-5 items-center justify-center">
                  <Image src="/Vector.png" alt="plus" width={30} height={30} />
                </div>
                <p className="mt-5">Add a course</p>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Courseview;
