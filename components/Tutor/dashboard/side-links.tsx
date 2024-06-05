import React, { useState } from "react";
import Image from "next/image";

const links = [
  { src: "/course.svg", alt: "courses", name: "Courses" },
  { src: "/people.svg", alt: "community", name: "Community" },
  { src: "/tools.svg", alt: "tools", name: "Tools" },
  { src: "/performance.svg", alt: "performance", name: "Performance" },
  { src: "/communications.svg", alt: "communications", name: "Communications" },
  { src: "/resources.svg", alt: "resources", name: "Resources" },
];

const subOptions = {
  Communications: ["Q & A", "Messages", "Assignments", "Announcements"],
};

const SideLinks = () => {
  const [openSubOptions, setOpenSubOptions] = useState<string | null>(null);

  const handleClick = (name: string) => {
    setOpenSubOptions((prev) => (prev === name ? null : name));
  };

  return (
    <div className="">
      {links.map((link, index) => (
        <div key={index} className="ml-5 mt-6">
          <div
            className="flex flex-row cursor-pointer"
            onClick={() => handleClick(link.name)}
          >
            <Image src={link.src} alt={link.alt} width={20} height={20} />
            <h2 className="ml-6 ">{link.name}</h2>
          </div>
          {openSubOptions === link.name &&
            (subOptions[link.name as keyof typeof subOptions] || []).map(
              (option, subIndex) => (
                <div
                  key={subIndex}
                  className="ml-12 mt-2 cursor-pointer text-white"
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
