"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import NavLinks from "@/app/dashboard/nav-links";
import SkillerLogo from "@/components/ui/logo";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { logout } from "@/lib/userSS";

export default function SideNav() {
  const router = useRouter();
  const [sidebarMinimized, setSidebarMinimized] = useState(false);

  const toggleSidebar = () => {
    setSidebarMinimized(!sidebarMinimized);
  };
  useEffect(() => {
    // Update localStorage whenever sidebarMinimized changes
    localStorage.setItem("sidebarMinimized", `${sidebarMinimized}`);
  }, [sidebarMinimized]);

  return (
    <div
      className={`flex h-full flex-col text-white sidebar ${
        sidebarMinimized ? "minimized rounded-tr-lg rounded-br-lg" : ""
      }`}
    >
      <div className="flex items-center justify-start space-x-6 bg-black p-4 md:justify-left">
        <div
          className={`flex items-center space-x-6 cursor-pointer sidebar-header ${
            sidebarMinimized ? "rounded-tr-full rounded-br-full pl-9" : ""
          }`}
          onClick={toggleSidebar}
        >
          <HamburgerMenuIcon
            className={`w-6 h-6 text-white ${
              sidebarMinimized ? "rotate-90 " : ""
            }`}
          />
          <div className="w-28 text-white md:w-30">
            <SkillerLogo minimized={sidebarMinimized} />
          </div>
        </div>
      </div>
      <div className="h-auto w-full grow md:block bg-black">
        <NavLinks minimized={sidebarMinimized} />
      </div>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          await logout();
          router.push("/auth");
        }}
      >
        <button className="flex h-[48px] w-full grow items-center justify-center bg-black p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
          <div className="md:block p-4">Sign Out</div>
        </button>
      </form>
    </div>
  );
}
