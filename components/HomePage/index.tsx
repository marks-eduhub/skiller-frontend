"use client";
import React, { useEffect, useState } from "react";

import ProductList from "../../components/courseCards/cardContentList";
import FeaturedProduct from "../../components/courseCards/mainFeaturedCard";
import ProductContainer from "../../components/courseCards/cardContainer";
import constants from "./dummyData.json";
const HomePage: React.FC = () => {
  useEffect(() => {
    localStorage.setItem("hideNavLayout", "false");
  });
  return (
    <>
    <div className="">
      <div className="flex flex-col sm:min-h-screen container mx-auto pb-9  rounded-2xl shadow-2xl  max-md:pl-2">
        <h2 className="text-lg font-semibold my-4">
          <b>Top Programming Courses</b>
        </h2>
        <FeaturedProduct course={constants.featuredProduct} />
          <div className="max-md:hidden">
          <h2 className="text-lg font-semibold my-4">
            <b>Featured Courses</b>
          </h2>
          <ProductContainer courses={constants.courses} />

          <h2 className="text-lg font-semibold my-4">
            <b>Recently Accessed</b>
          </h2>
          <ProductContainer courses={constants.courses} />

          <h2 className="text-lg font-semibold my-4">
            <b>The Week&apos;s Picks</b>
          </h2>
          <ProductContainer courses={constants.courses} />

          <h2 className="text-lg font-semibold my-4">
            <b>New Arrivals</b>
          </h2>
          <ProductContainer courses={constants.courses} />
        </div>
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
