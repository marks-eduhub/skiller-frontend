import clsx from "clsx";
import { useState } from "react";
import { AiFillHome, AiOutlineTeam, AiOutlineUser } from "react-icons/ai";
import MinimizedNavLinks from "./minimized-sidenav";
import Image from "next/image";
import Link from "next/link";

const blueImage = "https://img-c.udemycdn.com/course/750x422/986406_89c5_3.jpg";
const redImage =
  "https://kinsta.com/wp-content/uploads/2023/04/what-is-typescript.jpeg";

const links = [{ name: "Home", href: "/dashboard", icon: AiFillHome }];
const communityLink = {
  name: "Community",
  href: "/dashboard/community",
  icon: AiOutlineTeam,
};

const subscriptionLinks: NavLinks[] = [
  {
    name: "Micheal Kizito",
    href: "/subscription/micheal",
    icon: AiOutlineUser,
  },
  { name: "Dragule Swaib", href: "/subscription/dragule", icon: AiOutlineUser },
];

export default function NavLinks({ minimized }: { minimized: boolean }) {
  const [progressBlue, setProgressBlue] = useState<number>(0);
  const [progressRed, setProgressRed] = useState<number>(0);

  return (
    <>
      {minimized ? (
        <MinimizedNavLinks
          links={links}
          communityLink={communityLink}
          subscriptionLinks={subscriptionLinks}
        />
      ) : (
        <>
          {links.map((link) => {
            const LinkIcon = link.icon;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={clsx(
                  "flex h-[48px] grow items-end p-3 text-sm font-medium bg-black hover:bg-sky-100 hover:rounded-md hover:text-blue-600 md:flex-none md:p-2 ",
                  {
                    "ml-2": link.name === "Home",
                    "ml-20": link.name !== "Home",
                  }
                )}
              >
                <LinkIcon className="w-10 h-6 mr-2 text-white" />
                <p className="md:block">{link.name}</p>
              </Link>
            );
          })}
          <Link
            key={communityLink.name}
            href={communityLink.href}
            className={clsx(
              "flex h-[48px] grow items-end p-3 text-sm font-medium bg-black hover:bg-sky-100 hover:rounded-md hover:text-blue-600 md:flex-none md:p-2 md:px-3",
              "mb-3"
            )}
          >
            <AiOutlineTeam className="w-10 h-7 mr-2 text-white " />
            <p className="md:block">{communityLink.name}</p>
          </Link>
          <hr className=" border-gray-600" />
          <p className="text-white p-4">Subscriptions</p>
          {subscriptionLinks.map((subscription) => (
            <div
              key={subscription.name}
              className="flex items-center justify-between bg-black pl-4 pb-4"
            >
              <div className="flex items-center space-x-2">
                <Image src="/subscriptions.svg" alt="" width={20} height={20} />
                {/* <subscription.icon className="w-6 h-6 " /> */}
                <p className="text-white">{subscription.name}</p>
              </div>
            </div>
          ))}
          <hr className="my-4 border-gray-600" />
          <div className="flex  items-center space-x-2 pl-3  mb-6">
            <Image
              src="/mylearning.svg"
              alt="learning"
              width={20}
              height={20}
            />

            <p>My Learning</p>
          </div>
          <div className="flex  items-center space-x-2 pl-3">
            <Image src="/wishlist.svg" alt="wishlist" width={20} height={20} />

            <p>Wishlist</p>
          </div>
        </>
      )}
    </>
  );
}
export interface NavLinks {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}
