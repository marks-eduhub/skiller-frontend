"use client";
import { useRouter } from "next/navigation"; 
import React from "react";
import data from "./data.json";
import BottomSlider from "./bottom-slider";
import Content from "./content";
import Header from "./header";
import { useState } from "react";

interface PreferenceProps {
  errorMessage?: string;
}

const Preference: React.FC<PreferenceProps> = ({ errorMessage }) => {
  const router = useRouter();
  const images = [data.slider, data.slider1 , data.slider2 ];
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalSlides = 2; 

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };
  const handleSkip = () => {
    router.push("/splash"); 
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };
  return (
    <div className="relative flex flex-col justify-center md:flex md:flex-col md:justify-center md:grid md:grid-cols-4 md:grid-rows-4 md:gap-2 bg-grey h-screen p-4  overflow-y-auto">
      {/* row 1 */}
      <Header data2={{ currentIndex }} />

      {/* row 2 */}
      <Content data2={{ currentIndex }} />

      {/* row 2 */}
       <BottomSlider nextSlide={nextSlide} skipToSplash={handleSkip} data2={{ currentIndex }}  /> 

    </div>
  );
};
export default Preference;