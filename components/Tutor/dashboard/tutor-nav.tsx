"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { TriangleDownIcon } from "@radix-ui/react-icons";
import SmallScreen from "./smallscreen";
import { useAuthContext } from "@/components/AuthProvider/AuthContext";
import SkillerLogo from "@/components/ui/logo";
import clsx from "clsx";
import { useSidebar } from "@/components/AuthProvider/sidebarContext";

const TutorNav = () => {
  const { user } = useAuthContext();
  const username = user?.username;
    const { sidebarMinimized} = useSidebar();
  
  const [showDropdown, setShowDropdown] = useState(false);

  const handleDropdownToggle = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <>
      <div
        className={clsx(
          "flex items-center w-full max-md:hidden",
          sidebarMinimized ? "justify-between mb-10 mt-4" : "justify-end"
        )}
      >
        {sidebarMinimized && (
          <div className="w-32 h-10 ">
            <SkillerLogo />
          </div>
        )}

        <div className="flex flex-row gap-4 items-center">
          <div className="flex flex-row gap-4 max-md:mt-5 items-center">
            <h2 className="font-bold text-[16px]">Tutor</h2>
            <Image
              src="/Notification-Button.svg"
              alt="notification"
              width={20}
              height={20}
            />
          </div>
          <div className="p-2 flex gap-1 items-center justify-between rounded-full shadow bg-black text-white cursor-pointer relative">
            <Image
              src="/Ellipse 1.svg"
              alt="variant"
              width={20}
              height={20}
              className="ml-2"
            />
            <Link href="/dashboard/profile" className="text-white">
              {username}
            </Link>
            <TriangleDownIcon
              className={`w-6 h-6 text-white mr-2 transform transition-transform duration-300 ${
                showDropdown ? "rotate-180" : "rotate-0"
              }`}
              onClick={handleDropdownToggle}
            />
          </div>
        </div>

        {showDropdown && (
          <div
            className={clsx(
              "absolute z-50 mt-2 rounded-xl bg-gray-800 shadow-lg w-40 p-2",
              sidebarMinimized ? "right-[260px] top-[80px] " : "top-[60px]"
            )}
          >
            <div className="flex flex-col">
              <Link href="/auth" className="text-white p-2">
                Sign Out
              </Link>
              <Link href="/dashboard" className="text-white p-2">
                Switch to student profile
              </Link>
            </div>
          </div>
        )}
      </div>

      <div>
        <SmallScreen />
      </div>
    </>
  );
};

export default TutorNav;
