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

  const isSubscriptionActive = pathname.startsWith("/dashboard/subscriptions");

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
                    "bg-gray-700 text-white rounded-lg ":
                      pathname === link.href,
                  }
                )}
              >
                <LinkIcon className="w-10 h-6 mr-2 text-white" />
                <p className="md:block">{link.name}</p>
              </Link>
            );
          })}
          <Link href="/dashboard/learning">
            <div
              className={clsx("flex items-center space-x-2 pl-6 my-5 p-3", {
                "bg-gray-700 text-white rounded ":
                  pathname === "/dashboard/learning",
              })}
            >
              <Image
                src="/mylearning.svg"
                alt="learning"
                width={20}
                height={20}
              />
              <p>My Learning</p>
            </div>
          </Link>

          <Link href="/dashboard/wishlist">
          <div
              className={clsx("flex items-center space-x-2 pl-6 my-5 p-3", {
                "bg-gray-700 text-white rounded ":
                  pathname === "/dashboard/wishlist",
              })} >
              <Image
                src="/wishlist.svg"
                alt="wishlist"
                width={20}
                height={20}
              />
              <p>Wishlist</p>
            </div>
          </Link>

          <hr className="border-gray-600 my-5" />
          <div className="">
            <Link href="/dashboard/tutorspage">
              <div
                className={clsx("flex items-center mt-2 p-3 cursor-pointer", {
                  "bg-gray-700 text-white rounded ":
                    pathname === "/dashboard/tutorspage",
                })}
              >
                <p className="  hover:bg-gray-900">Tutors</p>
              </div>
            </Link>
            {subscriptionLinks.map(
              (subscription) =>
                subscriptionOptions.subscriptionLinks.includes(
                  subscription.name
                ) && (
                  <Link
                    key={subscription.name}
                    href={`/dashboard/subscriptions/${subscription.slug}`}
                  >
                    <div
                      className={clsx(
                        "flex items-center justify-between bg-black sm:pl-4 pb-4 sm:p-3 cursor-pointer",
                        {
                          "bg-gray-700 text-white rounded ":
                            pathname ===
                            `/dashboard/subscriptions/${subscription.slug}`,
                        }
                      )}
                    >
                      <div className="flex items-center space-x-2">
                        <Image
                          src="/subscriptions.svg"
                          alt=""
                          width={20}
                          height={20}
                        />
                        <p className="text-white">{subscription.name}</p>
                      </div>
                    </div>
                  </Link>
                )
            )}
          </div>
          <hr className="my-4 border-gray-600" />

          <Link
            key={communityLink.name}
            href={communityLink.href}
            className={clsx(
              "flex h-[48px] grow items-end p-3 text-sm font-medium bg-black hover:bg-gray-900 hover:rounded-md md:flex-none md:p-2 md:px-3",

              "mb-3",
              {
                "bg-gray-700 text-white rounded ":
                  pathname === communityLink.href,
              }
            )}
          >
            <AiOutlineTeam className="w-10 h-7 mr-2 text-white " />
            <p className="md:block">{communityLink.name}</p>
          </Link>
        </>
      )}
    </>
  );
}
