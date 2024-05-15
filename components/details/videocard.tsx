import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { RiEqualizerLine } from "react-icons/ri";
import { FaArrowsAltH } from "react-icons/fa";
import { TbArrowsMaximize } from "react-icons/tb";
import Arrow from "../../public/prview.svg";
import caption from "../../public/coption.svg";
import Image from "next/image";

const VideoCard: React.FC = () => {
  const videoFilePath = "/Video1.mp4";
  const thumbnail =
  "https://img-c.udemycdn.com/course/750x422/986406_89c5_3.jpg";
  return (
    <div className="relative">
      <div className=" relative w-full ">
        <video controls poster={thumbnail} className="w-full ">
          <source
            src={videoFilePath}
            type="video/mp4"
          />
        </video>

        {/* <div className="absolute left-0 ml-4 top-1/2 transform -translate-y-1/2 z-10">
          <FontAwesomeIcon
            icon={faChevronLeft}
            className="h-6 w-6 font-medium text-[#0CB182]"
          />
        </div> */}

        {/* <div className="absolute bottom-0 right-0 p-4 z-10 flex gap-2">
          <Image
            alt={"Icon"}
            src={caption}
            width={20}
            height={20}
            className="text-white text-lg hover:text-gray-300 cursor-pointer"
          />
          <RiEqualizerLine className="text-white text-lg hover:text-gray-300 cursor-pointer" />
          <Image
            alt={"Icon"}
            src={Arrow}
            width={20}
            height={20}
            className="text-white text-lg  hover:text-gray-300 cursor-pointer"
          />
          <TbArrowsMaximize className="text-white text-lg hover:text-gray-300 cursor-pointer" />
          <FaArrowsAltH className="text-white text-lg hover:text-gray-300 cursor-pointer" />
        </div> */}
        {/* Gradient overlay */}
        {/* <div className="absolute top-0 left-0 w-full h-full video-overlay "></div> */}
      </div>

      <div className="text-left mt-4 text-white ">
        <h2 className="text-md font-bold">
          Typescript Fundamentals in 20 days
        </h2>
        <p className="text-md">Michael Kizito : Software Engineer, Lecturer</p>
      </div>
    </div>
  );
};

export default VideoCard;