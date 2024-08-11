"use client";
import { useRouter } from "next/navigation";
import NavLinks from "@/components/Student/dashboadLayout/nav-links";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
// import { logout } from "@/lib/userSS";
import SmallScreenSideNav from "./smallscreens";
import { useMediaQuery } from "@mui/material";
import SkillerLogo from "@/components/ui/logo";
import { logout } from "@/lib/helpers";

interface SideNavProps {
  sidebarMinimized: boolean;
  toggleSidebar: () => void;
}
const SideNav = ({ sidebarMinimized, toggleSidebar }: SideNavProps) => {
  

  const router = useRouter();
  const isSmallScreen = useMediaQuery("(max-width: 768px)");

  return (
    <div
      className={`${
        sidebarMinimized ? "w-[130px] " : "w-[250px]"
      } transition-width duration-300 ease rounded-br-[20px] rounded-tr-[20px] bg-black hidden sm:flex h-full flex-col text-white`}
    >
      {isSmallScreen ? (
        <SmallScreenSideNav />
      ) : (
        <div
          className={`flex items-center justify-start space-x-6 cursor-pointer bg-black p-4 md:justify-left ${
            sidebarMinimized ? "pl-9" : ""
          }`}
        >
          <HamburgerMenuIcon
            className={`w-6 h-6 text-white ${
              sidebarMinimized ? "rotate-90 mt-2 ml-4" : ""
            }`}
            onClick={toggleSidebar}
          />
          {!sidebarMinimized && (
            <div className="w-28 text-white md:w-30">
              <SkillerLogo />
            </div>
          )}
        </div>
      )}
      {isSmallScreen ? null : (
        <div className="h-auto w-full grow md:block bg-black">
          <NavLinks minimized={sidebarMinimized} />
        </div>
      )}
      <form
        onSubmit={(e) => {
          e.preventDefault();
         logout();
          router.push("/auth");
        }}
      >
        <button className="flex h-[48px] w-full grow items-center justify-center bg-black p-3 text-sm font-medium hover:bg-gray-900 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
          <div className="md:block p-4">Sign Out</div>
        </button>
      </form>
    </div>
  );
}

export default SideNav;