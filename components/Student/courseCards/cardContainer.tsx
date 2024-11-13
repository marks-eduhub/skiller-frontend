import React from "react";
import ProductCard from "./courseCards";
import Link from "next/link";
import { Course, courseDetail } from "@/lib/types";

interface ProductContainerProps {
  courses: Course[]; 
}

const ProductContainer: React.FC<ProductContainerProps> = ({ courses }) => {
  return (
    <>
      <div className="relative pl-0 container mx-auto max-md:hidden">
        <div className="grid sm:grid-cols-3 w-full my-4 gap-6">
          {courses.slice(0,3).map((course) => (
            <Link key={course.id} href={`/dashboard/overview/${course.id}`}>
              
              <ProductCard course={course} />
            </Link>
          ))}
        </div>
      </div>

      <div className="w-full h-full flex items-center justify-center bg-transparent rounded-lg relative sm:hidden">
        <div className="grid grid-cols-2 w-full mt-3 mb-4 pb-2 mx-auto">
          {courses.slice(0, 2).map((course) => (
            <Link key={course.id} href={`/dashboard/courseoverview/${course.id}`}>
              <ProductCard course={course} />
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default ProductContainer;
