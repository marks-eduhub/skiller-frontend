import { AiOutlineTeam } from "react-icons/ai";
import { NavLinks } from "./nav-links";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";

interface MinimizedNavLinksProps {
  links: NavLinks[];
  communityLink: NavLinks;
  subscriptionLinks: NavLinks[];

  
}


export default function MinimizedNavLinks({
  links,
  communityLink,
  subscriptionLinks,

 
}: MinimizedNavLinksProps) {
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              "flex flex-col items-center justify-center h-[48px] p-3 text-sm font-medium bg-black  md:flex-none md:p-2 md:px-3 mb-4"
            )}
          >
            <div className="flex items-center justify-center mb-1" title="Home">
              <LinkIcon className="w-10 h-7 text-gray-600" />
            </div>
          </Link>
        );
      })}

      <Link
        key={communityLink.name}
        href={communityLink.href}
        className={clsx(
          "flex flex-col items-center justify-center h-[48px] p-3 text-sm font-medium bg-black  md:flex-none md:p-2 md:px-3 mb-4"
        )}
      >
        <div className="flex items-center justify-center mb-1">
          <AiOutlineTeam className="w-10 h-7 text-gray-600" title="Community" />
        </div>
      </Link>

      <div className="flex items-center justify-center" title="Subscriptions">
        <SubscriptionsIcon className="w-10 h-7 mb-1 text-gray-600" />
      </div>

     
        
    </>
  );
}
