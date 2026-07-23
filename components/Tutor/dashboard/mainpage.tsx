"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useFetchTutorCourses } from "@/hooks/useCourses";
import { useAuthContext } from "@/components/AuthProvider/AuthContext";
import "react-loading-skeleton/dist/skeleton.css";
import { message } from "antd";
import Skeleton from "react-loading-skeleton";
import { useRouter } from "next/navigation";
import Loader from "@/components/Student/loader";
import { useFetchCourseRate } from "@/hooks/useSubmit";
import { HiPlus } from "react-icons/hi2";

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

  const handleCourseClick = (course: any) => {
    setLoadingCourseId(course.id);
    router.push(`/tutor/dashboard/courseoverview/${course.attributes.documentId}`);
  };

  const tutorCourses = coursedata?.filter(
    (course: any) =>
      course.attributes.tutor?.data?.attributes?.user?.data?.id === user?.id
  );
  const publishedCourses =
    tutorCourses?.filter(
      (course: any) => course?.attributes?.status?.toLowerCase() === "published"
    ).length || 0;
  const totalRatingsCount = tutorCourses?.reduce((sum: number, course: any) => {
    const courseId = course?.id;
    return (
      sum +
      courseRatings.filter(
        (rating: any) => rating?.attributes?.course?.data?.id === courseId
      ).length
    );
  }, 0) || 0;

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
      <section className="mt-2 overflow-hidden rounded-[24px] border border-slate-200 bg-white px-4 py-5 text-slate-950 shadow-[0_12px_30px_rgba(15,23,42,0.05)] sm:mt-0 sm:px-6">
        <div className="grid gap-4 lg:grid-cols-[1.25fr_0.95fr] lg:items-end">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-slate-500">
              Tutor Studio
            </p>
            <h1 className="mt-2 max-w-2xl text-xl font-semibold leading-tight sm:text-[30px]">
              Build, publish, and manage your courses from one workspace.
            </h1>
            <p className="mt-3 max-w-2xl text-sm text-slate-600 sm:text-[15px]">
              {username ? `${username}, ` : ""}
              manage your course catalog, watch engagement, and jump back into editing without digging through menus.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/tutor/dashboard/uploadCourse"
                className="rounded-full bg-black px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                Create New Course
              </Link>
              <Link
                href="/dashboard"
                className="rounded-full border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-900 transition hover:border-slate-900 hover:bg-slate-900 hover:text-white"
              >
                Return to Student View
              </Link>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
            <div className="rounded-[18px] border border-slate-200 bg-slate-50 p-3.5">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Courses</p>
              <h2 className="mt-2 text-2xl font-semibold">{tutorCourses?.length || 0}</h2>
              <p className="mt-1.5 text-xs text-slate-600">Total managed courses</p>
            </div>
            <div className="rounded-[18px] border border-slate-200 bg-slate-50 p-3.5">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Published</p>
              <h2 className="mt-2 text-2xl font-semibold">{publishedCourses}</h2>
              <p className="mt-1.5 text-xs text-slate-600">Live and visible now</p>
            </div>
            <div className="rounded-[18px] border border-slate-200 bg-slate-50 p-3.5">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Ratings</p>
              <h2 className="mt-2 text-2xl font-semibold">{totalRatingsCount}</h2>
              <p className="mt-1.5 text-xs text-slate-600">Reviews across your catalog</p>
            </div>
          </div>
        </div>
      </section>

      <div className="mt-8">
        {tutorCourses?.length === 0 ? (
          <div className="rounded-[28px] border border-dashed border-slate-300 bg-white/80 p-8 shadow-[0_12px_40px_rgba(15,23,42,0.06)]">
            <h1 className="mb-4 text-[28px] font-semibold text-slate-950">Welcome to your tutor workspace</h1>
            <p className="mb-6 max-w-xl text-[17px] text-slate-600">
              Start with your first course and this dashboard will turn into your command center for publishing, course edits, and learner activity.
            </p>
            <div className="relative flex h-[220px] w-full max-w-[300px] cursor-pointer flex-col items-center justify-center rounded-[24px] border border-slate-200 bg-[linear-gradient(180deg,_#ffffff_0%,_#f8fafc_100%)] px-5 text-center">
              <Link href="/tutor/dashboard/uploadCourse">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-slate-300 bg-white text-slate-950 shadow-sm">
                  <HiPlus className="h-6 w-6" />
                </div>
                <p className="mt-4 text-center text-sm font-medium text-slate-900 sm:text-base">Add your first course</p>
              </Link>
            </div>
          </div>
        ) : (
          <>
            <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">
                  Course Library
                </p>
                <h2 className="mt-2 text-2xl font-semibold text-slate-950">
                  Courses by Tutor {username}
                </h2>
              </div>
              <Link
                href="/tutor/dashboard/uploadCourse"
                className="inline-flex w-fit items-center rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm transition hover:border-slate-900 hover:bg-slate-900 hover:text-white"
              >
                Add Another Course
              </Link>
            </div>

          <div className="relative grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {tutorCourses?.map((course: any) => {
              const courseAttributes = course?.attributes;
              const image =
                courseAttributes?.card?.data?.attributes?.url ||
                "/course-placeholder.svg";
              const averageRating = getAverageRating(course.id);
              const courseStatus = courseAttributes?.status || "Draft";
              const statusStyles =
                courseStatus === "Published"
                  ? "bg-emerald-100 text-emerald-800"
                  : courseStatus === "Unpublished"
                  ? "bg-rose-100 text-rose-800"
                  : courseStatus === "Pending"
                  ? "bg-amber-100 text-amber-800"
                  : "bg-slate-200 text-slate-700";

              return (
                <div
                  key={course.id}
                  className="group relative cursor-pointer"
                  onClick={() => handleCourseClick(course)}
                >
                  {loadingCourseId === course.id && (
                    <div className="absolute inset-0 z-50 flex items-center justify-center rounded-lg bg-white/70 backdrop-blur-sm">
                      <Loader />
                    </div>
                  )}
                  <div className="overflow-hidden rounded-[28px] border border-slate-200/80 bg-white/90 shadow-[0_20px_50px_rgba(15,23,42,0.08)] transition duration-300 group-hover:-translate-y-1 group-hover:shadow-[0_26px_60px_rgba(15,23,42,0.14)]">
                    <div className="relative h-[210px]">
                      <Image
                        src={image}
                        alt={courseAttributes.coursename}
                        fill
                        className="object-cover object-center transition duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/55 via-slate-950/10 to-transparent" />
                      <div className="absolute flex w-full items-center justify-between p-4">
                        <p className="rounded-full bg-white px-3 py-1 text-xs font-medium text-black shadow-sm">
                          Free
                        </p>
                        <p className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyles}`}>
                          {courseStatus}
                        </p>
                      </div>
                    </div>
                    <div className="bg-[linear-gradient(180deg,_#ffffff_0%,_#f8fafc_100%)] p-4 text-black">
                      <h1 className="line-clamp-2 min-h-[56px] text-lg font-semibold leading-7 text-slate-950">
                        {courseAttributes.coursename}
                      </h1>
                      <div className="mt-3 flex justify-between text-sm text-slate-600">
                        <p className="italic">{courseAttributes.duration || "Self paced"}</p>
                        <div className="flex items-center gap-1 rounded-full bg-amber-50 px-2 py-1 text-amber-800">
                          <span>★</span>
                          <p>
                            {isLoadingRatings ? (
                              <Skeleton width={30} />
                            ) : (
                              averageRating
                            )}
                          </p>
                        </div>
                      </div>
                      <div className="mt-4 flex items-center justify-between">
                        <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
                          Open course
                        </p>
                        <span className="rounded-full bg-slate-950 px-3 py-1 text-xs font-semibold text-white">
                          Manage
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
            <div className="relative mt-5 flex h-[220px] w-full cursor-pointer flex-col items-center justify-center rounded-[28px] border border-dashed border-slate-300 bg-white/75 shadow-[0_12px_40px_rgba(15,23,42,0.04)] sm:mt-0">
              <Link href="/tutor/dashboard/uploadCourse">
                <div className="flex items-center justify-center rounded-3xl bg-slate-950 px-7 py-4 shadow-lg">
                  <HiPlus className="h-6 w-6 text-white" />
                </div>
                <p className="mt-5 text-center font-medium text-slate-900">Add a course</p>
              </Link>
            </div>
          </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MainPage;
