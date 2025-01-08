import React, { useState } from "react";
import { useRouter } from "next/navigation";
import ProductCard from "./courseCards";
import { Course } from "@/lib/types";
import Loader from "../loader";
interface ProductContainerProps {
  courses: Course[];
}

const ProductContainer: React.FC<ProductContainerProps> = ({ courses }) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleCourseClick = (path: string) => {
    setIsLoading(true);
    router.push(path);
  };

  return (
    <>
      <div className="relative pl-0 container mx-auto max-md:hidden">
        {isLoading && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-opacity-80">
            <div>
              <Loader />
            </div>
          </div>
        )}
        <div className="grid sm:grid-cols-3 w-full my-4 gap-6">
          {courses &&
            courses.length > 0 &&
            courses.slice(0, 3).map((course) =>
              course ? (
                <div
                  key={course.id}
                  className="cursor-pointer"
                  onClick={() =>
                    handleCourseClick(`/dashboard/overview/${course.id}`)
                  }
                >
                  <ProductCard course={course} />
                </div>
              ) : null
            )}
        </div>
      </div>

      <div className="w-full h-full flex items-center justify-center bg-transparent rounded-lg relative sm:hidden">
        <div className="grid grid-cols-2 w-full mt-3 mb-4 pb-2 mx-auto">
          {courses &&
            courses.length > 0 &&
            courses.slice(0, 2).map((course) =>
              course ? (
                <div
                  key={course.id}
                  className="cursor-pointer"
                  onClick={() =>
                    handleCourseClick(`/dashboard/overview/${course.id}`)
                  }
                >
                  <ProductCard course={course} />
                </div>
              ) : null
            )}
        </div>
      </div>
    </>
  );
};

export default ProductContainer;
