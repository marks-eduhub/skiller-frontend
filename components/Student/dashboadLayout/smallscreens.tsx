import React, { useState } from "react";
import { HamburgerMenuIcon, MagnifyingGlassIcon } from "@radix-ui/react-icons";
import {NavLinks} from "@/components/Student/dashboadLayout/nav-links";
import SkillerLogo from "@/components/ui/logo";
import { IoMdClose } from "react-icons/io";
import Image from "next/image";

const SmallScreenSideNav = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="pt-6 px-5 relative">
      <div className="flex  items-center justify-between w-full">
        <div className="w-24 text-white">
          <SkillerLogo />
        </div>
        <div className="flex w-48 items-center rounded-lg shadow bg-white p-2 cursor-pointer">
        <Image src="/magnify.svg" alt="magnify" width={30} height={30} />
        <input
            type="text"
            placeholder="Search..."
            className="outline-none bg-transparent ml-2"
          />
        </div>

        <div className="cursor-pointer" onClick={toggleSidebar}>
          <HamburgerMenuIcon
            className={`w-6 h-6  ${sidebarOpen ? "text-white" : "text-black"}`}
          />
        </div>
      </div>

      <div
        className={`fixed top-0 left-0 h-full bg-black text-white z-40 transition-transform transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } w-64 duration-300 ease-in-out`}
      >
        <div className="flex justify-between gap-1 items-center p-4 bg-gray-900">
          <div className="w-36">
            <SkillerLogo />
          </div>
          <IoMdClose
                onClick={toggleSidebar}
                className="text-white "
                style={{ width: "40px", height: "30px" }}
              />
        </div>

        <div className="p-4">
          <NavLinks minimized={false} />
        </div>

        <form
          onSubmit={async (e) => {
            e.preventDefault();
          }}
        >
          <button className="w-full bg-gray-800 p-3 mt-4 text-sm font-medium hover:bg-gray-600">
            Sign Out
          </button>
        </form>
      </div>

      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black opacity-50"
          onClick={toggleSidebar}
        />
      )}
    </div>
  );
};

export default SmallScreenSideNav;
