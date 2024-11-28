import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const SideLinks = () => {
  const router = useRouter();
  const pathname = usePathname();
  const handleOptions = (subOptions: string) => {
    router.push(`/tutor/dashboard/communications/${subOptions}`);
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
      path: "/tutor/dashboard/courseview",
    },
    {
      src: "/tools.svg",
      alt: "tools",
      name: "Tools",
      path: "/tutor/dashboard/tools",
    },
    {
      src: "/performance.svg",
      alt: "performance",
      name: "Performance",
      path: "/tutor/dashboard/performance",
    },
    {
      src: "/communications.svg",
      alt: "communications",
      name: "Communications",
    },
    {
      src: "/resources.svg",
      alt: "resources",
      name: "Resources",
      path: "/tutor/dashboard/resources",
    },
  ];

  const subOptions = {
    Communications: ["QandA", "Messages", "Assignments", "Announcements"],
  };

  const [openSubOptions, setOpenSubOptions] = useState<string | null>(null);

  const handleClick = (name: string) => {
    setOpenSubOptions((prev) => (prev === name ? null : name));
  };

  return (
    <div className="">
      {links.map((link, index) => (
        <div key={index} className="ml-5 mt-6">
          {link.path ? (
            <Link href={link.path}>
              <div
                className={clsx(
                  link.path === pathname ? "bg-gray-700 rounded px-4 py-2" : "text-white",
                  "flex flex-row cursor-pointer"
                )}
              >
                <Image src={link.src} alt={link.alt} width={20} height={20} />
                <h2 className="ml-6">{link.name}</h2>
              </div>
            </Link>
          ) : (
            <div
              className="flex flex-row cursor-pointer"
              onClick={() => handleClick(link.name)}
            >
              <Image src={link.src} alt={link.alt} width={20} height={20} />
              <h2 className="ml-6 ">{link.name}</h2>
            </div>
          )}
          {openSubOptions === link.name &&
            (subOptions[link.name as keyof typeof subOptions] || []).map(
              (option, subIndex) => (
                <div
                  key={subIndex}
                  className="ml-12 mt-2 cursor-pointer text-white"
                  onClick={() => handleOptions(option)}
                >
                  {option}
                </div>
              )
            )}
        </div>
      ))}
    </div>
  );
};

export default SideLinks;
