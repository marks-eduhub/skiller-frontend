"use client"
import React from "react";
import data from "./data.json";
import BottomSlider from "./bottom-slider";
import Content from "./content";
import Header from "./header";
import { useState } from "react";
import Image from "next/image";

interface PreferenceProps {
  errorMessage?: string;
}

const Preference: React.FC<PreferenceProps> = ({ errorMessage }) => {
  const images = [data.slider, data.slider1 , data.slider2 ];
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const skipToEnd = () => {
    setCurrentIndex(2); // Set currentIndex to 2 (slide 3)
  };

  return (
    <div className="relative flex flex-col justify-center md:flex md:flex-col md:justify-center md:grid md:grid-cols-4 md:grid-rows-4 md:gap-2 bg-grey h-screen p-4  overflow-y-auto">
      {/* row 1 */}
      <Header data2={{ currentIndex }} />

      {/* row 2 */}
      <Content data2={{ currentIndex }} />

      {/* row 2 */}
       <div className="hidden md:relative md:col-span-2 md:h-[20px] md:flex md:justify-center md:self-center cursor-pointer"> 
        {/* Wrap each Image inside a div and attach onClick event */}
        <div onClick={nextSlide}>
          {/* Render the current image based on currentIndex */}
          {currentIndex === 0 && (
            <Image src={data.slider1} alt={"slider icon"} priority={true} fill />
          )}
          {currentIndex === 1 && (
            <Image src={data.slider} alt={"slider icon"} priority={true} fill />
          )}
          {currentIndex === 2 && (
            <Image src={data.slider2} alt={"slider icon"} priority={true} fill />
          )}
        </div>
      </div>

      <BottomSlider nextSlide={nextSlide} skipToEnd={skipToEnd} data2={{ currentIndex }} />

    </div>
  );
};

export default Preference;
