"use client";

import React from "react";
import data from "./data.json";
import Image from "next/image";
import { Button } from "../ui/button";
import { TbArrowBadgeRight } from "react-icons/tb";
import BottomSlider from "./bottom-slider";
import Content from "./content";
import Header from "./header";
import  { useState } from 'react';



interface PreferenceProps {
  errorMessage?: string;
}



const Preference: React.FC<PreferenceProps> = ({ errorMessage }) => {

  const images = [data.slider, data.slider1];
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };
  
  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };
  return (
    <div className="relative flex flex-col justify-between md:flex md:flex-col md:justify-center md:grid md:grid-cols-4 md:grid-rows-3 md:gap-3 bg-grey h-screen p-4  overflow-y-auto">
      {/* row 1 */}
      <Header data2={{currentIndex}} />
      {/* <div className=""></div>
      <div className="text-black mt-10 mb-10 font-semibold text-2xl col-span-2 flex justify-center self-center">
        {data.title}
        <div className="fixed right-1/8 w-[5rem] h-[5rem] top-[2rem] md:right-1/6 md:top-[14rem] md:h-[8rem] md:w-[8rem] lg:right-1/4 lg:top-[5rem] bg-black opacity-[14%] transform rounded-full " />

        <div className="fixed left-1/8 w-[18rem] h-[18rem] bottom-[-14rem] md:left-1/6 md:bottom-[-40rem] md:h-[44rem] md:w-[44rem] lg:left-1/4  bg-black opacity-[14%] transform rounded-full " />
      </div>
      <div className=""></div> */}

      {/* row 2 */}
      <Content data2={{currentIndex}} />
      
      {/* <div className="col-span-1"></div>
      <div className="col-span-2">
        <Options />
      </div>
      <div className="col-span-1"></div>
      <div className="relative mt-10 mb-10 col-span-2 h-[20px] flex justify-center self-center md:hidden">
        <Image src={data.slider} alt={"slider icon"} priority={true} fill />
      </div> */}
      {/* row 3 */}
      <BottomSlider nextSlide={nextSlide} data2={{currentIndex}} />
      {/* <div className="hidden md:flex md:justify-end md:self-center md:col-span-1">
        <button className="rounded-[7px] border-4 border-solid border-black text-black text-[20px] w-[145px] h-[60px] ">
          <p className="break-all">{data.skip}</p>
        </button>
      </div>
      <div className="hidden md:relative md:col-span-2 md:h-[20px] md:flex md:justify-center md:self-center">
        <Image src={data.slider} alt={"slider icon"} priority={true} fill />
      </div>
      <div className="hidden md:flex md:justify-start md:self-center md:col-span-1">
        <button className="flex justify-center items-center bg-black rounded-[7px] w-[145px] h-[60px] ">
          <TbArrowBadgeRight size={30} color="white" />
        </button>
      </div>
      <div className="flex justify-between md:hidden">
        <div className=" flex justify-end self-center col-span-1">
          <button className="rounded-[7px] border-4 border-solid border-black text-black text-[20px] w-[145px] h-[60px] ">
            <p className="break-all">{data.skip}</p>
          </button>
        </div>
        <div className=" flex justify-start self-center col-span-1">
          <button className="flex justify-center items-center bg-black rounded-[7px] w-[145px] h-[60px] ">
            <TbArrowBadgeRight size={30} color="white" />
          </button>
        </div>
      </div> */}
    </div>
  );
};
export default Preference;
