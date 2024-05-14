import {
  MagnifyingGlassIcon,
  ShadowInnerIcon,
  TriangleDownIcon,
} from "@radix-ui/react-icons";
import { Link } from "lucide-react";
import React from "react";

const Navbar = ({ showGreeting = false }) => {
  return (
    <nav className="grid grid-cols-1 gap-4 sm:grid-cols-12 max-md:gap-2">
      <div className="sm:col-span-8 flex items-center rounded-full shadow bg-white p-2">
        <MagnifyingGlassIcon className="w-6 h-6 text-gray-500 mr-2" />
        <input
          type="text"
          placeholder="Search for classes or tutors"
          className="flex-1 outline-none bg-transparent"
        />
      </div>
      
      <div className="sm:col-span-2 mt-4 sm:mt-0 flex items-center justify-center rounded-full shadow bg-white text-black">
        Premium
      </div>
      
      <div className="sm:col-span-2 mt-4 sm:mt-0 flex items-center justify-between rounded-full shadow bg-black text-white cursor-pointer">
        <ShadowInnerIcon className="w-6 h-6 text-white ml-2" />
        <span className="text-white">Norah</span>
        <TriangleDownIcon className="w-6 h-6 text-white mr-2" />
      </div>
      
      {showGreeting && (
        <div className="sm:col-span-12 flex flex-col justify-end items-end text-lg font-semibold mt-4 max-md:text-[17px] max-md:mt-2 max-md:mb-2">
          <div
            className="text-right mr-10 text-black"
            style={{ whiteSpace: "nowrap" }}
          >
            <b>Good morning Norah</b>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
