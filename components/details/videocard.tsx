import React from "react";

const VideoCard: React.FC = () => {
  const videoFilePath = "/Video1.mp4";
  const thumbnail =
    "https://img-c.udemycdn.com/course/750x422/986406_89c5_3.jpg";
  return (
    <div className="relative">
      <div className=" w-full ">
        <video controls poster={thumbnail} className="w-full ">
          <source src={videoFilePath} type="video/mp4" />
        </video>
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
