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
  days: string;
}

interface FeaturedProductProps {
  course: Product;
}

const FeaturedProduct: React.FC<FeaturedProductProps> = ({ course }) => {
  const images = [course.image, course.image, course.image];

  return (
    <div>
      <div className=" py-2 relative sm:pl-0 pl-2 ">
        <div className="shadow-lg sm:rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl rounded-br-2xl  max-md:rounded-lg overflow-hidden mx-2 relative">
          <Carousel
            showThumbs={false}
            showArrows={false}
            infiniteLoop={true}
            autoPlay={true}
            showStatus={false}
          >
            {images.map((image, index) => (
              <div key={index} className="relative">
                <div className="relative">
                  <Image
                    src={image}
                    alt={course.image}
                    height={256}
                    width={800}
                    className="w-full object-cover h-64 rounded-tl-2xl rounded-tr-2xl"
                  />
                  <p className="absolute top-6 right-8 bg-white px-6 rounded-lg">
                    Free
                  </p>
                </div>
              </div>
            ))}
          </Carousel>
          <div className="relative">
            <ProductDescriptionBar
              instructor={course.instructor}
              duration={course.duration}
              rating={course.rating}
              description={course.description}
              topic={course.topic}
              level={course.level}
              days={course.days}
            />
          </div>
        </div>
      </div>
  
    </div>
  );
};

export default FeaturedProduct;
