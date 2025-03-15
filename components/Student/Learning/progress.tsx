import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { message } from "antd";
import Image from "next/image";
import { ClockIcon, StarFilledIcon } from "@radix-ui/react-icons";
import api from "@/lib/axios";
import { useFetchUserCourses } from "@/hooks/useSubmit";
import { useAuthContext } from "@/components/AuthProvider/AuthContext";

const Progress = () => {
  const { user } = useAuthContext();
  const userId = Number(user?.id);
  const { data: courseProgress, isLoading, error } = useFetchUserCourses(userId);

  if (isLoading) {
    return (
      <div className="ml-5">
        <Skeleton height={300} count={3} baseColor="#e0e0e0" highlightColor="#f5f5f5" enableAnimation={true} />
      </div>
    );
  }

  if (error) {
    message.error("Error fetching course progress. Please try again later.");
  }

  if (!courseProgress || courseProgress.length === 0) {
    return (
      <p className="font-semibold flex items-center justify-center p-20 sm:text-[20px]">
        Start enrolling in courses to track your progress.
      </p>
    );
  }

  return (
    <div className="grid sm:grid-cols-3 grid-cols-1 gap-6 mt-10">
      {courseProgress.map((tracker: any) => {
        const course = tracker.attributes?.course?.data;
        if (!course) return null;

        const { id, attributes } = course;
        const imageUrl = attributes?.card?.data?.attributes?.url;
        const tutorname = attributes?.tutor?.data?.attributes?.tutorname;
        const coursename = attributes?.coursename;

        const progressData = tracker.attributes?.topic_progress_trackers?.data || [];
        const totalTopics = attributes?.topicname?.data?.length || 0;
        const completedTopics = progressData.length;
        const progressPercentage = totalTopics > 0 ? (completedTopics / totalTopics) * 100 : 0;

        return (
          <div key={id} className="border border-gray-400">
            <div className="rounded-lg flex relative overflow-hidden h-[180px]">
              <Image
                src={imageUrl || "/fallback.webp"}
                alt={coursename || "Course Image"}
                fill
                className="object-cover object-center p-1"
              />
              <div className="flex items-center absolute justify-between p-2 w-full">
                <p className="text-black bg-white px-4 py-0 rounded-full">Free</p>
              </div>
            </div>

            <div className="p-2 bg-[#F3F4F3] cursor-pointer text-black">
              <h3 className="font-semibold line-clamp-2 text-ellipsis mb-4">
                {course.attributes.coursename || "Course Name"}
              </h3>
              <p>{tutorname || "dragule swaib"}</p>

              <div className="w-full bg-gray-300 rounded-full h-[20px] border border-black relative mt-4">
                <div
                  className="bg-gray-700 h-[18px]  rounded-full"
                  style={{ width: `${progressPercentage}%` }}
                  />
                <div className="absolute inset-0 flex items-center justify-center text-white text-sm font-bold">
                  {`${progressPercentage}%` || 0}
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
