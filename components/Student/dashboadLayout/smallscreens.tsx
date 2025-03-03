import React, { useState } from "react";
import { HamburgerMenuIcon} from "@radix-ui/react-icons";
import {NavLinks} from "@/components/Student/dashboadLayout/nav-links";
import SkillerLogo from "@/components/ui/logo";
import { IoMdClose } from "react-icons/io";
import Image from "next/image";
import dynamic from "next/dynamic";
import { logout } from "@/lib/helpers";
import { useRouter } from "next/navigation";

const DotPulseWrapper = dynamic(() => import("@/hooks/pulse"), { ssr: false });

interface SmallScreenProps {
  onNavigate?: (path: string) => void;
}
const SmallScreenSideNav:React.FC<SmallScreenProps> = ({onNavigate}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
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
        className={`fixed top-0 left-0 h-full bg-black text-white z-50 transition-transform transform ${
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
        <NavLinks minimized={false} onNavigate={(href) => {
            toggleSidebar(); 
            handleNavigation(href); 
          }} />
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
                  size="40"
                  speed="1.75"
                  color="white"
                />
              ) : (
                <div className="p-4">Sign Out</div>
              )}
            </button>
          </form>
      </div>

    </div>
  );
};

export default SmallScreenSideNav;
