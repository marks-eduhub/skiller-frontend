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
          "hidden w-full items-center rounded-[28px] border border-white/70 bg-white/75 px-5 py-4 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur max-md:hidden",
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
            className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-900 shadow-sm transition hover:border-slate-900 hover:bg-slate-900 hover:text-white"
          >
            Student Dashboard
          </Link>
          <Link
            href="/"
            className="rounded-full border border-amber-200 bg-amber-50 px-4 py-2 text-sm font-medium text-amber-900 shadow-sm transition hover:border-amber-500 hover:bg-amber-500 hover:text-white"
          >
            Normal View
          </Link>
          <div className="flex flex-row items-center gap-3 max-md:mt-5">
            <h2 className="rounded-full bg-emerald-50 px-3 py-1 text-[15px] font-semibold text-emerald-800">
              Tutor
            </h2>
            <Image
              src="/Notification-Button.svg"
              alt="notification"
              width={18}
              height={18}
            />
          </div>
          <div className="relative flex min-w-[180px] items-center justify-between gap-1 rounded-full bg-slate-950 px-2 py-1.5 text-white shadow-[0_12px_30px_rgba(15,23,42,0.28)]">
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
