"use client";
import React from "react";
import ProductCard from "../courseCards/courseCards";
import { useLikedCourses } from "@/hooks/useLikedCourses";
import { useAuthContext } from "@/Context/AuthContext";

const Wishlist: React.FC = () => {
  const { user } = useAuthContext(); 
  const userId = user?.id; 

  const { data, isLoading, error } = useLikedCourses();
console.log(data)
  if (!userId) {
    return <p>Error: User ID is missing.</p>;
  }

  if (isLoading) {
    return <p>Loading wishlist...</p>;
  }

  if (error) {
    return <p>Error fetching wishlist: {error.message}</p>;
  }

  const wishlist = data?.data;
  if (!wishlist || !Array.isArray(wishlist) || wishlist.length === 0) {
    console.log("Wishlist is empty.");
    return (
      <p className="font-semibold flex items-center justify-center p-20 text-[20px]">
        Your wishlist is empty.
      </p>
    );
  }

  return (
    <div>
      <h2 className="font-semibold text-[20px] my-5">Your  Wishlist</h2>
      <div className="grid sm:grid-cols-3 grid-cols-2 gap-2">
        {wishlist.map((item) => {
          
          const { coursename, card, tutors, duration, rating } =
            item.attributes.course.data.attributes || {};

          const id = item.attributes.course.data.id;
          const imageUrl =
            item?.attributes?.course?.data?.card?.attributes?.url;
          const tutorName = item?.attributes?.course?.data?.tutors?.tutorName;


          return (
            <ProductCard
              key={item.id}
              course={{
                id,
                coursename,
                card,
                tutorName,
                duration,
                rating,
                imageUrl,
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Wishlist;
