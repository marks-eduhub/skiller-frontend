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
  const maxCardsPerPage = 3; // Maximum number of cards to display per page
  const [startIndex, setStartIndex] = useState(0);

  const handleNextPage = () => {
    const newStartIndex = startIndex + maxCardsPerPage;
    setStartIndex(newStartIndex >= products.length ? 0 : newStartIndex);
  };

  return (
    <div className=" bg-white shadow-lg rounded-lg overflow-hidden mx-6 relative">
      <div className="w-full h-full flex flex-row items-center justify-center overflow-hidden">
        <div className="flex p-4">
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

export default ProductContainer;
