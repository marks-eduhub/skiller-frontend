import clsx from "clsx";
import { usePathname } from "next/navigation";
import { AiFillHome, AiOutlineTeam, AiOutlineUser } from "react-icons/ai";
import MinimizedNavLinks from "./minimized-navlink";
import Image from "next/image";
import Link from "next/link";

const links = [{ name: "Home", href: "/dashboard", icon: AiFillHome }];
const communityLink = {
  name: "Community",
  href: "/dashboard/community",
  icon: AiOutlineTeam,
};

const subscriptionLinks = [
  { name: "Michael Kizito", slug: "michaelkizito", icon: AiOutlineUser },
  { name: "Dragule Swaib", slug: "draguleswaib", icon: AiOutlineUser },
];
const subscriptionOptions = {
  subscriptionLinks: ["Dragule Swaib", "Michael Kizito"],
};

export default function NavLinks({ minimized }: { minimized?: boolean }) {
  const pathname = usePathname();

  const isSubscriptionActive = pathname.startsWith('/dashboard/subscriptions');

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
                  "flex h-[48px] grow items-end p-3 text-sm font-medium bg-black hover:bg-gray-900 hover:rounded-md md:flex-none md:p-2 ",
                  {
                    "ml-2": link.name === "Home",
                    "ml-20": link.name !== "Home",
                    "bg-gray-600 text-white rounded-lg " : pathname === link.href,
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
              "flex h-[48px] grow items-end p-3 text-sm font-medium bg-black hover:bg-gray-900 hover:rounded-md md:flex-none md:p-2 md:px-3",
              "mb-3"
            )}
          >
            <AiOutlineTeam className="w-10 h-7 mr-2 text-white " />
            <p className="md:block">{communityLink.name}</p>
          </Link>
          <hr className="border-gray-600" />
          <p className="text-white  p-4 cursor-pointer hover:bg-gray-900"
            // className={clsx("text-white  p-4 cursor-pointer hover:bg-gray-900", {
            //   "bg-gray-600 rounded-md my-2  ": isSubscriptionActive,
            // })}
          >
            Subscriptions
          </p>
          {subscriptionLinks.map((subscription) => (
            subscriptionOptions.subscriptionLinks.includes(subscription.name) && (
              <Link key={subscription.name} href={`/dashboard/subscriptions/${subscription.slug}`}>
                <div className="flex items-center justify-between bg-black pl-4 pb-4 cursor-pointer">
                  <div className="flex items-center space-x-2">
                    <Image src="/subscriptions.svg" alt="" width={20} height={20} />
                    <p className="text-white">{subscription.name}</p>
                  </div>
                </div>
              </Link>
            )
          ))}
          <hr className="my-4 border-gray-600" />
          <Link href="/dashboard/learning">
            <div className="flex items-center space-x-2 pl-3 mb-6">
              <Image
                src="/mylearning.svg"
                alt="learning"
                width={20}
                height={20}
              />
              <p>My Learning</p>
            </div>
          </Link>
          <div className="flex items-center space-x-2 pl-3">
            <Image src="/wishlist.svg" alt="wishlist" width={20} height={20} />
            <p>Wishlist</p>
          </div>
        </>
      )}
    </>
  );
}
