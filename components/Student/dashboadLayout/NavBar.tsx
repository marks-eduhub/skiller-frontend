import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from "react";
import {
  MagnifyingGlassIcon,
  TriangleDownIcon,
  ShadowInnerIcon,
} from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";
import constants from "./constants.json";
import SkillerLogo from "@/components/ui/logo";

interface NavBarProps {
  sidebarMinimized: boolean;
  showGreeting?: boolean;
}

const Navbar: React.FC<NavBarProps> = ({ sidebarMinimized }) => {
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const hiddenRoutes = ['/dashboard/profile']; 
  const hideGreetingAndSearch = isMounted && hiddenRoutes.includes(pathname);

  return (
    <>
      <nav className="max-md:hidden">
        <div className={`flex items-center justify-between w-full ${hideGreetingAndSearch ? '' : ''}`}>
          {!sidebarMinimized ? (
            <>
              {!hideGreetingAndSearch && (
                <p className="text-black font-semibold text-[20px]">
                  Good Morning Norah
                </p>
              )}
              <div className="flex items-center gap-10 ml-auto">
                <p className="rounded-full px-6 py-2 shadow text-black bg-white">
                  Premium
                </p>
                <div className="p-2 flex items-center justify-between rounded-full shadow bg-black text-white cursor-pointer">
                  <Image
                    src="/Ellipse 1.svg"
                    alt="variant"
                    width={20}
                    height={20}
                    className="ml-2"
                  />
                  <Link href="/dashboard/profile" className="text-white">
                    Norah
                  </Link>
                  <TriangleDownIcon className="w-6 h-6 text-white mr-2" />
                </div>
              </div>
            </>
          ) : (
            <div className="w-full flex items-center justify-between mt-3 mb-10">
              <div className="w-32 h-10 mr-10">
                <SkillerLogo />
              </div>
                <div className="sm:col-span-10 w-1/2 flex items-center rounded-lg shadow bg-white p-3 cursor-pointer">
                  <MagnifyingGlassIcon className="w-6 h-6 text-black mr-2" />
                  <input
                    type="text"
                    placeholder="Search for classes or tutors"
                    className="flex-1 outline-none bg-transparent"
                  />
                </div>
              <div className="flex items-center gap-10">
                <p className="rounded-full px-6 py-2 shadow text-black bg-white">
                  Premium
                </p>
                <div className="p-2 flex items-center justify-between rounded-full shadow bg-black text-white cursor-pointer">
                  <Image
                    src="/Ellipse 1.svg"
                    alt="variant"
                    width={20}
                    height={20}
                    className="ml-2"
                  />
                  <Link href="/dashboard/profile" className="text-white">
                    Norah
                  </Link>
                  <TriangleDownIcon className="w-6 h-6 text-white mr-2" />
                </div>
              </div>
            </div>
          )}
        </div>
        {!sidebarMinimized && !hideGreetingAndSearch && (
          <div className="sm:col-span-8 w-1/2 my-6 flex items-center rounded-lg shadow bg-white p-2 cursor-pointer">
            <MagnifyingGlassIcon className="w-6 h-6 text-black mr-2" />
            <input
              type="text"
              placeholder="Search for classes or tutors"
              className="flex-1 outline-none bg-transparent"
            />
            <Image
              src="/filter-variant.svg"
              alt="filter"
              width={20}
              height={20}
            />
          </div>
        )}
      </nav>
      <nav className="flex flex-col sm:hidden">
        <div className="flex flex-row justify-between">
          <div className="relative h-[2rem] w-[4.5rem]">
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
