import React from "react";
import Image from "next/image";
import { ClockIcon, StarFilledIcon } from "@radix-ui/react-icons";
import { FcLike } from "react-icons/fc";

interface Wishlist {
  id: number;
  instructor: string;
  image: string;
  rating: number;
  duration: string;
  topic: string;
  level: string;
}
interface WishlistCardProps {
  course: Wishlist;
}

const WishlistCard: React.FC<WishlistCardProps> = ({ course }) => {
  return (
    <div className="">
      <div className="border border-gray-400">
        <div className="rounded-lg flex relative overflow-hidden h-[180px]">
          <Image
            src={course.image}
            alt={"image"}
            fill
            className="object-cover object-center p-1"
          />
          <div className="flex items-center absolute justify-between p-2 w-full">
            <FcLike />

            <p className=" text-black bg-white px-4 py-0 rounded-t rounded-b">
              Free
            </p>
          </div>
        </div>
      </div>
      <div className="p-2 bg-[#F3F4F3] text-black">
        <div className="mb-4">
          <h3 className="font-semibold">{course.topic}</h3>
        </div>

        <div className="flex mb-4  items-center">
          <p>{course.instructor}</p>
        </div>

        <div className="flex justify-between mt-3 gap-2 text-[0.8rem]">
          <div className="flex gap-1">
            <StarFilledIcon className="w-4 h-4 text-black" />
            <p>{course.rating}</p>
          </div>
          <div className="flex gap-1">
            <ClockIcon className="w-4 h-4 text-black" />
            <p>{course.duration}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WishlistCard;
