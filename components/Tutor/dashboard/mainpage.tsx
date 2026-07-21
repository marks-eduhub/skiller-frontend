"use client";
import React, { useState, useMemo } from "react";
import Image from "next/image";
import { StarFilledIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { useFetchTutorCourses } from "@/hooks/useCourses";
import { useAuthContext } from "@/components/AuthProvider/AuthContext";
import "react-loading-skeleton/dist/skeleton.css";
import { message } from "antd";
import Skeleton from "react-loading-skeleton";
import { useRouter } from "next/navigation";
import Loader from "@/components/Student/loader";
import { useFetchCourseRate } from "@/hooks/useSubmit";

const MainPage = () => {
  const { user } = useAuthContext();
  const router = useRouter();
  const username = user?.username;
  const { data, isLoading, error } = useFetchTutorCourses();
  const coursedata = data?.data;
  const [loadingCourseId, setLoadingCourseId] = useState<number | null>(null);

  const { data: rateCourse, isLoading: isLoadingRatings } = useFetchCourseRate();
  const courseRatings = rateCourse?.data || [];

  const getAverageRating = (courseId: number) => {
    const ratingsForCourse = courseRatings.filter(
      (rating: any) => rating?.attributes?.course?.data?.id === courseId
    );
    const totalRatings = ratingsForCourse.length;
    if (totalRatings === 0) return "No rating";
    const avg =
      ratingsForCourse.reduce(
        (sum: number, rating: any) => sum + (rating?.attributes?.score || 0),
        0
      ) / totalRatings;
    return avg.toFixed(1);
  };

  const handleCourseClick = (courseId: number) => {
    setLoadingCourseId(courseId);
    router.push(`/tutor/dashboard/courseoverview/${courseId}`);
  };

  const tutorCourses = coursedata?.filter(
    (course: any) =>
      course.attributes.tutor?.data?.attributes?.user?.data?.id === user?.id
  );

  if (isLoading) {
    return (
      <div className="ml-5">
        <h2 className="text-lg font-300 my-4">
          <Skeleton width={200} height={24} />
        </h2>
        <div>
          <Skeleton height={300} count={3} />
        </div>
      </div>
    );
  }

  if (error) {
    message.error("Error fetching courses. Please try again later.");
  }
  return (
    <div className="w-full px-0 py-4">
      <h1 className="mt-12 text-[20px] font-semibold sm:mt-0 sm:text-[22px]">
        Courses by Tutor {username}
      </h1>

      <div className="mt-8">
        {tutorCourses?.length === 0 ? (
          <div className="flex flex-col">
            <h1 className="mb-4 text-[24px] font-medium">Welcome!</h1>
            <p className="mb-5 text-[18px] text-gray-700">
              Educate others by creating a course
            </p>
            <div className="relative flex h-[260px] w-full max-w-[320px] cursor-pointer flex-col items-center justify-center rounded-xl bg-gray-100">
              <Link href="/tutor/dashboard/uploadCourse">
                <div className="flex items-center justify-center rounded-3xl bg-gray-300 px-7 py-4">
                  <Image src="/Vector.png" alt="plus" width={26} height={26} />
                </div>
                <p className="mt-5">Add a course</p>
              </Link>
            </div>
          </div>
        ) : (
          <div className="relative grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {tutorCourses?.map((course: any) => {
              const courseAttributes = course?.attributes;
              const image =
                courseAttributes?.card?.data?.attributes?.url ||
                "/placeholder.png";
              const averageRating = getAverageRating(course.id);

              return (
                <div
                  key={course.id}
                  className="relative cursor-pointer"
                  onClick={() => handleCourseClick(course.id)}
                >
                  {loadingCourseId === course.id && (
                    <div className="absolute inset-0 z-50 flex items-center justify-center rounded-lg bg-white/70 backdrop-blur-sm">
                      <Loader />
                    </div>
                  )}
                  <div className="overflow-hidden rounded-xl border border-gray-300 bg-white shadow-sm">
                    <div className="relative h-[190px]">
                      <Image
                        src={image}
                        alt={courseAttributes.coursename}
                        fill
                        className="object-cover object-center p-1"
                      />
                      <div className="absolute flex w-full items-center justify-between p-3">
                        <p className="rounded-full bg-white px-3 py-1 text-xs font-medium text-black">
                          Free
                        </p>
                      </div>
                    </div>
                    <div className="bg-[#F3F4F3] p-3 text-black">
                      <h1 className="line-clamp-2 min-h-[48px] font-medium">
                        {courseAttributes.coursename}
                      </h1>
                      <div className="mt-2 flex justify-between text-sm text-gray-700">
                        <p className="italic">{courseAttributes.duration}</p>
                        <div className="flex items-center gap-1">
                           ⭐
                          <p>
                            {isLoadingRatings ? (
                              <Skeleton width={30} />
                            ) : (
                              averageRating
                            )}
                          </p>
                        </div>
                      </div>
                      {/* <p
                        className={`rounded-md px-3 py-1 mt-2 ${
                          courseAttributes.status === "Draft"
                            ? "bg-[#FAECA6] w-[90px]"
                            : courseAttributes.status === "Published"
                            ? "bg-[#A6FAAE] w-[100px]"
                            : courseAttributes.status === "Unpublished"
                            ? "bg-[#FAA6A6] w-[130px]"
                            : "bg-[#A6D2FA] w-[140px]"
                        }`}
                      >
                        {courseAttributes.status}
                      </p> */}
                    </div>
                  </div>
                </div>
              );
            })}
            <div className="relative mt-5 flex h-[220px] w-full cursor-pointer flex-col items-center justify-center rounded-xl bg-gray-100 sm:mt-0">
              <Link href="/tutor/dashboard/uploadCourse">
                <div className="flex items-center justify-center rounded-3xl bg-gray-300 px-7 py-4">
                  <Image src="/Vector.png" alt="plus" width={26} height={26} />
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

export default MainPage;
