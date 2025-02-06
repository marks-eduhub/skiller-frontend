import clsx from "clsx";
import { usePathname } from "next/navigation";
import { AiFillHome, AiOutlineTeam, AiOutlineUser } from "react-icons/ai";
import MinimizedNavLinks from "./minimized-navlink";
import Image from "next/image";
import { useFetchTutors } from "@/hooks/useCourses";
import { message } from "antd";
import Loader from "../loader";

export  function NavLinks({
  minimized, onNavigate}: { minimized?: boolean ; onNavigate?: (path: string) => void; }) {
  const pathname = usePathname();
  const { data, isLoading, error} = useFetchTutors()

  if (isLoading) {
    return <div><Loader/></div>;
  }

  if (error) {
    message.error("Failed to retrieve specific tutor details")
  }
  console.log("lol", data)

  const handleNavigation = (href: string) => {
    if (onNavigate) {
      onNavigate(href); 
    }
  };
   
  const links = [{ name: "Home", href: "/dashboard", icon: AiFillHome }];
  const communityLink = {
    name: "Community",
    href: "/dashboard/community",
    icon: AiOutlineTeam,
  };
  
  


  return (
    <>
      {minimized ? (
        <MinimizedNavLinks
          links={links}
          communityLink={communityLink}
        />
      ) : (
        <>
          {links.map((link) => {
            const LinkIcon = link.icon;
            return (
              <div
                key={link.name}
                onClick={() => handleNavigation(link.href)}
                className={clsx(
                  "flex h-[48px] grow items-end p-3 text-sm font-medium bg-black hover:bg-gray-900 hover:rounded-md md:flex-none md:p-2 cursor-pointer",
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
              </div>
            );
          })}

          <div
            onClick={() => handleNavigation("/dashboard/learning")}
            className={clsx("flex items-center space-x-2 pl-6 my-5 p-3 cursor-pointer", {
              "bg-gray-700 text-white rounded ":
                pathname === "/dashboard/learning",
            })}
          >
            <Image src="/mylearning.svg" alt="learning" width={20} height={20} />
            <p>My Learning</p>
          </div>

          <div
            onClick={() => handleNavigation("/dashboard/wishlist")}
            className={clsx("flex items-center space-x-2 pl-6 my-5 p-3 cursor-pointer", {
              "bg-gray-700 text-white rounded ":
                pathname === "/dashboard/wishlist",
            })}
          >
            <Image src="/wishlist.svg" alt="wishlist" width={20} height={20} />
            <p>Wishlist</p>
          </div>

          <hr className="border-gray-600 my-5" />
          <div>
            <div
              onClick={() => handleNavigation("/dashboard/tutorspage")}
              className={clsx("flex items-center mt-2 p-3 cursor-pointer", {
                "bg-gray-700 text-white rounded ":
                  pathname === "/dashboard/tutorspage",
              })}
            >
              <p className="hover:bg-gray-900">Tutors</p>
            </div>
            {data?.data.slice(0,5).map((subscription) => {
                const slug = subscription.attributes.slug
                const name = subscription.attributes.tutorname
                return (
                  <div
                    key={name}
                    onClick={() =>
                      handleNavigation(
                        `/dashboard/subscriptions/${slug}`
                      )
                    }
                    className={clsx(
                      "flex items-center justify-between bg-black sm:pl-4 pb-4 sm:p-3 cursor-pointer",
                      {
                        "bg-gray-700 text-white rounded ":
                          pathname ===
                          `/dashboard/subscriptions/${slug}`,
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
                      <p className="text-white">{name}</p>
                    </div>
                  </div>
                )
            }
          )}
          </div>
          <hr className="my-4 border-gray-600" />

          <div
            onClick={() => handleNavigation(communityLink.href)}
            className={clsx(
              "flex h-[48px] grow items-end p-3 text-sm font-medium bg-black hover:bg-gray-900 hover:rounded-md md:flex-none md:p-2 md:px-3 cursor-pointer",
              {
                "bg-gray-700 text-white rounded ":
                  pathname === communityLink.href,
              }
            )}
          >
            <AiOutlineTeam className="w-10 h-7 mr-2 text-white" />
            <p className="md:block">{communityLink.name}</p>
          </div>
        </>
      )}
    </>
  );
}
