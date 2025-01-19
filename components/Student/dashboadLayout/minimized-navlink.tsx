import { AiOutlineTeam } from "react-icons/ai";
import { NavLinks } from "./nav-links";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";

interface MinimizedNavLinksProps {
  links: any;
  communityLink: any;
  subscriptionLinks: any;
}

export default function MinimizedNavLinks({
  links,
  communityLink,
}: MinimizedNavLinksProps) {
  return (
    <>
      {links.map((link: any) => {
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
              <LinkIcon className="w-10 h-7 " />
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
          <AiOutlineTeam className="w-10 h-7 " title="Community" />
        </div>
      </Link>
      <Link href="/dashboard/tutorspage">
        <div className="flex items-center justify-center" title="Tutors">
          <SubscriptionsIcon className="w-10 h-7 mb-1 " />
        </div>
      </Link>
      <Link href="/dashboard/learning">
        <div className="flex  items-center  ml-14 mt-9 mb-10">
          <Image
            src="/mylearning.svg"
            alt="learning"
            width={20}
            height={20}
            title="My Learning"
          />
        </div>
      </Link>
      <div className="flex  items-center ml-14">
        <Image
          src="/wishlist.svg"
          alt="wishlist"
          width={20}
          height={20}
          title="Wishlist"
        />
      </div>
    </>
  );
}
