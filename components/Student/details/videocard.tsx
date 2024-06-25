import React from "react";

const VideoCard: React.FC = () => {
  const videoFilePath = "/Video1.mp4";
  const thumbnail =
    "/Thumb Nail.svg";
  return (
    <div className="relative  w-full rounded-lg  ">
        <video controls poster={thumbnail} className="w-full rounded-lg">
          <source src={videoFilePath} type="video/mp4"/>
        </video>

      <div className="text-left mt-4 text-black max-md:text-lg">
        <h2 className="text-md font-bold">
          Typescript Fundamentals in 20 days
        </h2>
        <p className="text-md max-md:mt-4">Michael Kizito : Software Engineer, Lecturer</p>
      </div>
    </div>
  );
};

export default VideoCard;
