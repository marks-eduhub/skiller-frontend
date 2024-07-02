import React, { useState } from "react";
import ProductCard from "./courseCards";

interface Product {
  id: number;
  instructor: string;
  image: string;
  rating: number;
  duration: string;
  description: string;
  topic: string;
  level: string;
}

interface ProductContainerProps {
  courses: Product[];
}

const ProductContainer: React.FC<ProductContainerProps> = ({ courses }) => {
  const containerWidth = "415px";

  return (
    <>
      <div className="relative  pl-1 pr-6  container  mx-auto max-md:hidden">
        <div className=" mt-3  w-full grid grid-cols-1 sm:grid-cols-3  mb-4 pb-2 mr-4 gap-4 ">
          {courses.map((course) => (
            <ProductCard
              key={course.id}
              course={course}
              containerWidth={containerWidth}
            />
          ))}
        </div>
      </div>

      <div className="w-full h-full flex flex-col items-center justify-center bg-transparent  rounded-lg relative  sm:hidden">
        <div className="flex flex-col w-full mt-3 mb-4 pb-2 mx-auto  ">
          {courses.map((course) => (
            <ProductCard
              key={course.id}
              course={course}
              containerWidth={containerWidth}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default ProductContainer;
