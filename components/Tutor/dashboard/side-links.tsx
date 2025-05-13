import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import dynamic from "next/dynamic";
import { PiUserSwitchBold } from "react-icons/pi";

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
      src: "/course.svg",
      alt: "courses",
      name: "Courses",
      path: "/tutor/dashboard",
    },
    {
      src: "/people.svg",
      alt: "community",
      name: "Community",
      path: "/dashboard/community",
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
    <div className="relative">
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
      {links.map((link, index) => (
        <div key={index} className="mt-6">
          <button
            onClick={() => handleNavigation(link.path)}
            className={clsx(
              pathname.startsWith(link.path) && !sidebarMinimized
                ? "bg-gray-700 rounded px-6 py-2 ml-4"
                : "text-white",
              sidebarMinimized ? "ml-8 mb-10" : "ml-4",
              "flex items-center cursor-pointer relative group"
            )}
          >
            <Image src={link.src} alt={link.alt} width={25} height={25} className="ml-2" />

            {!sidebarMinimized && <h2 className="ml-6">{link.name}</h2>}

            {sidebarMinimized && (
              <span className="absolute left-12 bg-black text-white text-sm px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                {link.name}
              </span>
            )}
          </button>
        </div>
      ))}

      <div
        onClick={() => handleNavigation("/dashboard")}
        className={clsx(
          "flex h-[48px] grow mt-4 items-end p-3 ml-2 text-sm font-medium sm:hidden bg-black hover:bg-gray-900 hover:rounded-md md:flex-none md:p-2 md:px-3 cursor-pointer",
          {
            "bg-gray-700 text-white rounded ": pathname === "/dashboard",
          }
        )}
      >
        <PiUserSwitchBold className="w-10 h-7 mr-2 text-gray-300" />
        {!sidebarMinimized && (
          <p className="md:block text-[15px]">Switch to student</p>
        )}
      </div>
    </div>
  );
};

export default SideLinks;
