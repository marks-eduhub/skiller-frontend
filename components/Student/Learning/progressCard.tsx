import React from "react";
import Image from "next/image";
import { StarFilledIcon } from "@radix-ui/react-icons";

interface Progress {
  image: string;
  topic: string;
  instructor: string;
  rating: number;
  progress: number;
}
interface ProgressCardProps {
  myprogress: Progress;
}
const ProgressCard: React.FC<ProgressCardProps> = ({
 myprogress
}) => {
  return (
    <div className="mx-auto grow gap-4  overflow-hidden flex-shrink-0 mr-4 max-md:pb-10 ">
      <div className="border border-gray-400">
        <div className="rounded-lg flex relative overflow-hidden h-[180px]">
          <Image
            src={myprogress.image}
            alt={"image"}
            width={370}
            height={180}
            className="object-cover object-center p-1"
          />
        </div>
      </div>
      <div className="p-2 bg-[#F3F4F3] text-black">
        <div className="mb-4">
          <h3 className="font-semibold">{myprogress.topic}</h3>
        </div>

        <div className="flex mb-4 w-full justify-between items-center">
          <p>{myprogress.instructor}</p>
          <div className="flex gap-1 items-center ">
            <StarFilledIcon className="w-4 h-4 text-black" />
            <p>{myprogress.rating}</p>
          </div>
        </div>
        <div className="my-4 ">
          <div className="w-full  bg-gray-300 rounded-full h-[20px] border border-black relative">
            <div
              className="bg-gray-700 h-[18px] rounded-full "
              style={{ width: `${myprogress.progress}%` }}
            ></div>
            <div className="absolute inset-0 flex items-center justify-center text-white text-sm font-bold">
              {myprogress.progress}%
            </div>
          </div>
        </div>
        </div>
      </div>
  );
};

export default ProgressCard;
