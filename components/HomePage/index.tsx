
"use client";
import React, { useEffect, useState } from "react";

import ProductList from "../../components/courseCards/cardContentList";
import FeaturedProduct from "../../components/courseCards/mainFeaturedCard";
import ProductContainer from "../../components/courseCards/cardContainer";
import  constants  from "./dummyData.json";


// Usage of HorizontalCard component
const HomePage: React.FC = () => {
  useEffect(() => {
    localStorage.setItem("hideNavLayout", "false");
    // let hideNavLayout = localStorage.getItem("hideNavLayout");
  });
  return (
    <div className="">
      <div className="flex flex-col min-h-screen container mx-auto pb-9 rounded-2xl shadow-2xl  max-md:pl-2">
        <h2 className="text-lg font-semibold my-4">
          <b>Top Programming Courses</b>
        </h2>

        <FeaturedProduct product={constants.featuredProduct} />
        <h2 className="text-lg font-semibold my-4">
          <b>Featured Courses</b>
        </h2>
        {/* <ProductContainer products={products.slice(0 ,3)} /> */}
        <ProductContainer products={constants.courses} />

        <h2 className="text-lg font-semibold my-4">
          <b>Recently Accessed</b>
        </h2>
        <ProductContainer products={constants.courses} />
        {/* <ProductContainer products={products.slice(3, 6)} /> */}

        <h2 className="text-lg font-semibold my-4">
          <b>The Week&apos;s Picks</b>
        </h2>
        <ProductContainer products={constants.courses} />
        {/* <ProductContainer products={products.slice(6, 9)} /> */}

        <h2 className="text-lg font-semibold my-4">
          <b>New Arrivals</b>
        </h2>
        {/* <ProductContainer products={products.slice(9)} /> */}
        <ProductContainer products={constants.courses} />
      </div>
    </div>
  );
};
export default HomePage;


