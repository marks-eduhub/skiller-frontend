"use client";
import React, { useEffect, useState } from "react";

import ProductList from "../../components/courseCards/cardContentList";
import FeaturedProduct from "../../components/courseCards/mainFeaturedCard";
import ProductContainer from "../../components/courseCards/cardContainer";
import constants from "./dummyData.json";
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
const HomePage: React.FC = () => {
  const router = useRouter();
  const handleNavigation = (category: string) => {
    router.push(`/dashboard/coursePage/${category}`);
  };

  const categories = [
    { title: 'Featured Courses', category: 'featuredCourses' },
    { title: 'Recently Accessed', category: 'recentCourses' },
    { title: 'The Week\'s Picks', category: 'weeksPicks' },
    { title: 'New Arrivals', category: 'newArrivals' },
  ];
  useEffect(() => {
    localStorage.setItem("hideNavLayout", "false");
  });

return (
    <>
    <div className="flex flex-col sm:min-h-screen container mx-auto pb-9 rounded-2xl shadow-2xl max-md:pl-2">
      <h2 className="text-lg font-semibold my-4">
        <b>Top Programming Courses</b>
      </h2>
      <FeaturedProduct course={constants.featuredProduct} />

      <div className="max-md:hidden">
      {categories.map((item, index) => (
          <div key={index} className="relative">
            <h2 className="text-lg font-semibold my-4">
              <b>{item.title}</b>
            </h2>
            <ProductContainer courses={constants.courses.filter(course => course.category === item.category)} />
            <div
              className="absolute right-4 top-1/2 transform -translate-y-1/2 rounded-full p-2 cursor-pointer"
              onClick={() => handleNavigation(item.category)}
            >
              <FontAwesomeIcon icon={faChevronRight} className="text-gray-600" />
            </div>
          </div>
        ))}
      </div>
    </div>
    

      <div className="sm:hidden">
        <h2 className="text-lg font-semibold my-4">
          <b>Courses</b>
        </h2>
        <ProductContainer courses={constants.courses} />
      </div>
    </>
  );
};
export default HomePage;
