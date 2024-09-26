"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  HamburgerMenuIcon,
  MagnifyingGlassIcon,
  ShadowInnerIcon,
  TriangleDownIcon,
} from "@radix-ui/react-icons";
import SkillerLogo from "@/components/ui/logo";
import { IoMdClose } from "react-icons/io";
import SideLinks from "./side-links";

const SmallScreen = () => {
  const [isSidebar, setIsSidebar] = useState(false);
  const toggleSidebar = () => {
    setIsSidebar(!isSidebar);
  };

  return (
    <div className="sm:hidden absolute top-0 left-5 right-5 z-50  flex items-center justify-between pt-6">
      <div className="w-24 text-white">
          <SkillerLogo />
        </div>
        <div className="flex w-56 items-center rounded-lg shadow bg-white p-2 cursor-pointer">
          <Image src="/magnify.svg" alt="magnify" width={30} height={30} />
          <input
            type="text"
            placeholder="Search..."
            className="outline-none bg-transparent ml-2"
          />
        </div>
      <HamburgerMenuIcon
        className="w-6 h-6 cursor-pointer text-black rotate90  "
        onClick={toggleSidebar}
      />
    
      {isSidebar && (
        <div className="fixed inset-0 bg-black bg-opacity-75 z-50">
          <div className="fixed top-0 left-0 h-full w-[250px] bg-black text-white">
            <div className="flex items-center justify-between p-4 w-[190px] gap-5">
              <SkillerLogo />
              <IoMdClose
                onClick={toggleSidebar}
                className="text-white "
                style={{ width: "70px", height: "40px" }}
              />
            </div>
            <div className="h-auto w-full grow">
              <SideLinks />
            </div>
          </div>
        </div>
      )}
     
    </div>
  );
};

export default SmallScreen;
