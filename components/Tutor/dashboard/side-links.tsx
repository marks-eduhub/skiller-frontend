import React from "react";
import Image from "next/image";

const links = [
  { src: "/course.svg", alt: "courses", name: "Courses" },
  { src: "/people.svg", alt: "community", name: "Community" },
  { src: "/tools.svg", alt: "tools", name: "Tools" },
  { src: "/performance.svg", alt: "performance", name: "Performance" },
  { src: "/communications.svg", alt: "communications", name: "Communications" },
  { src: "/resources.svg", alt: "resources", name: "Resources" },
];

const SideLinks = () => {
  return (
    <div className="">
      {links.map((link, index) => (
        <div className="flex flex-row ml-5 mt-6 cursor-pointer" key={index}>
          <Image src={link.src} alt={link.alt} width={20} height={20} />
          <h2 className="ml-6">{link.name}</h2>
        </div>
      ))}
    </div>
  );
};

export default SideLinks;
