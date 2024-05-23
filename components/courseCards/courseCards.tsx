import React from "react";
import Image from "next/image";
import { PersonIcon, ClockIcon, StarFilledIcon } from "@radix-ui/react-icons"

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

interface ProductCardProps {
  course: Product;
  containerWidth: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  course,
  containerWidth,
}) => {
  return (
    <>
      <div
        className="mx-auto flex-none gap-4 shadow-lg  rounded-lg overflow-hidden  flex-shrink-0 mr-4 max-md:hidden "
      >
        <div className="border-8 border-white ">
          <div className="rounded-lg relative h-[180px] w-[380px]">
            <Image
              src={course.image}
              alt={course.image}
              fill
              className="object-cover object-center"
            />
            <p className="absolute top-4 right-8 mt-1 ml-1 text-black bg-white px-4 py-0 rounded-t rounded-b">
              Free
            </p>
          </div>
        </div>
        <div className="p-4 bg-black text-white">
          <div className="mb-4">
            <h3 className="font-semibold">{course.topic}</h3>
          </div>

          <div className="flex items-center mb-4">
            <PersonIcon className="w-6 h-6 text-white" />
            <p className="ml-2">{course.instructor}</p>
            <p className="ml-8 flex-grow text-sm">{course.description}</p>
          </div>

          <div className="flex justify-between mt-3 gap-2 text-[0.8rem]">
            <div className="flex gap-1">
              <StarFilledIcon className="w-4 h-4 text-white" />
              <p>{course.rating}</p>
            </div>
            <div className="flex gap-1">
              <ClockIcon className="w-4 h-4 text-white" />
              <p>{course.duration}</p>
            </div>
            <p>{course.level}</p>
          </div>
        </div>
      </div>

      <div className="shadow-lg rounded-lg overflow-hidden mb-6 mx-6 mt-3  sm:hidden">
        <div className="border-8 border-white ">
          <div className="rounded-lg relative h-[180px] w-full">
            <Image
              src={course.image}
              alt={course.image}
              fill
              className="object-cover object-center"
            />
            <p className="absolute top-4 right-2 mt-1 ml-1 text-black bg-white px-2 py-0 rounded-t rounded-b">
              Free
            </p>
          </div>
        </div>
        <div className="p-2 bg-black text-white">
          <div className="mb-2">
            <h3 className="font-semibold text-ellipsis overflow-hidden whitespace-nowrap">
              {course.topic}
            </h3>
          </div>
          <div className="flex items-center mb-2">
            <PersonIcon className="w-4 h-4 text-white" />
            <p className="ml-2">{course.instructor}</p>
          </div>
          <p className="mb-2 text-sm">{course.description}</p>
          <div className="flex justify-between mt-2 text-[0.8rem] gap-1">
            <div className="flex items-center gap-1">
              <StarFilledIcon className="w-4 h-4 text-white" />
              <p>{course.rating}</p>
            </div>
            <div className="flex items-center gap-1">
              <ClockIcon className="w-4 h-4 text-white" />
              <p>{course.duration}</p>
            </div>
            <p>{course.level}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;

