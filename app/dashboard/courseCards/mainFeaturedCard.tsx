

'use client';
import React from 'react';
import ProductDescriptionBar from './cardDescriptionBar';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

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

interface FeaturedProductProps {
  product: Product;
}

const FeaturedProduct: React.FC<FeaturedProductProps> = ({ product }) => {
  const images = [product.image, product.image, product.image];

  return (
    <div className="px-4 py-2 relative">
      <div className="top-gradient shadow-lg rounded-corners overflow-hidden mx-2 relative">
        <Carousel
          showThumbs={false}
          showArrows={false}
          infiniteLoop={true}
          autoPlay={true}
          showStatus={false}
        >
          {images.map((image, index) => (
            <div key={index} className="pt-8 pr-8 pl-8 pb-0 relative">
              <div className="relative">
                <img src={image} alt={product.image} className="w-full object-cover h-64 rounded-t-custom" />
                <p className="absolute top-3 right-4 bg-white px-4 py-0  rounded-tl-md rounded-tr-md ">Free</p>
              </div>

            </div>
          ))}
        </Carousel>
        <div className="relative">
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
