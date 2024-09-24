"use client";
import React from "react";
import ProductContainer from "../courseCards/cardContainer";
type Course = {
  id: number;
  instructor: string;
  image: string;
  rating: number;
  duration: string;
  description: string;
  topic: string;
  level: string;
};
const SimilarCourses: React.FC<{ courses: Course[] }> = ({ courses }) => {
  return (
    <div className=" bg-white ">
      <h2 className="text-lg font-semibold pt-10">
        <b>Similar Courses</b>
      </h2>

      <ProductContainer courses={courses} />
    </div>
  );
};

export default SimilarCourses;
