"use client";
import React from "react";
import ProductContainer from "../courseCards/cardContainer";
import { useFetchCourses } from "@/hooks/useCourses";

const SimilarCourses: React.FC = () => {
  const { data, isLoading, error } = useFetchCourses();


  if (isLoading) return <p>Loading similar courses...</p>;
  if (error) return <p>Failed to load similar courses</p>;

  return (

    <div className=" bg-white ">
      <h2 className="text-lg font-semibold pt-10">
        <b>Similar Courses</b>
      </h2>

      <ProductContainer courses={data?.data || []} />
      </div>
  );
};

export default SimilarCourses;
