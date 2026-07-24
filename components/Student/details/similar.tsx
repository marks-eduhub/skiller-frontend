"use client";
import React from "react";
import ProductContainer from "../courseCards/cardContainer";
import { useFetchCourses } from "@/hooks/useCourses";
import Loader from "../loader";
import { message } from "antd";

const SimilarCourses: React.FC = () => {
  const { data, isLoading, error } = useFetchCourses();
  const courses = data?.data || [];

  if (isLoading)
    return (
      <div className="absolute inset-0 z-50 flex items-center justify-center bg-opacity-80">
        <Loader />
      </div>
    );

  if (error) {
    message.error("Error fetching courses. Please try again later.");
  }

  const recentCourses = [...courses]
  .sort((a, b) =>  new Date(b.attributes.createdAt).getTime() - new Date(a.attributes.createdAt).getTime())
  .slice(0, 3);

  return (
    <div className="bg-white">
      <h2 className="text-lg font-semibold pt-10">
        <b>Similar Courses</b>
      </h2>

      <ProductContainer courses={recentCourses} imageHeightClass="h-[130px]" />
    </div>
  );
};

export default SimilarCourses;
