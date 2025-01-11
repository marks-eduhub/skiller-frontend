"use client"

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShadowInnerIcon, TriangleDownIcon } from "@radix-ui/react-icons";
import SmallScreen from "./smallscreen";
import { useAuthContext } from "@/Context/AuthContext";

const TutorNav = () => {
  const { user } = useAuthContext();
  const username = user?.username;
  const [showDropdown, setShowDropdown] = useState(false);

  const handleDropdownToggle = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <>
      <div className="sm:flex hidden justify-end">
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
          <div className="absolute top-[60px] z-50 mt-2 rounded-xl bg-gray-800 shadow-lg w-40 p-2">
            <div className="flex flex-col">
            <Link href="/auth/logout" className="text-white p-2">
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
