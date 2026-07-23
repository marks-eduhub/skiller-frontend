import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import dynamic from "next/dynamic";
import { PiUserSwitchBold } from "react-icons/pi";
import Link from "next/link";
import {
  HiOutlineAcademicCap,
  HiOutlineRectangleStack,
  HiOutlineSparkles,
  HiOutlineUserCircle,
  HiOutlineUserGroup,
} from "react-icons/hi2";

const DotPulseWrapper = dynamic(() => import("@/hooks/pulse"), { ssr: false });

interface SideLinksProps {
  sidebarMinimized: boolean;
}

const SideLinks: React.FC<SideLinksProps> = ({ sidebarMinimized }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);
  const [openSubOptions, setOpenSubOptions] = useState<string | null>(null);

  const handleNavigation = (path: string) => {
    setLoading(true);
    setTimeout(() => {
      router.push(path);
      setLoading(false);
    }, 1000);
  };

  const handleOptions = (subOptions: string) => {
    handleNavigation(`/tutor/dashboard/communications/${subOptions}`);
  };

  const handleClick = (name: string) => {
    setOpenSubOptions((prev) => (prev === name ? null : name));
  };

  const links = [
    {
      icon: HiOutlineRectangleStack,
      name: "Courses",
      path: "/tutor/dashboard",
    },
    {
      icon: HiOutlineUserGroup,
      name: "Community",
      path: "/tutor/dashboard/communications/QandA",
    },
    {
      icon: HiOutlineUserCircle,
      name: "Profile",
      path: "/dashboard/profile",
    },
    // {
    //   src: "/tools.svg",
    //   alt: "tools",
    //   name: "Tools",
    //   path: "/tutor/dashboard/tools",
    // },
    // {
    //   src: "/performance.svg",
    //   alt: "performance",
    //   name: "Performance",
    //   path: "/tutor/dashboard/performance",
    // },
    // {
    //   src: "/communications.svg",
    //   alt: "communications",
    //   name: "Communications",
    // },
    // {
    //   src: "/resources.svg",
    //   alt: "resources",
    //   name: "Resources",
    //   path: "/tutor/dashboard/resources",
    // },
  ];

  const subOptions = {
    Communications: ["QandA", "Messages", "Assignments", "Announcements"],
  };

  return (
    <div className="relative px-2 pb-6 pt-4">
      {loading && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-opacity-80">
          <DotPulseWrapper
            type="metronome"
            size="40"
            speed="1.75"
            color="white"
          />
        </div>
      )}
      <div
        className={clsx(
          "mb-4 rounded-[22px] border px-3 py-3 text-white transition",
          sidebarMinimized
            ? "mx-1 border-white/10 bg-white/5"
            : "border-white/10 bg-white/5 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
        )}
      >
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-slate-950">
            <HiOutlineSparkles className="h-[17px] w-[17px]" />
          </div>
          {!sidebarMinimized && (
            <div>
              <p className="text-[10px] text-white/60">Tutor Workspace</p>
              <h2 className="text-[12px] font-medium">Manage your teaching</h2>
            </div>
          )}
        </div>
      </div>
      {links.map((link, index) => (
        <div key={index} className="mt-4">
          <link.icon
            className="hidden"
            aria-hidden="true"
          />
          <button
            onClick={() => handleNavigation(link.path)}
            className={clsx(
              pathname.startsWith(link.path)
                ? "rounded-2xl border border-white/10 bg-white text-slate-950 shadow-[0_10px_24px_rgba(255,255,255,0.08)]"
                : "border border-transparent text-white/72 md:hover:-translate-y-0.5 md:hover:border-white/10 md:hover:bg-white/8 md:hover:text-white",
              sidebarMinimized ? "mx-auto mb-5 h-10 w-10 justify-center px-0" : "w-full px-3 py-2.5",
              "flex items-center cursor-pointer relative group transition duration-200"
            )}
          >
            <div
              className={clsx(
                "flex items-center justify-center rounded-xl transition",
                pathname.startsWith(link.path)
                  ? "bg-slate-100 text-slate-900"
                  : "bg-white/6 text-white/80 md:group-hover:bg-white/10 md:group-hover:text-white",
                sidebarMinimized ? "h-8 w-8" : "h-8 w-8"
              )}
            >
              <link.icon className="h-4 w-4" />
            </div>

            {!sidebarMinimized && <h2 className="ml-3 text-[13px] font-medium">{link.name}</h2>}

            {sidebarMinimized && (
              <span className="absolute left-12 rounded-md bg-black px-2 py-1 text-sm text-white opacity-0 transition-opacity group-hover:opacity-100">
                {link.name}
              </span>
            )}
          </button>
        </div>
      ))}

      <Link
        href="/dashboard"
        className={clsx(
          "mt-5 flex h-[46px] grow items-center rounded-2xl border border-white/10 bg-black px-3 py-2 text-sm font-medium text-white transition md:flex-none md:hover:-translate-y-0.5 md:hover:border-white/20 md:hover:bg-gray-900",
          {
            "bg-white text-slate-950": pathname === "/dashboard",
          }
        )}
      >
        <div
          className={clsx(
            "mr-2 flex h-7 w-7 items-center justify-center rounded-xl",
            pathname === "/dashboard"
              ? "bg-slate-100 text-slate-700"
              : "bg-white/8 text-gray-300"
          )}
        >
          <PiUserSwitchBold className="h-4 w-4" />
        </div>
        {!sidebarMinimized && (
          <p className="md:block text-[13px]">Switch to student</p>
        )}
      </Link>
    </div>
  );
};

export default SideLinks;
