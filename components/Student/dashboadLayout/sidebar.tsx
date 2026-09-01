"use client";
import { useRouter } from "next/navigation";
import { NavLinks } from "@/components/Student/dashboadLayout/nav-links";
import { ExitIcon, HamburgerMenuIcon } from "@radix-ui/react-icons";
import SmallScreenSideNav from "./smallscreens";
import { useMediaQuery } from "@mui/material";
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
          className="w-full h-full flex flex-col rounded-br-xl rounded-tr-xl bg-primary text-primary-foreground transition-[width] duration-300 ease"
        >
          <button
            type="button"
            onClick={toggleSidebar}
            aria-label={sidebarMinimized ? "Expand sidebar" : "Collapse sidebar"}
            className={`flex h-14 items-center bg-primary px-4 py-3 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-primary ${
              sidebarMinimized ? "justify-center px-0" : "justify-start"
            }`}
          >
            <HamburgerMenuIcon className="h-6 w-6 shrink-0 text-primary-foreground" />
          </button>
          <div className="h-auto w-full grow bg-primary">
            <NavLinks
              minimized={sidebarMinimized}
              onNavigate={handleNavigation}
            />
          </div>
          <form onSubmit={handleSignOut}>
            <button
              type="submit"
              aria-label="Sign Out"
              className={`flex h-11 w-full items-center gap-3 bg-primary p-3 text-sm font-medium text-primary-foreground/70 hover:bg-white/10 hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-primary ${
                sidebarMinimized ? "justify-center" : "justify-start"
              }`}
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
                <>
                  <ExitIcon className="h-5 w-5 shrink-0" />
                  {!sidebarMinimized && <span>Sign Out</span>}
                </>
              )}
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default SideNav;
