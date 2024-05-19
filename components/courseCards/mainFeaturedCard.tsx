"use client";
import Image from "next/image";
import React from "react";
import ProductDescriptionBar from "./cardDescriptionBar";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

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
    <div>
      <div className="px-4 py-2 relative  max-md:hidden">
        <div className="top-gradient shadow-lg rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl rounded-br-2xl overflow-hidden mx-2 relative">
          <Carousel
            showThumbs={false}
            showArrows={false}
            infiniteLoop={true}
            autoPlay={true}
            showStatus={false}
          >
            {images.map((image, index) => (
              <div key={index} className="pt-4 pr-8 pl-8 pb-0 relative">
                <div className="relative">
                  <Image
                    src={image}
                    alt={product.image}
                    height={256}
                    width={800}
                    className="w-full object-cover h-64 rounded-tl-2xl rounded-tr-2xl"
                  />
                  <p className="absolute top-3 right-4 bg-white px-4 py-0  rounded-tl-md rounded-tr-md ">
                    Free
                  </p>
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

      <div className="sm:hidden pl-2">
        <div className="top-gradient shadow-lg rounded-lg overflow-hidden  relative w-[330px] h-[345px]">
          <Carousel
            showThumbs={false}
            showArrows={false}
            infiniteLoop={true}
            autoPlay={true}
            showStatus={false}
          >
            {images.map((image, index) => (
              <div key={index} className="pt-2 pr-4 pl-4 pb-0 relative">
                <div className="">
                  <Image
                    src={image}
                    alt={product.image}
                    height={300}
                    width={300}
                    className="w-full object-cover h-56 rounded-tl-2xl rounded-tr-2xl"
                  />

                  <p className="absolute top-6 right-8 bg-white px-6 rounded-tl-3xl rounded-tr-3xl roun">
                    Free
                  </p>
                </div>
              </div>
            ))}
          </Carousel>
          <div className="relative ">
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
    </div>
  );
};

export default FeaturedProduct;
