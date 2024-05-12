import React, { useState } from "react";
import ProductCard from "./courseCards";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

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
  products: Product[];
}

const ProductContainer: React.FC<ProductContainerProps> = ({ products }) => {
  const containerWidth = "415px"; // Set the width of the container here
  const [maxCardsPerPage, setMaxCardsPerPage] = useState(3); // Maximum number of cards to display per page
  const [startIndex, setStartIndex] = useState(0);

  const handleNextPage = () => {
    const newStartIndex = startIndex + maxCardsPerPage;
    setStartIndex(newStartIndex >= products.length ? 0 : newStartIndex);
  };

  // Update maxCardsPerPage based on screen width
  const updateMaxCardsPerPage = () => {
    const screenWidth = window.innerWidth;
    if (screenWidth < 768) { // Adjust this value to your desired breakpoint
      setMaxCardsPerPage(1);
    } else {
      setMaxCardsPerPage(3);
    }
  };

  // Call the update function on mount and resize
  React.useEffect(() => {
    updateMaxCardsPerPage();
    window.addEventListener("resize", updateMaxCardsPerPage);
    return () => {
      window.removeEventListener("resize", updateMaxCardsPerPage);
    };
  }, []);

  return (
    <div className="bg-[#999] shadow-lg rounded-lg relative overflow-hidden mx-4 ">
      <div className="w-full h-full flex flex-row items-center justify-center overflow-hidden">
        <div className="flex p-4 cards">
          {products
            .slice(startIndex, startIndex + maxCardsPerPage)
            .map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                containerWidth={containerWidth}
              />
            ))}
        </div>
        <div
          className="absolute right-0 top-1/2 transform -translate-y-1/2 rounded-full p-2 cursor-pointer"
          onClick={handleNextPage}
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </div>
      </div>
    </div>
  );
};

export default ProductContainer