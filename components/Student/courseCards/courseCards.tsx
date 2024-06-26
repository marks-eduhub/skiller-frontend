import React from "react";
import Image from "next/image";
import { ClockIcon, StarFilledIcon } from "@radix-ui/react-icons";

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
  sidebarMinimized?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({
  course,
  containerWidth,
  sidebarMinimized,
}) => {
  return (
    <>
      <div
        className={`mx-auto grow gap-4  overflow-hidden flex-shrink-0 mr-4 max-md:pb-10 ${
          sidebarMinimized ? "w-[390px]" : "w-[370px]"
        } `}
      >
        <div className="border border-gray-400">
          <div className="rounded-lg flex relative overflow-hidden h-[180px]">
            <Image
              src={course.image}
              alt={course.image}
              width={sidebarMinimized ? 390 : 370}
              height={180}
              className="object-cover object-center p-1"
            />
            <div className="flex items-center absolute justify-between p-2 w-full">
              <Image
                src="/like button.svg"
                alt="like button"
                width={25}
                height={25}
              />

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

          <div className="flex items-center mb-4">
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
    </>
  );
};

export default ProductCard;
