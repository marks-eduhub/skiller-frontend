import React from "react";
import Image from "next/image";

interface Review {
  name: string;
  image: string;
  comment: string;
  rating: number;
}

interface CourseReviewProps {
  reviews: Review[];
}

const CourseReview: React.FC<CourseReviewProps> = ({ reviews }) => {
  if (reviews.length === 0) {
    return <div className="flex items-center justify-center font-semibold text-[18px] p-20">No reviews available.</div>;
  }
  
  return (
    <div className="w-full">
      <h1 className="sm:mt-3 mt-5 font-bold text-xl">
        No. of reviews: {reviews.length}
      </h1>
      <div className="mt-10 space-y-6">
        {reviews.map((review, index) => (
          <div
            key={index}
            className="w-full h-auto border border-gray-300 rounded-lg p-4"
          >
            <div className="flex items-center mb-2">
              <Image
                src={review.image}
                alt={review.name}
                width={60}
                height={60}
                className="rounded-md"
              />
              <div className="ml-3">
                <h2 className="font-semibold">{review.name}</h2>
                <div className="flex items-center">
                  {Array.from({ length: 5 }, (_, index) => (
                    <svg
                      key={index}
                      className={`w-5 h-5 ${
                        index < Math.floor(review.rating)
                          ? "text-yellow-300"
                          : "text-gray-300"
                      }`}
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.184 3.63a1 1 0 00.95.69h3.813c.969 0 1.371 1.24.588 1.81l-3.088 2.25a1 1 0 00-.364 1.118l1.184 3.63c.3.921-.755 1.688-1.538 1.118l-3.088-2.25a1 1 0 00-1.175 0l-3.088 2.25c-.783.57-1.838-.197-1.538-1.118l1.184-3.63a1 1 0 00-.364-1.118l-3.088-2.25c-.783-.57-.381-1.81.588-1.81h3.813a1 1 0 00.95-.69l1.184-3.63z" />
                    </svg>
                  ))}
                </div>
              </div>
            </div>
            <p className="text-gray-700">{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseReview;
