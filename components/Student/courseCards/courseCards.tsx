import React from "react";
import Image from "next/image";
import { ClockIcon, StarFilledIcon } from "@radix-ui/react-icons";
import { Course } from "@/lib/types";

interface ProductCardProps {
  course: any; 
  containerWidth: string;
}


const ProductCard: React.FC<ProductCardProps> = ({ course }) => {
  const { coursename, card, tutor, duration, rating } = course?.attributes;
  
  const tutorName = tutor?.data[0]?.attributes?.tutorname || "Tutor Name";


  return (
    <div className="mr-4 pb-10 sm:pb-0 h-full">
      <div className="border border-gray-400">
        <div className="rounded-lg flex relative overflow-hidden h-[180px]">
          <Image
            src={card?.data?.attributes?.url || "/cake.svg"}
            alt={card?.data?.attributes?.alternativeText || "Cake"}
            fill
            className="object-cover object-center p-1"
          />
          <div className="flex items-center absolute justify-between p-2 w-full">
            <p className=" text-black bg-white px-4 py-0 rounded-t rounded-b">
              Free
            </p>
          </div>
        </div>
      </div>
      <div className="p-2 bg-[#F3F4F3] text-black">
        <div className="mb-4 sm:h-[30px] h-[50px]">
          <h3 className="font-semibold line-clamp-2 text-ellipsis">{coursename || "Course Name"}</h3>
        </div>
        <div className="flex items-center mb-4">
          <p>{tutorName}</p>
        </div>
        <div className="flex justify-between mt-3 gap-2 text-[0.8rem]">
          <div className="flex gap-1">
            <StarFilledIcon className="w-4 h-4 text-black" />
            <p>{rating}</p>
          </div>
          <div className="flex gap-1">
            <ClockIcon className="w-4 h-4 text-black" />
            <p>{duration}</p>
          </div>
        </div>
      </div>
    </div>
  );
};


export default ProductCard;










