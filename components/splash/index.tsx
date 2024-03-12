"use client";

import React from "react";
import data from "./data.json";
import Image from "next/image";
import { Button } from "../ui/button";
import { TbArrowBadgeRight } from "react-icons/tb";
import { useState } from "react";

const Splash: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-cover bg-no-repeat" style={{ backgroundImage: "url('/backgroundImage.svg')" }}>
      <div className="absolute top-1/4 transform -translate-y-1/2 text-center z-10">
        <p className="text-2xl font-bold text-black">{data.title}</p>
      </div>
      <div className="absolute bottom-16">
        <button onClick={() => console.log("Let's Start button clicked")} className="px-4 py-2 bg-black text-white rounded-md">{data.buttonText}</button>
      </div>
      <Image layout="intrinsic" width={375.99} height={618} src="/image.svg" alt="bulb" className=" z-0" style={{ maxWidth: "50%", maxHeight: "40%" }}  />
    </div>
  );
};

export default Splash;
