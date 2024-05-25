import {
  MagnifyingGlassIcon,
  ShadowInnerIcon,
  TriangleDownIcon,
} from "@radix-ui/react-icons";
// import { Link } from "lucide-react";
import React from "react";
import constants from "./constants.json";
import Image from "next/image";
import { CiHome } from "react-icons/ci";
import Link from "next/link";
interface NavBarProps {
  showGreeting: boolean;
  containNav?: boolean;
}

const Navbar: React.FC<NavBarProps> = ({ showGreeting, containNav }) => {
  return (
    <>
      <nav className="hidden sm:grid grid-cols-1 gap-4 sm:grid-cols-12 max-md:gap-2 ">
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
          <Link href="/dashboard/profile" className="text-white">
            Norah
          </Link>
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
      <nav className="flex flex-col  sm:hidden">
        <div className="flex flex-row justify-between ">
          <div className="relative h-[2rem] w-[4.5rem] ">
            <Image
              src={constants.mobileScreen.logo}
              alt={constants.mobileScreen.title}
              fill
            />
          </div>
          <MagnifyingGlassIcon className="w-8 h-8 text-gray-500 mr-2" />
          <div className="flex items-center justify-between rounded-full shadow bg-black text-white cursor-pointer">
            <ShadowInnerIcon className="w-6 h-6 text-white ml-2" />
            <span className="text-white">Norah</span>
            <TriangleDownIcon className="w-6 h-6 text-white mr-2" />
          </div>
        </div>

        <div className="flex flex-row justify-between mt-10">
          <div className="flex flex-col items-center h-[4.5rem] w-[4.5rem]">
            <div className="relative h-[2rem] w-[2rem]">
              <Image
                src={constants.home.logo}
                alt={constants.home.title}
                fill
              />
            </div>
            <span className="text-gray-500 text-sm">Home</span>
          </div>
          <div className="flex flex-col items-center h-[4.5rem] w-[4.5rem]">
            <div className="relative h-[2rem] w-[2rem]">
              <Image
                src={constants.community.logo}
                alt={constants.community.title}
                fill
              />
            </div>
            <span className="text-gray-500 text-sm">Community</span>
          </div>
          <div className="flex flex-col items-center h-[4.5rem] w-[4.5rem]">
            <div className="relative h-[2rem] w-[2rem]">
              <Image
                src={constants.progress.logo}
                alt={constants.progress.title}
                fill
              />
            </div>
            <span className="text-gray-500 text-sm">Progress</span>
          </div>
          <div className="flex flex-col items-center h-[4.5rem] w-[4.5rem]">
            <div className="relative h-[2rem] w-[2rem]">
              <Image
                src={constants.subscriptions.logo}
                alt={constants.subscriptions.title}
                fill
              />
            </div>
            <span className="text-gray-500 text-sm">Subscriptions</span>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
