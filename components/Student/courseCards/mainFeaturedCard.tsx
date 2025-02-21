import Image from "next/image";
import React from "react";
import ProductDescriptionBar from "./cardDescriptionBar";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useFetchCarouselCourses } from "@/hooks/useCarouselCourses";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { message } from "antd";
import api from "@/lib/axios";

const FeaturedProduct: React.FC = () => {
  const { data, isLoading, error } = useFetchCarouselCourses();
  if (isLoading) {
    return (
       

        <div className="rounded-lg">
          <Skeleton
            height={300}
            count={1}
            baseColor="#e0e0e0"
            highlightColor="#f5f5f5"
            enableAnimation={true}
          />
        </div>
    );
  }

  if (error) {
    message.error("Error fetching courses. Please try again later.");
    return null;
  }

  const carouselCourses = data?.data || [];

  return (
    <div className="py-2 relative">
      <div className="shadow-lg sm:rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl rounded-br-2xl max-md:rounded-lg overflow-hidden mx-2 relative">
        <Carousel
          showThumbs={false}
          showArrows={false}
          infiniteLoop={true}
          autoPlay={true}
          showStatus={false}
        >
          {carouselCourses.map((course: any) => {
            const imageUrl = course?.attributes?.card?.data?.attributes.url;


            const tutorName = course.attributes.tutor.data?.attributes.tutorname;
            const coursename = course.attributes.coursename
            const { rating, duration, level, days } = course.attributes;

            return (
              <div key={course.id} className="relative">
                <Image
                  src={imageUrl? `${api.defaults.baseURL}${imageUrl}`: "/cake.svg"}
                  alt={course?.attributes.Image?.data[0]?.attributes.alternativeText }
                  height={256}
                  width={800}
                  className="w-full object-cover h-64 rounded-tl-2xl rounded-tr-2xl"
                />
                <p className="absolute top-6 right-8 bg-white px-6 rounded-lg">
                  Free
                </p>
                <div className="relative">

                <ProductDescriptionBar
                  tutorName={tutorName}
                  duration={duration}
                  rating={rating}
                  description={coursename}
                  level={level}
                  days={days}
                />
                </div>
              </div>
            );
          })}
        </Carousel>
      </div>
    </div>
  );
};

export default FeaturedProduct;
