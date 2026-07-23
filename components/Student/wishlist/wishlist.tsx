"use client";
import React from "react";
import ProductCard from "../courseCards/courseCards";
import { useLikedCourses } from "@/hooks/useLikedCourses";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { message } from "antd";
const Wishlist: React.FC = () => {
  
  const { data, isLoading, error } = useLikedCourses();

  if (isLoading) {
    return (
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
    );
  }

  if (error) {
    message.error("Error fetching liked courses. Please try again later.");
  }

  const wishlist = data?.data;
  
  if (!wishlist || wishlist.length === 0) {
    return (
      <div className="mt-10 rounded-[24px] border border-dashed border-slate-300 bg-white/80 px-6 py-12 text-center sm:p-20">
        <p className="text-xl font-semibold text-slate-900">
          Your wishlist is empty.
        </p>
        <p className="mt-3 text-sm text-slate-600">
          Save courses you want to revisit later and they will be collected
          here.
        </p>
      </div>
    );
  } 
  

  return (
    <div>
      <h2 className="font-semibold text-[20px] my-5">Your Wishlist</h2>
      <div className="grid sm:grid-cols-3 grid-cols-1 gap-2">
        {wishlist.map((item:any) => {
          return (
            <ProductCard key={item.id} course={item.attributes.course.data} />
          );
        })}
      </div>
    </div>
  );
};

export default Wishlist;
