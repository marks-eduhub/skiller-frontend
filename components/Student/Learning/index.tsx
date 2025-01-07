"use client";
import React, { useState } from "react";
import Progress from "./progress";
import data from "./data.json";
import Link from "next/link";
import Wishlist from "../wishlist/wishlist";
export const Learning = () => {
  const [clicked, setClicked] = useState("My Progress");
  const handleClick = (value: string) => {
    setClicked(value);
  };
  return (
    <div className="sm:pl-0">
      <Link href="/dashboard">
      <h1 className="text-end mb-2 hover:text-blue-600 underline">See more categories</h1>
      </Link>
      <div className="flex gap-3 items-center border-t-2 border-t-gray-300  w-full ">
        <div
          className={`rounded-md px-6 py-3 shadow-lg mt-5  cursor-pointer ${
            clicked == "My Progress" ? "border-b-4 border-black" : "bg-gray-100"
          }`}
          onClick={() => handleClick("My Progress")}
        >
          <h1>
            My Progress
            <span className="bg-gray-700 ml-2 text-white px-2 py-1 rounded-xl">
              {data.myprogress.length}
            </span>
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
            <span className="bg-gray-700 ml-2 text-white px-2 py-1 rounded-xl">
              {2}
            </span>
          </h1>
        </div>
      </div>

      {clicked == "My Progress" ? <Progress myprogress={data.myprogress}/> : <Wishlist  />}
    </div>
  );
};
