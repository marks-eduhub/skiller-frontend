import clsx from "clsx";
import { AiFillHome , AiOutlineTeam , AiOutlineUser } from "react-icons/ai";
import { BsPhoneLandscapeFill } from "react-icons/bs";

const links = [
  { name: "Home", href: "/dashboard", icon: AiFillHome },
  // {
  //   name: "In Progress",
  //   href: "/dashboard/inProgress",
  //   icon: AiFillHome,
  // },
  // { name: "Completed", href: "/dashboard/completed", icon: AiFillHome },
];
const communityLink = { name: "Community", href: "/dashboard/community", icon: AiOutlineTeam };

const subscriptionLinks = [
  { name: "Micheal Kizito", icon: AiOutlineUser},
  { name: "Dragule Swaib", icon:AiOutlineUser },
];

export default function NavLinks({ minimized }: { minimized: boolean }) {
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
            <LinkIcon className="w-10 h-7 mr-2" /> {/* Always show the icon */}
            <p className="md:block">{link.name}</p>
          </a>
        );
      })}
      <a
        key={communityLink.name}
        href={communityLink.href}
        className={clsx(
          "flex h-[48px] grow items-end p-3 text-sm font-medium bg-black hover:bg-sky-100 hover:text-blue-600 md:flex-none md:p-2 md:px-3", "mb-8"
        )}
      >
        <AiOutlineTeam className="w-10 h-7 mr-2" /> {/* Always show the icon */}
        <p className="md:block">{communityLink.name}</p>
      </a>
      {/* Horizontal line */}
      <hr className="my-4 border-gray-300" />
      <div className="bg-black p-4">
        <p className="text-white">Subscriptions</p>
      </div>
      {/* Individual subscription entries */}
      {subscriptionLinks.map((subscription) => (
        <div key={subscription.name} className="flex items-center justify-between bg-black p-2"> {/* Always show the icons */}
          <div className="flex items-center space-x-2">
            <subscription.icon className="w-6 h-6 text-white" />
            <p className="text-white">{subscription.name}</p>
          </div>
        </div>
      ))}
      {/* Horizontal line */}
      <hr className="my-4 border-gray-300" />
      <div className="bg-black p-4">
        <p className="text-white">In Progress</p>
      </div>
      {/* Progress bars */}
      <div className="flex items-center space-x-2 bg-black p-2"> {/* Always show the icons */}
        <BsPhoneLandscapeFill className="w-6 h-6 text-white" />
        <progress value="80" max="100" className="w-full" />
      </div>
      <div className="flex items-center space-x-2 bg-black p-2"> {/* Always show the icons */}
        <BsPhoneLandscapeFill className="w-6 h-6 text-white" />
        <progress value="50" max="100" className="w-full" />
      </div>
    </>
  );
}
