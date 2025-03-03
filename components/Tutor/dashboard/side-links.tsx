import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import Loader from "@/components/Student/loader";
import dynamic from "next/dynamic";

const DotPulseWrapper = dynamic(() => import("@/hooks/pulse"), { ssr: false });
const SideLinks = () => {
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
         <DotPulseWrapper type="metronome" size="40" speed="1.75" color="white" />
        </div>
      )}
      {links.map((link, index) => (
        <div key={index} className="ml-5 mt-6">
          {link.path ? (
            <button
              onClick={() => handleNavigation(link.path)}
              className={clsx(
                pathname.startsWith(link.path)
                  ? "bg-gray-700 rounded px-10 py-2"
                  : "text-white",
                "flex flex-row cursor-pointer"
              )}
            >
              <Image src={link.src} alt={link.alt} width={20} height={20} />
              <h2 className="ml-6">{link.name}</h2>
            </button>
          ) : (
            <div className="flex flex-row cursor-pointer" onClick={() => handleClick(link.name)}>
              <Image src={link.src} alt={link.alt} width={20} height={20} />
              <h2 className="ml-6">{link.name}</h2>
            </div>
          )}
          {openSubOptions === link.name &&
            (subOptions[link.name as keyof typeof subOptions] || []).map((option, subIndex) => (
              <div
                key={subIndex}
                className="ml-12 mt-2 cursor-pointer text-white"
                onClick={() => handleOptions(option)}
              >
                {option}
              </div>
            ))}
        </div>
      ))}
    </div>
  );
};

export default SideLinks;
