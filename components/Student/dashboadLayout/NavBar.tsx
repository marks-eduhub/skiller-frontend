import React, { useState } from "react";
import { TriangleDownIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";
import { useAuthContext } from "@/components/AuthProvider/AuthContext";
import Greeting from "@/lib/greeting";
import SkillerLogo from "@/components/ui/logo";
import SearchBar from "./searchbar";
import { useFetchTutors } from "@/hooks/useCourses";
import { useFetchUserDetails } from "@/hooks/useProfile";

interface NavBarProps {
  sidebarMinimized: boolean;
}

const Navbar: React.FC<NavBarProps> = ({ sidebarMinimized }) => {
  const { user } = useAuthContext();
  const username = user?.username || "Guest";
  const { data } = useFetchTutors();
  const { data: userDetails } = useFetchUserDetails(Number(user?.id));
  const isTutor = data?.data?.some(
    (tutor: any) => tutor.attributes?.user?.data?.id === user?.id
  );
  const [showDropdown, setShowDropdown] = useState(false);
  const profileImage =
    userDetails?.profilepicture?.formats?.thumbnail?.url ||
    userDetails?.profilepicture?.formats?.small?.url ||
    userDetails?.profilepicture?.url ||
    "/profilepicture.webp";

  const handleDropdownToggle = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <>
      <nav className="max-md:hidden">
        <div className="flex items-center justify-between w-full">
          {!sidebarMinimized ? (
            <>
              <Greeting username={username} />
              <div className="ml-auto flex items-center gap-5">
                <Link
                  href={
                    isTutor
                      ? "/tutor/dashboard"
                      : "/dashboard/profile?setupTutor=yes"
                  }
                  className="rounded-full border border-black/15 bg-white px-4 py-2 text-sm font-medium text-black shadow-sm transition hover:bg-black hover:text-white"
                >
                  {isTutor ? "Tutor Dashboard" : "Set Up Tutor Profile"}
                </Link>
                {/* <p className="rounded-full px-6 py-2 shadow text-black bg-white">
                  Premium
                </p> */}
                <div className="relative flex min-w-[160px] items-center justify-between gap-1 rounded-full bg-black px-2 py-1.5 text-white shadow">
                  <Image
                    src={profileImage}
                    alt={username}
                    width={28}
                    height={28}
                    className="ml-1 h-7 w-7 rounded-full object-cover"
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
                  {showDropdown && (
                    <div className="absolute top-full w-48  right-0 z-50 mt-4 rounded-xl bg-gray-800 shadow-lg p-2">
                      <div className="flex flex-col">
                        <Link href="/auth">
                          <p className="text-white p-2">Sign Out</p>
                        </Link>
                        {isTutor && (
                          <Link href="/tutor/dashboard">
                            <p>Switch to tutor dashboard</p>
                          </Link>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </>
          ) : (
            <div className="relative mb-8 mt-2 flex w-full items-center justify-between gap-5">
              <div className="mr-4 h-9 w-28">
                <SkillerLogo />
              </div>

              <div className="cursor-pointer">
                <SearchBar />
              </div>

              <div className="flex items-center gap-5">
                <Link
                  href={
                    isTutor
                      ? "/tutor/dashboard"
                      : "/dashboard/profile?setupTutor=yes"
                  }
                  className="rounded-full border border-black/15 bg-white px-4 py-2 text-sm font-medium text-black shadow-sm transition hover:bg-black hover:text-white"
                >
                  {isTutor ? "Tutor Dashboard" : "Set Up Tutor Profile"}
                </Link>
                {/* <p className="rounded-full px-6 py-2 shadow text-black bg-white">
                  Premium
                </p> */}
                <div className="relative flex min-w-[160px] items-center justify-between rounded-full bg-black px-2 py-1.5 text-white shadow">
                  <Image
                    src={profileImage}
                    alt={username}
                    width={28}
                    height={28}
                    className="ml-1 h-7 w-7 rounded-full object-cover"
                  />
                  <Link href="/dashboard/profile" className="ml-2 truncate text-sm text-white">
                    {username}
                  </Link>
                  <TriangleDownIcon
                    className={`relative mr-1 h-5 w-5 text-white transform transition-transform duration-300 ${
                      showDropdown ? "rotate-180" : "rotate-0"
                    }`}
                    onClick={handleDropdownToggle}
                  />
                  {showDropdown && (
                    <div className="absolute z-50 mt-2 top-full left-0 right-0 rounded-md bg-gray-800 shadow-lg p-2">
                      <div className="flex flex-col">
                        <Link href="/auth">
                          <p className="text-white p-2">Sign Out</p>
                        </Link>
                        {isTutor && (
                          <Link href="/tutor/dashboard">
                            <p>Switch to tutor dashboard</p>
                          </Link>
                        )}
                        
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
        {!sidebarMinimized && (
          <div>
            <SearchBar />
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
