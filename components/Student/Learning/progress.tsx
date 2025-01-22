import React from "react";
import { useFetchCourses } from "@/hooks/useCourses";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { message } from "antd";
import Image from "next/image";
import { ClockIcon, StarFilledIcon } from "@radix-ui/react-icons";
import api from "@/lib/axios";
import { useFetchTopics } from "@/hooks/useCourseTopics";



const Progress = () => {

  const { data: coursesData, isLoading, error } = useFetchCourses();
  const { data: topicsData } = useFetchTopics();
 

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
    message.error("Error fetching liked courses. Please try again later.");
  }

 
  if (!coursesData?.data || coursesData.data.length === 0) {
    return (
      <p className="font-semibold flex items-center justify-center p-20 text-[20px]">
        Start watching topic videos to track your course progress.
      </p>
    );
  }
  const courses = coursesData.data; 
  const topics = topicsData.data; 

  return (
    <div className="grid grid-cols-3 gap-6 mt-10">
      {courses.map((course: any) => {
        const courseId = course.id;

        const courseTopics = topics.filter(
          (topic: any) => topic.attributes.course.data.id === courseId
        );

        const totalTopics = courseTopics.length;
        const completedTopics = courseTopics.filter(
          (topic: any) => topic.attributes.isCompleted
        ).length;

        const progress = totalTopics
          ? Math.round((completedTopics / totalTopics) * 100)
          : 0;

        const imageUrl = course?.attributes?.card?.data?.attributes?.url;
        const tutorname = course?.attributes?.tutor?.data?.attributes?.tutorname;

        return (
          <div key={courseId} className="border border-gray-400">
            <div className="rounded-lg flex relative overflow-hidden h-[180px]">
              <Image
                src={
                  imageUrl ? `${api.defaults.baseURL}${imageUrl}` : "/cake.svg"
                }
                alt={course?.attributes?.alternativeText || "Course Image"}
                fill
                className="object-cover object-center p-1"
              />
              <div className="flex items-center absolute justify-between p-2 w-full">
                <p className="text-black bg-white px-4 py-0 rounded-full">
                  Free
                </p>
              </div>
            </div>

            <div className="p-2 bg-[#F3F4F3] cursor-pointer text-black">
              <h3 className="font-semibold line-clamp-2 text-ellipsis mb-4">
                {course.attributes.coursename || "Course Name"}
              </h3>
              <p>{tutorname || "dragule swaib"}</p>

              <div className="w-full bg-gray-300 rounded-full h-[20px] border border-black relative mt-4">
                <div
                  className="bg-gray-700 h-[18px] rounded-full"
                  style={{ width: `${progress}%` }}
                ></div>
                <div className="absolute inset-0 flex items-center justify-center text-white text-sm font-bold">
                  {`${progress}%`}
                </div>
              </div>
              <div className="flex justify-between mt-3 gap-2 text-[0.8rem]">
                <div className="flex gap-1">
                  <StarFilledIcon className="w-4 h-4 text-black" />
                  <p>{course.attributes.rating}</p>
                </div>
                <div className="flex gap-1">
                  <ClockIcon className="w-4 h-4 text-black" />
                  <p>{course.attributes.duration}</p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Progress;
