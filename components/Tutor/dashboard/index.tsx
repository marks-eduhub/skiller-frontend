"use client";
import React, { useState } from "react";
import Image from "next/image";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
const HomePage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const options = [
    "A-Z",
    "Z-A",
    "Newest",
    "Oldest",
    "Published",
    "Drafted",
    "Unpublished",
  ];
  const toggleicon = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="w-ful h-full pt-10 px-4 pb-3 container cursor-pointer">
      <div className=" flex justify-between w-full items-center">
        <div className=" bg-black rounded-lg items-center p-4 w-1/5 flex gap-4">
          <Image src="/plus.svg" alt="plus" width={30} height={30} />
          <h1 className="text-white">New Course</h1>
        </div>

        <div className="bg-[#E9E9E9] rounded-lg items-center p-4 w-1/2 flex gap-8 ">
          {/* <Image src="/search.svg" alt="search icon" width={20} height={20}  /> */}

          <MagnifyingGlassIcon className="w-6 h-6 text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Search "
            className="flex-1 outline-none bg-transparent"
          />
        </div>
        <div className="relative bg-[#D9D9D9] rounded-lg p-4 w-1/5 flex gap-2">
          <h1>Filter</h1>
          <Image
            src="/dropdown.svg"
            alt="dropdown"
            width={10}
            height={10}
            onClick={toggleicon}
          />
          {isOpen && (
            <div className="absolute top-full mt-2 w-[200px] bg-[#E9E9E9] rounded-lg shadow-lg z-50">
              <ul className="py-2">
                {options.map((option, index) => (
                  <li
                    key={index}
                    className="px-4 py-2 hover:bg-white rounded-lg cursor-pointer"
                  >
                    {option}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      <div className="relative flex mt-8 ">
        <div className="absolute inset-x-0 bottom-0 h-7 z-20 bg-[#64d355b0]  flex justify-end items-center px-4">
          <h1 className="text-white">PUBLISHED</h1>
        </div>

        <div className=" flex-1 mr-2 relative">
          <div
            className="w-full h-[170px] flex items-center justify-center bg-no-repeat bg-center bg-cover"
            style={{ backgroundImage: `url("/cake.svg")` }}
          >
            <h1 className="text-white font-bold text-[30px]">
              CAKE MAKING IN 45 MINUTES
            </h1>
          </div>
        </div>

        <div className="w-[15%] bg-black flex flex-col ">
          <div className="flex gap-4 mt-4">
            <h1 className="text-white ml-4"> 45</h1>
            <div className="flex gap-1">
              <Image
                src="/Learners.svg"
                alt="learners"
                width={30}
                height={30}
              />
              <h1 className="text-white">Learners</h1>
            </div>
          </div>
          <div className="flex gap-4 mt-4">
            <h1 className="text-white ml-4"> 27</h1>
            <div className="flex gap-1">
              <Image src="/days.svg" alt="days" width={25} height={25} />
              <h1 className="text-white">Days</h1>
            </div>
          </div>
          <div className="flex gap-4 mt-4">
            <h1 className="text-white ml-4"> 27</h1>
            <div className="flex gap-1">
              <Image src="/reviews.svg" alt="revies" width={25} height={25} />
              <h1 className="text-white">Reviews</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="relative flex mt-8">
        <div className="absolute inset-x-0 bottom-0 h-7 bg-[#db4444c2]  flex justify-end items-center px-4">
          <h1 className="text-white">UNPUBLISHED</h1>
        </div>

        <div className=" flex-1 mr-2">
          <div
            className="w-full h-[170px] flex items-center justify-center bg-no-repeat bg-center bg-cover"
            style={{ backgroundImage: `url("/repair.svg")` }}
          >
            <h1 className="text-white font-bold text-[30px]">
              CAR REPAIR IN 48 DAYS
            </h1>
          </div>
        </div>

        <div className="w-[15%] bg-black flex flex-col ">
          <div className="flex gap-4 mt-4">
            <h1 className="text-white ml-4"> 45</h1>
            <div className="flex gap-1">
              <Image
                src="/Learners.svg"
                alt="learners"
                width={30}
                height={30}
              />
              <h1 className="text-white">Learners</h1>
            </div>
          </div>
          <div className="flex gap-4 mt-4">
            <h1 className="text-white ml-4"> 27</h1>
            <div className="flex gap-1">
              <Image src="/days.svg" alt="days" width={25} height={25} />
              <h1 className="text-white">Days</h1>
            </div>
          </div>
          <div className="flex gap-4 mt-4">
            <h1 className="text-white ml-4"> 27</h1>
            <div className="flex gap-1">
              <Image src="/reviews.svg" alt="revies" width={25} height={25} />
              <h1 className="text-white">Reviews</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="relative flex mt-8">
        <div className="absolute inset-x-0 bottom-0 h-7 bg-[#eaff04bb]  flex justify-end items-center px-4">
          <h1 className="text-white">PENDING</h1>
        </div>

        <div className=" flex-1 mr-2">
          <div
            className="w-full h-[170px] flex items-center justify-center bg-no-repeat bg-center bg-cover"
            style={{ backgroundImage: `url("/car.svg")` }}
          >
            <h1 className="text-white font-bold text-[30px]">
              CAR REPAIR IN 48 DAYS
            </h1>
          </div>
        </div>

        <div className="w-[15%] bg-black flex flex-col ">
          <div className="flex gap-4 mt-4">
            <h1 className="text-white ml-4"> 45</h1>
            <div className="flex gap-1">
              <Image
                src="/Learners.svg"
                alt="learners"
                width={30}
                height={30}
              />
              <h1 className="text-white">Learners</h1>
            </div>
          </div>
          <div className="flex gap-4 mt-4">
            <h1 className="text-white ml-4"> 27</h1>
            <div className="flex gap-1">
              <Image src="/days.svg" alt="days" width={25} height={25} />
              <h1 className="text-white">Days</h1>
            </div>
          </div>
          <div className="flex gap-4 mt-4">
            <h1 className="text-white ml-4"> 27</h1>
            <div className="flex gap-1">
              <Image src="/reviews.svg" alt="revies" width={25} height={25} />
              <h1 className="text-white">Reviews</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="relative flex mt-8">
        <div className="absolute inset-x-0 bottom-0 h-7 bg-[#64d355b0]  flex justify-end items-center px-4">
          <h1 className="text-white">DRAFT</h1>
        </div>

        <div className=" flex-1 mr-2">
          <div
            className="w-full h-[170px] flex items-center justify-center bg-no-repeat bg-center bg-cover"
            style={{ backgroundImage: `url("/cake.svg")` }}
          >
            <h1 className="text-white font-bold text-[30px]">
              CAKE MAKING IN 45 MINUTES
            </h1>
          </div>
        </div>

        <div className="w-[15%] bg-black flex flex-col ">
          <div className="flex gap-4 mt-4">
            <h1 className="text-white ml-4"> 45</h1>
            <div className="flex gap-1">
              <Image
                src="/Learners.svg"
                alt="learners"
                width={30}
                height={30}
              />
              <h1 className="text-white">Learners</h1>
            </div>
          </div>
          <div className="flex gap-4 mt-4">
            <h1 className="text-white ml-4"> 27</h1>
            <div className="flex gap-1">
              <Image src="/days.svg" alt="days" width={25} height={25} />
              <h1 className="text-white">Days</h1>
            </div>
          </div>
          <div className="flex gap-4 mt-4">
            <h1 className="text-white ml-4"> 27</h1>
            <div className="flex gap-1">
              <Image src="/reviews.svg" alt="revies" width={25} height={25} />
              <h1 className="text-white">Reviews</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
