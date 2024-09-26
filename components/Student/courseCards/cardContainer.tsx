import React from "react";
import ProductCard from "./courseCards";
import { Course } from "@/lib/types";

interface ProductContainerProps {
  courses: Course[]; 
}

const ProductContainer: React.FC<ProductContainerProps> = ({ courses }) => {
  const containerWidth = "415px";

  return (
    <>
      <div className="relative pl-0 container mx-auto max-md:hidden">
        <div className="grid sm:grid-cols-3 w-full my-4 gap-6">
          {courses.slice(0, 3).map((course) => (
            <ProductCard
              key={course.id}
              course={course} 
              containerWidth={containerWidth}
            />
          ))}
        </div>
      </div>

      <div className="w-full h-full flex items-center justify-center bg-transparent rounded-lg relative sm:hidden">
        <div className="grid grid-cols-2 w-full mt-3 mb-4 pb-2 mx-auto">
          {courses.slice(0, 2).map((course) => (
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
