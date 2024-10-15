import React from "react";
import ProductCard from "./courseCards";
import Link from "next/link";
import { Course } from "@/lib/types";
import { useFetchCourses } from "@/hooks/useCourseOverview";

// interface Product {
//   id: number;
//   instructor: string;
//   image: string;
//   rating: number;
//   duration: string;
//   description: string;
//   topic: string;
//   level: string;
// }

interface ProductContainerProps {
  // courses: Product[];
  courses:any
}

const ProductContainer: React.FC<ProductContainerProps> = ({ courses }) => {
  const containerWidth = "415px";
  const {data: routing, isLoading, error} = useFetchCourses()
  console.log("id",routing)
  const data: Course[] = Array.isArray(routing) ? routing : [];

  return (
    <>
      <div className="relative pl-0 container mx-auto max-md:hidden">
        <div className="grid sm:grid-cols-3 w-full my-4 gap-6">
          {data.map((course) => (
            <Link
              key={course.id}
              href={`/dashboard/courseoverview/${course.id}`}
            >
              
                <ProductCard course={course} containerWidth={containerWidth} />
              
            </Link>
          ))}
        </div>
      </div>

      <div className="w-full h-full flex items-center justify-center bg-transparent rounded-lg relative sm:hidden">
        <div className="grid grid-cols-2 w-full mt-3 mb-4 pb-2 mx-auto">
          {data.slice(0, 2).map((course) => (
            <Link
              key={course.id}
              href={`/dashboard/courseoverview/${course.id}`} 
            >
            
                <ProductCard course={course} containerWidth={containerWidth} />
              
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default ProductContainer;
