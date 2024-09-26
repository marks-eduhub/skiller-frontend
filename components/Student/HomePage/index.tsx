"use client";
import React from "react";
import FeaturedProduct from "../courseCards/mainFeaturedCard";
import ProductContainer from "../courseCards/cardContainer";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { useCoursesByCategory } from "@/hooks/useCourses";
import constants from "./dummyData.json";

const HomePage: React.FC = () => {
  const router = useRouter();
  const handleNavigation = (category: string) => {
    router.push(`/dashboard/coursePage/${category}`);
  };

  const { data, isLoading, error } = useCoursesByCategory();
  console.log("data:", data);
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching courses</div>;

 
  const coursesByCategory = data?.data.reduce(
    (acc: { [key: string]: any[] }, course) => {
      const categories = course.attributes.categories.data;
      categories.forEach((category: any) => {
        const categorySlug = category.attributes.slug;
        const categoryTitle = category.attributes.coursecategories;

        if (!acc[categorySlug]) {
          acc[categorySlug] = { title: categoryTitle, courses: [] };
        }
        acc[categorySlug].courses.push(course);
      });
      return acc;
    },
    {}
  );

  return (
    <>
      <div className="flex flex-col sm:min-h-screen  mx-auto sm:pb-9 ">
        <h2 className="text-lg font-300 my-4">
          <b>Top Programming Courses</b>
        </h2>
        <FeaturedProduct course={constants.featuredProduct} />

        <div className="">
          {Object.entries(coursesByCategory || {}).map(
            ([categorySlug, categoryData], index) => (
              <div key={index} className="relative">
                <h2 className="text-lg font-300 my-4">
                  <div>
                    <div className="hidden md:block">
                      <b>{categoryData.title}</b>{" "}
                    </div>

                    <div
                      className="block md:hidden flex items-center justify-between"
                      onClick={() => handleNavigation(categorySlug)}
                    >
                      <b>{categoryData.title}</b>{" "}
                      <p className="text-gray-600 underline">See more</p>
                    </div>
                  </div>
                </h2>
                <ProductContainer courses={categoryData.courses} />

                <div
                  className=" max-md:hidden absolute right-4 top-1/2 transform -translate-y-1/2 rounded-full p-2 cursor-pointer ml-4"
                  onClick={() => handleNavigation(categorySlug)}
                >
                  <FontAwesomeIcon
                    icon={faChevronRight}
                    className="text-gray-600 "
                  />
                </div>
              </div>
            )
          )}
        </div>
      </div>
       {/* <div className="sm:hidden">
        <h2 className="text-lg font-semibold my-4">
          <b>Courses</b>
        </h2>
        <ProductContainer courses={constants.courses} />
      </div> */}
    </>
  );
};

export default HomePage;
