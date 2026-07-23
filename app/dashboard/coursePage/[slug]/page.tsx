"use client";
import React from "react";
import { useFetchCourses } from "@/hooks/useCourses";
import { message } from "antd";
import Loader from "@/components/Student/loader";
import ProductContainer from "@/components/Student/courseCards/cardContainer";

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
      <div className="flex items-center justify-center px-4 py-16">
        <div className="rounded-[24px] border border-dashed border-slate-300 bg-white px-6 py-12 text-center shadow-sm">
          <p className="text-xl font-semibold text-slate-900">
            No courses found in this category.
          </p>
          <p className="mt-3 max-w-md text-sm text-slate-600">
            New courses will show up here as they are added and assigned to this
            category.
          </p>
        </div>
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
