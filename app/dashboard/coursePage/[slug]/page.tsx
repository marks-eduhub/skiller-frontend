"use client";
import React from "react";
import ProductCard from "../../../../components/Student/courseCards/courseCards";
import { useFetchCourses } from "@/hooks/useCourses";

const CoursecategoryPage = ({ params }: { params: { slug: string } }) => {
  const { slug } = params;

  const { data, isLoading, error } = useFetchCourses();
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching courses</div>;

  const filteredCourses = data?.data.filter((course: any) =>
    course.attributes.categories.data.some(
      (category: any) => category.attributes.slug === slug
    )
  );
if (!filteredCourses || filteredCourses.length === 0) {
  return <div>No courses found in this category</div>;
}
  const categoryTitle =
    filteredCourses[0]?.attributes.categories.data.find(
      (category: any) => category.attributes.slug === slug
    )?.attributes.coursecategories || "Courses";

  return (
    <>
      <div className="pl-3 pr-2 container mx-auto">
        <h1 className="mb-4 font-bold text-[20px] ml-2 mt-10">
          {categoryTitle} 
        </h1>

          <div className="grid sm:grid-cols-3 pl-4 py-3 mt-2 mb-4">
            {filteredCourses?.map((course: any) => (
              <div key={course.id} className="pr-4 mb-6">
                <ProductCard course={course}  />
              </div>
            ))}
          </div>
        </div>
    </>
  );
};

export default CoursecategoryPage;
