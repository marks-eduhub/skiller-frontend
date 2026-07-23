"use client";
import React, { useMemo } from "react";
import {useFetchTutorsPopulate } from "@/hooks/useCourses";
import Skeleton from "react-loading-skeleton";
import { message } from "antd";
import "react-loading-skeleton/dist/skeleton.css";
import TutorCard from "./tutorCard";


const Tutorspage = () => {
  const {data, isLoading, error} = useFetchTutorsPopulate()
  const tutors = useMemo(() => data?.data || [], [data]);

  if (isLoading) {
    return (
      <div className="ml-5">
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
    message.error("Error fetching tutors. Please try again later.");
  }

  return (
    <div className="sm:pl-10 py-5 sm:w-full">
      {tutors.length === 0 ? (
        <div className="mt-10 flex min-h-[50vh] items-center justify-center">
          <div className="rounded-[24px] border border-dashed border-slate-300 bg-white/80 px-6 py-12 text-center">
            <p className="text-xl font-semibold text-slate-900">
              No tutors available right now.
            </p>
            <p className="mt-3 max-w-md text-sm text-slate-600">
              Tutor profiles will appear here as instructors complete their
              setup and publish their teaching presence.
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {tutors?.map((tutor: any) => (
            <TutorCard key={tutor.id} tutor={tutor} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Tutorspage;
