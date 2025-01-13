import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { TriangleDownIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";
import { useAuthContext } from "@/Context/AuthContext";
import Greeting from "@/lib/greeting";
import SkillerLogo from "@/components/ui/logo";
import SearchBar from "./searchbar";

interface NavBarProps {
  sidebarMinimized: boolean;
}

const Navbar: React.FC<NavBarProps> = ({ sidebarMinimized }) => {
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);
  const { user } = useAuthContext();
  const username = user?.username || "Guest";

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const hiddenRoutes = ["/dashboard/profile"];
  const hideGreetingAndSearch = isMounted && hiddenRoutes.includes(pathname);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleDropdownToggle = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <>
      <nav className="max-md:hidden">
        <div className="flex items-center justify-between w-full">
          {!sidebarMinimized ? (
            <>
              {!hideGreetingAndSearch && <Greeting username={username} />}
              <div className="flex items-center gap-10 ml-auto">
                {/* <p className="rounded-full px-6 py-2 shadow text-black bg-white">
                  Premium
                </p> */}
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
                      showDropdown ? 'rotate-180' : 'rotate-0'
                    }`}
                    onClick={handleDropdownToggle}
                  />
                  {showDropdown && (
                    <div className="absolute top-full w-48  right-0 z-50 mt-4 rounded-xl bg-gray-800 shadow-lg p-2">
                      <div className="flex flex-col">
                        <Link href="/auth">
                          <p className="text-white p-2">Sign Out</p>
                        </Link>
                        <Link href="/tutor/dashboard" className="text-white p-2">
                          <p>Switch to tutor profile</p>
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </>
          ) : (
            <div className="w-full flex items-center justify-between mt-3 mb-10">
              <div className="w-32 h-10 mr-10">
                <SkillerLogo />
              </div>
              {/* <div>
                <SearchBar />
              </div> */}
              <div className="sm:col-span-10 w-1/2 flex items-center rounded-lg shadow bg-white p-3 cursor-pointer">
                {/* <MagnifyingGlassIcon className="w-6 h-6 text-black mr-2" />
                <input
                  type="text"
                  placeholder="Search for classes or tutors"
                  className="flex-1 outline-none bg-transparent"
                 
                /> */}
                <SearchBar />
              </div>
              <div className="flex items-center gap-10">
                {/* <p className="rounded-full px-6 py-2 shadow text-black bg-white">
                  Premium
                </p> */}
                <div className="p-2 flex items-center justify-between rounded-full shadow bg-black text-white cursor-pointer relative">
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
                      showDropdown ? 'rotate-180' : 'rotate-0'
                    }`}
                    onClick={handleDropdownToggle}
                  />
                  {showDropdown && (
                    <div className="absolute  z-50 mt-2 rounded-md bg-gray-800 shadow-lg p-2">
                      <div className="flex flex-col">
                        <Link href="/auth">
                          <p className="text-white p-2">Sign Out</p>
                        </Link>
                        <Link href="/tutor/dashboard" className="text-white p-2">
                          <p>Switch to tutor dashboard</p>
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
        {!sidebarMinimized && !hideGreetingAndSearch && (
          <div>
            <SearchBar />
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
