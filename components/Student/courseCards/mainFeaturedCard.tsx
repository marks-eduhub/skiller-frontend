import Image from "next/image";
import React from "react";
import ProductDescriptionBar from "./cardDescriptionBar";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useFetchCarouselCourses } from "@/hooks/useCarouselCourses";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { message } from "antd";
import { useFetchCourseRate } from "@/hooks/useSubmit";

const FeaturedProduct: React.FC = () => {
  const { data, isLoading, error } = useFetchCarouselCourses();
  const { data: rateCourse } = useFetchCourseRate();

  const courseData = data?.data?.filter((course:any) => course?.attributes.categoryName === "FeaturedCourses");
  const carouselCourses = courseData?.map((course: any) => course.attributes.courses.data).flat() || [];
  const courseRatings = rateCourse?.data || [];

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
    message.error("Error fetching featured courses. Please try again later.");
    return null;
  }

  return (
    <div className="py-2 relative">
      <div className="relative mx-0 overflow-hidden rounded-2xl shadow-lg max-md:rounded-lg">
        <Carousel
          showThumbs={false}
          showArrows={false}
          infiniteLoop={true}
          autoPlay={true}
          showStatus={false}
        >
          {carouselCourses.map((course: any) => {
            const imageUrl = course?.attributes?.card?.data?.attributes.url;
            const tutorName = course?.attributes?.tutor.data?.attributes.tutorname;
            const coursename = course?.attributes?.coursename;
            const { duration, level, days } = course?.attributes;

            const courseRatingsForCurrentCourse = courseRatings.filter(
              (rating: any) => rating.attributes.course.data.id === course.id
            );
            const totalRatings = courseRatingsForCurrentCourse.length;
            const averageRating = totalRatings > 0
              ? courseRatingsForCurrentCourse.reduce((sum: number, rating: any) => sum + rating.attributes.score, 0) / totalRatings
              : "No rating";

            return (
              <div key={course.id} className="relative">
                <div className="relative aspect-[16/8] min-h-[220px] w-full sm:aspect-[16/7] md:min-h-[280px]">
                  <Image
                    src={imageUrl || "/fallback.webp"}
                    alt={
                      course?.attributes.Image?.data[0]?.attributes
                        .alternativeText || "course image"
                    }
                    fill
                    className="object-cover"
                  />
                  <p className="absolute right-4 top-4 rounded-lg bg-white px-4 py-1 text-sm font-medium sm:right-6 sm:top-6">
                    Free
                  </p>
                </div>
                <div className="relative">
                  <ProductDescriptionBar
                    tutorName={tutorName}
                    duration={duration}
                    averageRating={averageRating}
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
