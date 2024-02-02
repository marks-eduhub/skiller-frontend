import clsx from "clsx";
import { AiFillHome } from "react-icons/ai";


const links = [
  { name: "Home", href: "/dashboard", icon: AiFillHome },
  {
    name: "In Progress",
    href: "/dashboard/inProgress",
    icon: AiFillHome,
  },
  { name: "Completed", href: "/dashboard/completed", icon: AiFillHome },
];

export default function NavLinks() {
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <a
            key={link.name}
            href={link.href}
            className={clsx(
              "flex h-[48px] grow items-end p-3 text-sm font-medium bg-black hover:bg-sky-100 hover:text-blue-600 md:flex-none md:p-2 md:px-3",
              {
                "ml-2": link.name === "Home",
                "ml-20": link.name !== "Home",
              }
            )}
          >
            <LinkIcon
              className={clsx("w-10 h-7", {
                "visible mr-2": link.name === "Home",
                hidden: link.name !== "Home",
              })}
            />
            <p className="md:block">{link.name}</p>
          </a>
        );
      })}
    </>
  );
}
