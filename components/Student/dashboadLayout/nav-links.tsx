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

function NavItem({
  label,
  active,
  onClick,
  className,
  children,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-current={active ? "page" : undefined}
      className={clsx(
        "flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left text-sm font-medium text-primary-foreground/70 transition-colors hover:bg-white/10 hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-primary",
        active && "bg-white/15 text-primary-foreground",
        className
      )}
    >
      {children}
      <span>{label}</span>
    </button>
  );
}

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
        <nav className="flex flex-col gap-1 px-3 py-2">
          <NavItem
            label="Home"
            active={pathname === "/dashboard"}
            onClick={() => handleNavigation("/dashboard")}
          >
            <AiFillHome className="h-5 w-5" />
          </NavItem>

          <NavItem
            label="My Learning"
            active={pathname === "/dashboard/learning"}
            onClick={() => handleNavigation("/dashboard/learning")}
          >
            <Image src="/mylearning.svg" alt="" width={20} height={20} />
          </NavItem>

          <NavItem
            label="Wishlist"
            active={pathname === "/dashboard/wishlist"}
            onClick={() => handleNavigation("/dashboard/wishlist")}
          >
            <Image src="/wishlist.svg" alt="" width={20} height={20} />
          </NavItem>

          <hr className="my-2 border-white/10" />

          <NavItem
            label="Tutors"
            active={pathname === "/dashboard/tutorspage"}
            onClick={() => handleNavigation("/dashboard/tutorspage")}
          >
            <HiOutlineAcademicCap className="h-5 w-5" />
          </NavItem>

          <hr className="my-2 border-white/10" />

          <NavItem
            label={communityLink.name}
            active={pathname === communityLink.href}
            onClick={() => handleNavigation(communityLink.href)}
          >
            <AiOutlineTeam className="h-5 w-5" />
          </NavItem>

          {isTutor && (
            <NavItem
              label="Switch to tutor"
              active={pathname === "/tutor/dashboard"}
              onClick={() => handleNavigation("/tutor/dashboard")}
              className="mt-2 sm:hidden"
            >
              <PiUserSwitchBold className="h-5 w-5" />
            </NavItem>
          )}

          <NavItem
            label="Profile"
            active={pathname === "/dashboard/profile"}
            onClick={() => handleNavigation("/dashboard/profile")}
            className="mt-2 sm:hidden"
          >
            <BsPersonFill className="h-5 w-5" />
          </NavItem>
        </nav>
      )}
    </>
  );
}
