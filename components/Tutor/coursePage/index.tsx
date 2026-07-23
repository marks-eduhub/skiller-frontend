"use client";
import React, { useState } from "react";
import Overview from "./overview";
import Image from "next/image";
import Link from "next/link";
import Assessments from "./assessments";
import Analytics from "./analytics";
import Topics from "./topics";
import { useParams } from "next/navigation";
import { useFetchOverview } from "@/hooks/useCourseOverview";
import Loader from "@/components/Student/loader";
import { message } from "antd";
import { useFetchCourseRate, useFetchEnrolledCourses } from "@/hooks/useSubmit";
import { stripHtmlTags } from "@/lib/utility";
import { IoMdArrowRoundBack } from "react-icons/io";

const CourseOverview = () => {
  const [Tab, setTab] = useState("Course Overview");
  const { slug } = useParams();
  const courseDocumentId = String(slug);
  const { data, isLoading, error } = useFetchOverview(courseDocumentId);
  const { data: totalStudentsEnrolled } = useFetchEnrolledCourses(courseDocumentId);
  const { data: rateCourse } = useFetchCourseRate();

  const handleClicks = (tabName: string) => {
    setTab(tabName);
  };

  const courseRatings = rateCourse?.data || [];

  const courseId = data?.data?.id;
const courseRatingsForCurrentCourse = courseRatings.filter(
  (rating: any) => rating?.attributes?.course?.data?.id === courseId
);
const totalRatings = courseRatingsForCurrentCourse.length;
const averageRating =
  totalRatings > 0
    ? (courseRatingsForCurrentCourse.reduce(
        (sum: number, rating: any) => sum + (rating?.attributes?.score || 0),
        0
      ) / totalRatings).toFixed(1)
    : "No rating";
  const days = data?.data?.attributes?.days || 0;
  const learners = totalStudentsEnrolled?.length || 0;
  const coursename = data?.data?.attributes?.coursename;
  const description = data?.data?.attributes?.coursedescription;
  const courseImage =
    data?.data?.attributes?.card?.data?.attributes?.url || "/course-placeholder.svg";

  if (isLoading) {
    return (
      <div className="flex items-center  min-h-screen justify-center p-20">
        <Loader />
      </div>
    );
  }

  if (error) {
    message.error("Error displaying course information");
  }

  return (
    <div className="h-full w-full cursor-pointer px-1 py-6 sm:px-5 sm:py-2">
      <div className="mb-6 flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <Link
            href="/tutor/dashboard"
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-slate-950"
          >
            <IoMdArrowRoundBack className="h-5 w-5" />
            Back to dashboard
          </Link>
          <h1 className="mt-4 text-2xl font-semibold text-slate-950 sm:text-[30px]">
            {coursename}
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600 sm:text-[15px]">
            {stripHtmlTags(description)}
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-3 lg:w-[420px] lg:grid-cols-1 xl:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="text-[11px] uppercase tracking-[0.18em] text-slate-500">Rating</p>
            <p className="mt-2 text-xl font-semibold text-slate-950">⭐ {averageRating}</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="text-[11px] uppercase tracking-[0.18em] text-slate-500">Duration</p>
            <p className="mt-2 text-xl font-semibold text-slate-950">{days} day(s)</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="text-[11px] uppercase tracking-[0.18em] text-slate-500">Learners</p>
            <p className="mt-2 text-xl font-semibold text-slate-950">{learners}</p>
          </div>
        </div>
      </div>

      <div className="mb-8 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_16px_40px_rgba(15,23,42,0.06)]">
        <div className="relative h-[250px] w-full sm:h-[360px]">
          <Image
            src={courseImage}
            alt={coursename || "Course image"}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7">
            <div className="inline-flex rounded-full bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-slate-950">
              Course Overview
            </div>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-white/88">
              Review the course setup, manage topics, track learners, and move into edits without leaving this workspace.
            </p>
          </div>
        </div>
      </div>

      <div className="mb-8 flex gap-3 overflow-x-auto hide-scrollbar">
        <div
          className={`cursor-pointer ${
            Tab === "Course Overview"
              ? "inline-flex whitespace-nowrap rounded-full border border-black bg-black px-5 py-2 text-sm font-semibold text-white transition"
              : "inline-flex whitespace-nowrap rounded-full border border-slate-300 bg-white px-5 py-2 text-sm font-medium text-slate-600 transition hover:border-slate-900 hover:text-slate-950"
          }`}
          onClick={() => handleClicks("Course Overview")}
        >
          <h2>Course Overview</h2>
        </div>
        <div
          className={`cursor-pointer ${
            Tab === "Topics"
              ? "inline-flex whitespace-nowrap rounded-full border border-black bg-black px-5 py-2 text-sm font-semibold text-white transition"
              : "inline-flex whitespace-nowrap rounded-full border border-slate-300 bg-white px-5 py-2 text-sm font-medium text-slate-600 transition hover:border-slate-900 hover:text-slate-950"
          }`}
          onClick={() => handleClicks("Topics")}
        >
          <h2>Topics</h2>
        </div>
        <div
          className={`cursor-pointer ${
            Tab === "Assessments"
              ? "inline-flex whitespace-nowrap rounded-full border border-black bg-black px-5 py-2 text-sm font-semibold text-white transition"
              : "inline-flex whitespace-nowrap rounded-full border border-slate-300 bg-white px-5 py-2 text-sm font-medium text-slate-600 transition hover:border-slate-900 hover:text-slate-950"
          }`}
          onClick={() => handleClicks("Assessments")}
        >
          <h2>Assessments</h2>
        </div>
        <div
          className={`cursor-pointer ${
            Tab === "Analytics"
              ? "inline-flex whitespace-nowrap rounded-full border border-black bg-black px-5 py-2 text-sm font-semibold text-white transition"
              : "inline-flex whitespace-nowrap rounded-full border border-slate-300 bg-white px-5 py-2 text-sm font-medium text-slate-600 transition hover:border-slate-900 hover:text-slate-950"
          }`}
          onClick={() => handleClicks("Analytics")}
        >
          <h2>Analytics</h2>
        </div>
      </div>
      {Tab === "Topics" && <Topics />}

      {Tab === "Course Overview" && <Overview />}

      {Tab === "Assessments" && <Assessments />}
      {Tab === "Analytics" && <Analytics />}
    </div>
  );
};

export default CourseOverview;
