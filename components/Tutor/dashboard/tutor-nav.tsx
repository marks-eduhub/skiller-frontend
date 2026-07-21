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
          "hidden w-full items-center max-md:hidden",
          sidebarMinimized ? "mb-8 mt-2 justify-between" : "justify-end"
        )}
      >
        {sidebarMinimized && (
          <div className="h-10 w-28">
            <SkillerLogo />
          </div>
        )}

        <div className="flex flex-row items-center gap-3">
          <Link
            href="/dashboard"
            className="rounded-full border border-black/15 bg-white px-4 py-2 text-sm font-medium text-black shadow-sm transition hover:bg-black hover:text-white"
          >
            Student Dashboard
          </Link>
          <div className="flex flex-row items-center gap-3 max-md:mt-5">
            <h2 className="text-[15px] font-semibold">Tutor</h2>
            <Image
              src="/Notification-Button.svg"
              alt="notification"
              width={18}
              height={18}
            />
          </div>
          <div className="relative flex min-w-[160px] items-center justify-between gap-1 rounded-full bg-black px-2 py-1.5 text-white shadow">
            <Image
              src="/Ellipse 1.svg"
              alt="variant"
              width={18}
              height={18}
              className="ml-1"
            />
            <Link href="/dashboard/profile" className="truncate text-sm text-white">
              {username}
            </Link>
            <TriangleDownIcon
              className={`mr-1 h-5 w-5 text-white transform transition-transform duration-300 ${
                showDropdown ? "rotate-180" : "rotate-0"
              }`}
              onClick={handleDropdownToggle}
            />
          </div>
        </div>

        {showDropdown && (
          <div
            className={clsx(
              "absolute z-50 mt-2 w-44 rounded-xl bg-gray-800 p-2 shadow-lg",
              sidebarMinimized ? "right-[220px] top-[68px]" : "top-[52px]"
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
