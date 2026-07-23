"use client";
import React, { useState } from "react";
import ProductCard from "../courseCards/courseCards";
import TutorCard from "../Tutorspage/tutorCard";
import { useLikedCourses } from "@/hooks/useLikedCourses";
import { useLikedTutors } from "@/hooks/useLikedTutors";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { message } from "antd";

type WishlistTab = "courses" | "tutors";

const Wishlist: React.FC = () => {
  const [tab, setTab] = useState<WishlistTab>("courses");

  const { data: courseData, isLoading: coursesLoading, error: coursesError } = useLikedCourses();
  const { data: tutorData, isLoading: tutorsLoading, error: tutorsError } = useLikedTutors();

  const wishlist = courseData?.data;
  const likedTutors = tutorData?.data;

  const isLoading = tab === "courses" ? coursesLoading : tutorsLoading;

  if (coursesError) {
    message.error("Error fetching liked courses. Please try again later.");
  }
  if (tutorsError) {
    message.error("Error fetching liked tutors. Please try again later.");
  }

  return (
    <div>
      <h2 className="font-semibold text-[20px] my-5">Your Wishlist</h2>

      <div className="mb-5 flex gap-2">
        <button
          onClick={() => setTab("courses")}
          className={`rounded-full px-4 py-1.5 text-sm transition ${
            tab === "courses"
              ? "bg-black text-white"
              : "bg-black/5 text-black/70 hover:bg-black/10"
          }`}
        >
          Courses
        </button>
        <button
          onClick={() => setTab("tutors")}
          className={`rounded-full px-4 py-1.5 text-sm transition ${
            tab === "tutors"
              ? "bg-black text-white"
              : "bg-black/5 text-black/70 hover:bg-black/10"
          }`}
        >
          Tutors
        </button>
      </div>

      {isLoading ? (
        <div className="ml-5 mt-5">
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
      ) : tab === "courses" ? (
        !wishlist || wishlist.length === 0 ? (
          <div className="mt-10 rounded-[24px] border border-dashed border-slate-300 bg-white/80 px-6 py-12 text-center sm:p-20">
            <p className="text-xl font-semibold text-slate-900">
              Your wishlist is empty.
            </p>
            <p className="mt-3 text-sm text-slate-600">
              Save courses you want to revisit later and they will be collected
              here.
            </p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-3 grid-cols-1 gap-2">
            {wishlist.map((item: any) => (
              <ProductCard key={item.id} course={item.attributes.course.data} />
            ))}
          </div>
        )
      ) : !likedTutors || likedTutors.length === 0 ? (
        <div className="mt-10 rounded-[24px] border border-dashed border-slate-300 bg-white/80 px-6 py-12 text-center sm:p-20">
          <p className="text-xl font-semibold text-slate-900">
            You haven&apos;t liked any tutors yet.
          </p>
          <p className="mt-3 text-sm text-slate-600">
            Tutors you like will be collected here so you can find them again
            quickly.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {likedTutors.map((item: any) => (
            <TutorCard key={item.id} tutor={item.attributes.tutor.data} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
