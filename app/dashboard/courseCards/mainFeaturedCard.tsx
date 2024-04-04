// // FeaturedProduct.tsx
'use client';

 import ProductDescriptionBar from './cardDescriptionBar';

import React from 'react';

interface Product {
  id: number;
  instructor: string;
  image: string;
  rating: number;
  duration:string;
  description: string;
  topic: string;
  level: string;
}

interface FeaturedProductProps {
  product: Product;
}

const FeaturedProduct: React.FC<FeaturedProductProps> = ({ product }) => {
  return (
    <div className=" bg-gradient-to-b from-cyan-300 to-gray-700 px-4 py-2 rounded-lg" >
    <div className=" shadow-lg rounded-lg overflow-hidden mx-2 ">
      <img src={product.image} alt={product.image} className="w-full h-64 object-cover" />
      <div className="p-8 relative">
        
        <ProductDescriptionBar
          instructor={product.instructor}
          duration={product.duration}
          rating={product.rating}
          description={product.description}
          topic={product.topic}
          level={product.level}
        />
      </div>
    </div>
    </div>
  );
};

export default FeaturedProduct;

