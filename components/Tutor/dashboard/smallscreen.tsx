"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  HamburgerMenuIcon,
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
      <HamburgerMenuIcon
        className="w-6 h-6 cursor-pointer text-black rotate-90  "
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
      <div className="flex flex-row gap-4 items-center">
        <h2 className="font-bold text-[16px]">Tutor</h2>
        <Image
          src="/Notification-Button.svg"
          alt="notification"
          width={20}
          height={20}
        />
        <Link href="/tutor/profile">
          <div className="sm:col-span-2  sm:mt-0 flex items-center justify-between p-1 rounded-full shadow bg-black text-white cursor-pointer">
            <ShadowInnerIcon className="w-6 h-6 text-white ml-2" />
            <div className="text-white">Norah</div>
            <TriangleDownIcon className="w-6 h-6 text-white mr-2" />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default SmallScreen;
