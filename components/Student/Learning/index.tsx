"use client";
import React, { useState } from "react";
import Progress from "./progress";
import Link from "next/link";
import Wishlist from "../wishlist/wishlist";
export const Learning = () => {

  const [clicked, setClicked] = useState("My Progress");
  const handleClick = (value: string) => {
    setClicked(value);
  };
  return (
    <div className="sm:pl-0">
      
      <div className="flex gap-3 items-center  w-full ">
        <div
          className={`rounded-md px-6 py-3 shadow-lg mt-5  cursor-pointer ${
            clicked == "My Progress" ? "border-b-4 border-black" : "bg-gray-100"
          }`}
          onClick={() => handleClick("My Progress")}
        >
          <h1>
            My Progress
           
          </h1>
        </div>
        <div
          className={`rounded-md px-6 py-3 shadow-lg mt-5 cursor-pointer ${
            clicked == "My Wishlist" ? "border-b-4 border-black" : "bg-gray-100"
          }`}
          onClick={() => handleClick("My Wishlist")}
        >
          <h1>
            Wishlist
            
          </h1>
        </div>
      </div>

      {clicked == "My Progress" ? <Progress/> : <Wishlist  />}
    </div>
  );
};
