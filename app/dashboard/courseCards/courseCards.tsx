import React from "react";
import { PersonIcon, ClockIcon, StarFilledIcon } from '@radix-ui/react-icons';

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

interface ProductCardProps {
  product: Product;
  containerWidth: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  containerWidth,
}) => {
  return (
    <div
      className="flex-none shadow-lg bg-custom-grey rounded-lg overflow-hidden flex-shrink-0 mr-4 mb-4"
      style={{ width: containerWidth, height: '360px' }}
    >
      <div className="overflow-hidden rounded-lg border-8 pt-4 pr-4 pl-4 pb-2 border-white relative ">
        {/* Image */}
        <img
          src={product.image}
          alt={product.image}
          className="w-full object-cover "
        />
        {/* Text on the image */}
        <p className="absolute top-4 right-8 mt-2 ml-2 text-black bg-white px-4 py-0 rounded-t rounded-b">Free</p>
      </div>
      {/* Rest of the card content */}
      <div className="p-6 bg-black ">
        <div className="mb-4">
          <h3 className="text-gray-800 font-semibold text-white">{product.topic}</h3>
        </div>

        <div className="flex items-center mb-4">
          <PersonIcon className="w-6 h-6 text-white" />
          <p className="ml-2 text-gray-600 text-white">{product.instructor}</p>
          <p className="ml-8 flex-grow text-sm text-gray-500 text-white">{product.description}</p>
        </div>

        <div className="flex justify-between mt-3 gap-2">
          <div className="flex gap-1">
            <StarFilledIcon className="w-6 h-6 text-white" />
            <p className="text-gray-600 text-white">{product.rating}</p>
          </div>
          <div className="flex gap-1 mb-3">
            <ClockIcon className="w-6 h-6 text-white" />
            <p className="text-gray-600 text-white">{product.duration}</p>
          </div>
          <p className="text-gray-600 text-white">{product.level}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
