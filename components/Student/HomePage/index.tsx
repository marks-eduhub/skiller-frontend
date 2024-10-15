"use client";
import React from "react";
import FeaturedProduct from "../courseCards/mainFeaturedCard";
import ProductContainer from "../courseCards/cardContainer";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { useFetchCourses } from "@/hooks/useCourses";
import constants from "./dummyData.json";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { message } from "antd";
import { useRecentCourses } from "@/hooks/useRecentCourses";

const HomePage: React.FC = () => {
  const {
    data: recentlyAccessedCourses,
    isLoading: loadingRecent,
    error: recentError,
  } = useRecentCourses();
  const router = useRouter();

  const handleNavigation = (category: string) => {
    router.push(`/dashboard/coursePage/${category}`);
  };

  const { data, isLoading, error } = useFetchCourses();

  if (isLoading || loadingRecent) {
    return (
      <div>
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
    message.error("Error fetching courses. Please try again later.");
  }

  const coursesByCategory: {
    [key: string]: { title: string; courses: any[] };
  } = {};

  data?.data.forEach((course: any) => {
    const categories = course.attributes.categories.data;

    categories.forEach((category: any) => {
      const categorySlug = category.attributes.slug;
      const categoryTitle = category.attributes.coursecategories;

      if (!coursesByCategory[categorySlug]) {
        coursesByCategory[categorySlug] = { title: categoryTitle, courses: [] };
      }

      coursesByCategory[categorySlug].courses.push(course);
    });
  });
  return (
    <div className="flex flex-col sm:min-h-screen mx-auto sm:pb-9">
      <h2 className="text-lg font-300 my-4">
        <b>Top Programming Courses</b>
      </h2>
      <FeaturedProduct course={constants.featuredProduct} />

      <div>
        {Object.entries(coursesByCategory).map(
          ([categorySlug, categoryData], index) => (
            <div key={index} className="relative">
              <h2 className="text-lg font-300 my-4">
                <div>
                  <div className="hidden md:block">
                    <b>{categoryData.title}</b>
                  </div>

                  <div
                    className="block md:hidden flex items-center justify-between"
                    onClick={() => handleNavigation(categorySlug)}
                  >
                    <b>{categoryData.title}</b>
                    <p className="text-gray-600 underline">See more</p>
                  </div>
                </div>
              </h2>
              <ProductContainer courses={categoryData.courses} />

              <div
                className="max-md:hidden absolute right-4 top-1/2 transform -translate-y-1/2 rounded-full p-2 cursor-pointer ml-4"
                onClick={() => handleNavigation(categorySlug)}
              >
                <FontAwesomeIcon
                  icon={faChevronRight}
                  className="text-gray-600"
                />
              </div>
            </div>
          )
        )}
      </div>

      <div className="mt-8">
        <h1 className="mb-6 text-lg font-bold">Recently Accessed Courses</h1>

        {Array.isArray(recentlyAccessedCourses?.data) &&
        recentlyAccessedCourses?.data.length > 0 ? (
          <ProductContainer
            courses={recentlyAccessedCourses.data.map(
              (item: any) => item.attributes.course.data
            )}
          />
        ) : (
          <p className="font-semibold flex justify-center my-10 items-center text-[20px]">
            No recently accessed courses available.
          </p>
        )}
      </div>
    </div>
  );
};

export default HomePage;
