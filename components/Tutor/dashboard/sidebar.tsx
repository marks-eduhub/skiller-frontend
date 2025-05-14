"use client";
import SkillerLogo from "@/components/ui/logo";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import SideLinks from "./side-links";
import { useMediaQuery } from "@mui/material";
import SmallScreen from "./smallscreen";

interface SideBarProps {
  sidebarMinimized: boolean;
  toggleSidebar: () => void;

}

const SideBar: React.FC<SideBarProps> = ({ sidebarMinimized , toggleSidebar}) => {
  const isSmallScreen = useMediaQuery("(max-width: 768px)");

  return (
    <>
      {isSmallScreen ? (
        <SmallScreen />
      ) : (
        <div
          className={`fixed h-full sm:flex hidden flex-col ${
            sidebarMinimized ? "w-[132px]" : "w-[250px]"
          } text-white bg-black`}
        >
          <div className="flex items-center justify-start space-x-6 p-4">
            <div className="flex items-center space-x-6 cursor-pointer">
            <HamburgerMenuIcon
              className={`w-6 h-6 text-white ${
                sidebarMinimized ? "rotate-90 mt-2 ml-6" : ""
              }`}
              onClick={toggleSidebar}
            />              {!sidebarMinimized && (
                <div className="w-28 text-white md:w-30">
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