"use client";
import { useRouter } from "next/navigation";
import { NavLinks } from "@/components/Student/dashboadLayout/nav-links";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import SmallScreenSideNav from "./smallscreens";
import { useMediaQuery } from "@mui/material";
import SkillerLogo from "@/components/ui/logo";
import { logout } from "@/lib/helpers";
import { useState } from "react";
import dynamic from "next/dynamic";

const DotPulseWrapper = dynamic(() => import("@/hooks/pulse"), { ssr: false });
interface SideNavProps {
  sidebarMinimized: boolean;
  toggleSidebar: () => void;
  onNavigate: (path: string) => void;
}

const SideNav: React.FC<SideNavProps> = ({
  sidebarMinimized,
  toggleSidebar,
  onNavigate,
}) => {
  const router = useRouter();
  const isSmallScreen = useMediaQuery("(max-width: 768px)");
  const [loading, setLoading] = useState(false);

  const handleNavigation = (href: string) => {
    if (onNavigate) {
      onNavigate(href);
    }
  };
  const handleSignOut = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    logout();

    setLoading(false);
    router.push("/auth");
  };
  return (
    <>
      {isSmallScreen ? (
        <SmallScreenSideNav onNavigate={handleNavigation} />
      ) : (
        <div
          className={`${
            sidebarMinimized ? "w-[130px]" : "w-[250px]"
          } transition-width duration-300 ease rounded-br-[20px] rounded-tr-[20px] bg-black h-full flex flex-col text-white`}
        >
          <div
            className={`flex items-center justify-start space-x-6 cursor-pointer bg-black p-4 ${
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
              <div className="w-28 text-white">
                <SkillerLogo />
              </div>
            )}
          </div>
          <div className="h-auto w-full grow bg-black">
            <NavLinks
              minimized={sidebarMinimized}
              onNavigate={handleNavigation}
            />
          </div>
          <form onSubmit={handleSignOut}>
            <button
              type="submit"
              className="flex h-[48px] w-full grow items-center bg-black p-3 text-sm font-medium hover:bg-gray-900 justify-start hover:text-blue-600"
              disabled={loading} 
            >
              {loading ? (
                <DotPulseWrapper
                  type="metronome"
                  size="30"
                  speed="1.75"
                  color="white"
                />
              ) : (
                <div className="p-4">Sign Out</div>
              )}
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default SideNav;
