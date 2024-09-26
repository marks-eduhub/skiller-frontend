"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

import ProductList from "../courseCards/cardContentList";
import FeaturedProduct from "../courseCards/mainFeaturedCard";
import ProductContainer from "../courseCards/cardContainer";
import constants from "./dummyData.json";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import Wishlist from "../Learning/wishlist";
const HomePage: React.FC = () => {
  const router = useRouter();
  const handleNavigation = (category: string) => {
    router.push(`/dashboard/coursePage/${category}`);
  };

  const categories = [
    { title: "Featured Courses", category: "featuredCourses" },
    { title: "Recently Accessed", category: "recentCourses" },
    { title: "The Week's Picks", category: "weeksPicks" },
    { title: "New Arrivals", category: "newArrivals" },
  ];
  useEffect(() => {
    localStorage.setItem("hideNavLayout", "false");
  });

  return (
    <>
      <div className="flex flex-col sm:min-h-screen  mx-auto sm:pb-9 ">
        <h2 className="text-lg font-300 my-4">
          <b>Top Programming Courses</b>
        </h2>
        <FeaturedProduct course={constants.featuredProduct} />

        <div className="">
          {categories.map((item, index) => (
            <div key={index} className="relative">
              <h2 className="text-lg font-300 my-4">
                <div>
                  <div className="hidden md:block">
                    <b>{item.title}</b>
                  </div>

                  <div
                    className="block md:hidden flex items-center justify-between"
                    onClick={() => handleNavigation(item.category)}
                  >
                    <b>{item.title}</b>
                    <p className="text-gray-600 underline">
                     See more
                    </p>
                  </div>
                </div>
              </h2>
              <ProductContainer
                courses={constants.courses.filter(
                  (course) => course.category === item.category
                )}
              />
               
              <div
                className=" hidden md:flex absolute right-4 top-1/2 transform -translate-y-1/2 rounded-full p-2 cursor-pointer ml-4"
                onClick={() => handleNavigation(item.category)}
              >
                <FontAwesomeIcon
                  icon={faChevronRight}
                  className="text-gray-600 "
                />
              </div>
            </div>
          ))}
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
