import React, { useState } from "react";
import ProductCard from "./courseCards";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

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
  const [maxCardsPerPage, setMaxCardsPerPage] = useState(3); // Maximum number of cards to display per page
  const [startIndex, setStartIndex] = useState(0);

  const handleNextPage = () => {
    const newStartIndex = startIndex + maxCardsPerPage;
    setStartIndex(newStartIndex >= courses.length ? 0 : newStartIndex);
  };

  // Update maxCardsPerPage based on screen width
  const updateMaxCardsPerPage = () => {
    const screenWidth = window.innerWidth;
    if (screenWidth < 768) {
      setMaxCardsPerPage(1);
    } else {
      setMaxCardsPerPage(3);
    }
  };

  React.useEffect(() => {
    updateMaxCardsPerPage();
    window.addEventListener("resize", updateMaxCardsPerPage);
    return () => {
      window.removeEventListener("resize", updateMaxCardsPerPage);
    };
  }, []);

  return (
    <>
      <div className="relative flex px-4   mx-auto max-md:hidden">
  {/* <div className="bg-[#D9D9D9] shadow-lg rounded-lg relative overflow-hidden justify-center items-center"> */}
    <div className="flex mt-3 mb-4 pb-2 mr-4  ">
      {courses
        .slice(startIndex, startIndex + maxCardsPerPage)
        .map((course) => (
          <ProductCard
            key={course.id}
            course={course}
            containerWidth={containerWidth}
          />
        ))}
    </div>
  {/* </div> */}
</div>


      <div className="  shadow-lg rounded-lg relative  sm:hidden ">
        <div className="w-full h-full flex flex-col items-center justify-center bg-transparent ">
          <div className="flex flex-col w-full mt-2 mb-2">
            {courses.map((course) => (
              <ProductCard
                key={course.id}
                course={course}
                containerWidth={containerWidth}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductContainer;
