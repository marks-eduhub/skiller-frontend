import React from 'react';

const VideoCard: React.FC = () => {
 const thumbnailUrl = "https://img-c.udemycdn.com/course/750x422/986406_89c5_3.jpg"

  return (
    <div className="video-card">
      
    {/* Video thumbnail */}
    <div className="relative">
      <img src={thumbnailUrl} alt="Video Thumbnail" className="video-thumbnail" />
      {/* Gradient overlay */}
      <div className="video-overlay"></div>
    </div>
    
    {/* Text below the image */}
    <div className="text-left mt-9 mb-9 " >
      <h2 className="text-md font-bold">Typescript Fundamentals in 20 days</h2>
      <p className="text-md">Michael Kizito : Software Engineer, Lecturer</p>

    </div>
  
    {/* Video controls */}
    <div className="video-controls">
     
    </div>
  </div>
  
  );
};

export default VideoCard;
