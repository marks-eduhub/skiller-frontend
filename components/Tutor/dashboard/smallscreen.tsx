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
    <div className="sm:hidden absolute top-0 left-5 right-5 z-50 flex items-center justify-between gap-2 pt-6">
      <div className="w-16 shrink-0 text-white">
          <SkillerLogo />
        </div>
        <div className="flex min-w-0 flex-1 items-center justify-end gap-2">
          <Link
            href="/dashboard"
            className="shrink-0 whitespace-nowrap rounded-full border border-black/15 bg-white px-3 py-2 text-xs font-medium text-black shadow-sm"
          >
            Student
          </Link>
          <div className="flex min-w-0 max-w-[140px] flex-1 items-center rounded-lg shadow bg-white p-2 cursor-pointer">
          <Image src="/magnify.svg" alt="magnify" width={18} height={18} className="shrink-0" />
          <input
            type="text"
            placeholder="Search..."
            className="min-w-0 w-full outline-none bg-transparent ml-2 text-sm"
          />
        </div>
        </div>
      <HamburgerMenuIcon
        className="w-6 h-6 shrink-0 cursor-pointer text-black rotate90  "
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
              <SideLinks sidebarMinimized={false} />
            </div>
          </div>
        </div>
      )}
     
    </div>
  );
};

export default SmallScreen;
