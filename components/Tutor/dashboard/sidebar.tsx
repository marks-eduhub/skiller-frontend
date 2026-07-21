"use client";
import SkillerLogo from "@/components/ui/logo";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import SideLinks from "./side-links";
import { useMediaQuery } from "@mui/material";
import SmallScreen from "./smallscreen";
import { useSidebar } from "@/components/AuthProvider/sidebarContext";


const SideBar = () => {
  const isSmallScreen = useMediaQuery("(max-width: 768px)");
  const { sidebarMinimized, toggleSidebar } = useSidebar();


  return (
    <>
      {isSmallScreen ? (
        <SmallScreen />
      ) : (
        <div
          className={`fixed h-full sm:flex hidden flex-col ${
            sidebarMinimized ? "w-[116px]" : "w-[224px]"
          } text-white bg-black`}
        >
          <div className="flex items-center justify-start space-x-4 px-4 py-3">
            <div className="flex items-center space-x-4 cursor-pointer">
            <HamburgerMenuIcon
              className={`w-6 h-6 text-white ${
                sidebarMinimized ? "rotate-90 mt-1 ml-4" : ""
              }`}
              onClick={toggleSidebar}
            />              {!sidebarMinimized && (
                <div className="w-24 text-white">
                  <SkillerLogo />
                </div>
              )}
            </div>
          </div>
          <div className="h-auto w-full grow">
            <SideLinks  sidebarMinimized={sidebarMinimized}/>
          </div>
        </div>
      )}
    </>
  );
};

export default SideBar;
