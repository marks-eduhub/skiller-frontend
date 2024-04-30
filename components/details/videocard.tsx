import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faClosedCaptioning,
} from "@fortawesome/free-solid-svg-icons";
import { RiEqualizerLine } from "react-icons/ri";
import { FaArrowsAltH } from "react-icons/fa";
import { TbArrowsMaximize } from "react-icons/tb";

const VideoCard: React.FC = () => {
  const thumbnailUrl =
    "https://img-c.udemycdn.com/course/750x422/986406_89c5_3.jpg";

  return (
    <div className="relative">
      <div className="video-card relative">
        {/* Video thumbnail */}
        <img
          src={thumbnailUrl}
          alt="Video Thumbnail"
          className="video-thumbnail"
        />

        {/* Arrow icon on the left */}
        <div className="absolute left-0 ml-4 top-1/2 transform -translate-y-1/2 z-10">
          <FontAwesomeIcon
            icon={faChevronLeft}
            className="h-6 w-6 font-medium text-[#0CB182]"
          />
          {/* <div className="main">
            <h2 className="text-green">hello</h2>
          </div> */}
        </div>


        <div className="absolute bottom-0 right-0 p-4 z-10 flex gap-4">
          <FontAwesomeIcon
            icon={faClosedCaptioning}
            className="text-white text-lg"
          />
          <RiEqualizerLine className="text-white text-lg hover:text-gray-300 cursor-pointer" />
          <TbArrowsMaximize className="text-white text-lg hover:text-gray-300 cursor-pointer" />
          <FaArrowsAltH className="text-white text-lg hover:text-gray-300 cursor-pointer" />
        </div>
        {/* Gradient overlay */}
        <div className="video-overlay"></div>
      </div>

      <div className="flex">
        
        <div className="text-left mt-9 mb-9 text-white ">
        <h2 className="text-md font-bold">
          Typescript Fundamentals in 20 days
        </h2>
        <p className="text-md">Michael Kizito : Software Engineer, Lecturer</p>
        </div>
        
        {/* <div className="text-white ">
        <h2>Progress</h2>
      </div> */}
      </div>
     
    </div>
  );
};

export default VideoCard;
