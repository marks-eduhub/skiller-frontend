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
  duration:string;
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
    <div className=" px-4 py-2 rounded-lg relative">
      <div className="top-gradient shadow-lg rounded-lg overflow-hidden mx-2 ">
        <Carousel
          showThumbs={false} 
          showArrows={false} 
          infiniteLoop={true} 
          autoPlay={true} 
          showStatus={false} 
        >
          {images.map((image, index) => (
            <div key={index}>
              <img src={image} alt={product.image} className="w-full object-cover rounded-lg h-64 pt-6 pr-6 pl-6 pb-0  " />

              {/* <div className="absolute top-2 right-2  bg-white text-black px-2 py-1 rounded">
                Free
              </div> */}
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
