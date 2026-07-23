import clsx from "clsx";
import { usePathname } from "next/navigation";
import { AiFillHome, AiOutlineTeam } from "react-icons/ai";
import { HiOutlineAcademicCap } from "react-icons/hi2";
import MinimizedNavLinks from "./minimized-navlink";
import Image from "next/image";
import { useFetchTutors } from "@/hooks/useCourses";
import { message } from "antd";
import Loader from "../loader";
import { BsPersonFill } from "react-icons/bs";
import { PiUserSwitchBold } from "react-icons/pi";
import { useAuthContext } from "@/components/AuthProvider/AuthContext";

export function NavLinks({
  minimized,
  onNavigate,
}: {
  minimized?: boolean;
  onNavigate?: (path: string) => void;
}) {
  const pathname = usePathname();
  const { user } = useAuthContext();
  const { data, isLoading, error } = useFetchTutors();
  const isTutor = data?.data?.some(
    (tutor: any) => tutor.attributes?.user?.data?.id === user?.id
  );

  if (isLoading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  if (error) {
    message.error("Failed to retrieve specific tutor details");
  }

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
        <MinimizedNavLinks links={links} communityLink={communityLink} />
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
            className={clsx(
              "flex items-center space-x-2 pl-6 my-5 p-3 cursor-pointer",
              {
                "bg-gray-700 text-white rounded ":
                  pathname === "/dashboard/learning",
              }
            )}
          >
            <Image
              src="/mylearning.svg"
              alt="learning"
              width={20}
              height={20}
            />
            <p>My Learning</p>
          </div>

          <div
            onClick={() => handleNavigation("/dashboard/wishlist")}
            className={clsx(
              "flex items-center space-x-2 pl-6 my-5 p-3 cursor-pointer",
              {
                "bg-gray-700 text-white rounded ":
                  pathname === "/dashboard/wishlist",
              }
            )}
          >
            <Image src="/wishlist.svg" alt="wishlist" width={20} height={20} />
            <p>Wishlist</p>
          </div>

          <hr className="border-gray-600 my-5" />
          <div
            onClick={() => handleNavigation("/dashboard/tutorspage")}
            className={clsx(
              "flex items-center space-x-2 pl-6 my-5 p-3 cursor-pointer",
              {
                "bg-gray-700 text-white rounded ":
                  pathname === "/dashboard/tutorspage",
              }
            )}
          >
            <HiOutlineAcademicCap className="h-6 w-6 text-white" />
            <p>Tutors</p>
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

          {isTutor && (
            <div
              onClick={() => handleNavigation("/tutor/dashboard")}
              className={clsx(
                "flex h-[48px] grow mt-4 items-end p-3 text-sm font-medium sm:hidden bg-black hover:bg-gray-900 hover:rounded-md md:flex-none md:p-2 md:px-3 cursor-pointer",
                {
                  "bg-gray-700 text-white rounded ":
                    pathname === "/tutor/dashboard",
                }
              )}
            >
              <PiUserSwitchBold className="w-10 h-7 mr-2 text-white" />

              <p className="md:block text-[15px]">Switch to tutor</p>
            </div>
          )}

          <div
            onClick={() => handleNavigation("/dashboard/profile")}
            className={clsx(
              "flex h-[48px] grow mt-4 items-end p-3 text-sm font-medium sm:hidden bg-black hover:bg-gray-900 hover:rounded-md md:flex-none md:p-2 md:px-3 cursor-pointer",
              {
                "bg-gray-700 text-white rounded ":
                  pathname === "/dashboard/profile",
              }
            )}
          >
            <BsPersonFill className="w-10 h-7 mr-2 text-white" />

            <p className="md:block text-[15px]">Profile</p>
          </div>
        </>
      )}
    </>
  );
}
