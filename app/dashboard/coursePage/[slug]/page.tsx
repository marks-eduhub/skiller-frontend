"use client";
import React from "react";
import { useFetchCourses } from "@/hooks/useCourses";
import { message } from "antd";
import Loader from "@/components/Student/loader";
import ProductContainer from "@/components/Student/courseCards/cardContainer";
import ProductCard from "@/components/Student/courseCards/courseCards";

const CoursecategoryPage = ({ params }: { params: { slug: string } }) => {
  const { slug } = params;

  const { data, isLoading, error } = useFetchCourses();

  if (isLoading) {
    return (
      <div className="absolute inset-0 z-50 flex items-center justify-center bg-opacity-80">
        <Loader />
      </div>
    );
  }

  if (error) {
    message.error("Failed to fetch category courses");
  }

  const filteredCourses = data?.data.filter((course: any) =>
    course.attributes.categories.data.some(
      (category: any) => category.attributes.slug === slug
    )
  );

  if (!filteredCourses || filteredCourses.length === 0) {
    return (
      <div className="flex items-center justify-center">
        No courses found in this category
      </div>
    );
  }

  const categoryTitle =
    filteredCourses[0]?.attributes.categories.data.find(
      (category: any) => category.attributes.slug === slug
    )?.attributes.coursecategories || "Courses";

  return (
    <div className="pl-3 pr-2 container mx-auto">
      <h1 className="mb-4 font-bold text-[20px] ml-2 mt-10">{categoryTitle}</h1>

      <div>
        <ProductContainer courses={filteredCourses} />
      </div>
    </div>
  );
};

export default CoursecategoryPage;
