"use client";
import { useEffect, useState } from "react";
import NavLinks from "@/components/Student/dashboadLayout/nav-links";
import SkillerLogo from "@/components/ui/logo";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import SideLinks from "./side-links";
import { IoMdClose } from "react-icons/io";

export default function SideBar() {
  
  return (
    <>
      <div className=" fixed h-full sm:flex hidden flex-col w-[250px] text-white bg-black">
        <div className="flex items-center justify-start space-x-6 p-4">
          <div className="flex items-center space-x-6 cursor-pointer">
            <HamburgerMenuIcon className="w-6 h-6 text-white" />
            <div className="w-28 text-white md:w-30">
              <SkillerLogo />
            </div>
          </div>
        </div>
        <div className="h-auto w-full grow">
          <SideLinks />
        </div>
      </div>

      
    </>
  );
}
