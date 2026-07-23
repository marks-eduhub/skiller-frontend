import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import dynamic from "next/dynamic";
import { PiUserSwitchBold } from "react-icons/pi";
import Link from "next/link";

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
          "mb-5 rounded-[28px] border px-4 py-4 text-white transition",
          sidebarMinimized
            ? "mx-1 border-white/10 bg-white/5"
            : "border-white/10 bg-white/5 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
        )}
      >
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-400 text-lg font-semibold text-slate-950">
            T
          </div>
          {!sidebarMinimized && (
            <div>
              <p className="text-sm text-white/70">Tutor Workspace</p>
              <h2 className="text-base font-semibold">Manage your teaching</h2>
            </div>
          )}
        </div>
      </div>
      {links.map((link, index) => (
        <div key={index} className="mt-4">
          <button
            onClick={() => handleNavigation(link.path)}
            className={clsx(
              pathname.startsWith(link.path)
                ? "rounded-2xl border border-white/10 bg-white text-slate-950 shadow-[0_10px_30px_rgba(255,255,255,0.08)]"
                : "border border-transparent text-white/78 hover:border-white/10 hover:bg-white/5 hover:text-white",
              sidebarMinimized ? "mx-auto mb-6 h-12 w-12 justify-center px-0" : "w-full px-4 py-3",
              "flex items-center cursor-pointer relative group transition"
            )}
          >
            <Image src={link.src} alt={link.alt} width={22} height={22} className="ml-1" />

            {!sidebarMinimized && <h2 className="ml-4 text-[15px] font-medium">{link.name}</h2>}

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
          "mt-6 flex h-[52px] grow items-center rounded-2xl border border-white/10 bg-black p-3 text-sm font-medium text-white transition hover:bg-gray-900 md:flex-none md:px-3",
          {
            "bg-white text-slate-950": pathname === "/dashboard",
          }
        )}
      >
        <PiUserSwitchBold className={clsx("mr-2 h-6 w-8", pathname === "/dashboard" ? "text-slate-700" : "text-gray-300")} />
        {!sidebarMinimized && (
          <p className="md:block text-[15px]">Switch to student</p>
        )}
      </Link>
    </div>
  );
};

export default SideLinks;
