import { AiOutlineTeam } from "react-icons/ai";
import { HiOutlineAcademicCap } from "react-icons/hi2";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface MinimizedNavLinksProps {
  links: any;
  communityLink: any;
}

const itemClass =
  "flex h-12 w-12 items-center justify-center self-center rounded-lg text-primary-foreground/70 transition-colors hover:bg-white/10 hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-primary";
const activeClass = "bg-white/15 text-primary-foreground";

export default function MinimizedNavLinks({
  links,
  communityLink,
}: MinimizedNavLinksProps) {
  const pathname = usePathname();

  return (
    <div className="flex flex-col items-center gap-2 px-2 py-2">
      {links.map((link: any) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            aria-label={link.name}
            aria-current={pathname === link.href ? "page" : undefined}
            className={clsx(itemClass, pathname === link.href && activeClass)}
          >
            <LinkIcon className="h-5 w-5" />
          </Link>
        );
      })}

      <Link
        href="/dashboard/learning"
        aria-label="My Learning"
        aria-current={pathname === "/dashboard/learning" ? "page" : undefined}
        className={clsx(
          itemClass,
          pathname === "/dashboard/learning" && activeClass
        )}
      >
        <Image src="/mylearning.svg" alt="" width={20} height={20} />
      </Link>

      <Link
        href="/dashboard/wishlist"
        aria-label="Wishlist"
        aria-current={pathname === "/dashboard/wishlist" ? "page" : undefined}
        className={clsx(
          itemClass,
          pathname === "/dashboard/wishlist" && activeClass
        )}
      >
        <Image src="/wishlist.svg" alt="" width={20} height={20} />
      </Link>

      <hr className="my-1 w-8 border-white/10" />

      <Link
        href="/dashboard/tutorspage"
        aria-label="Tutors"
        aria-current={pathname === "/dashboard/tutorspage" ? "page" : undefined}
        className={clsx(
          itemClass,
          pathname === "/dashboard/tutorspage" && activeClass
        )}
      >
        <HiOutlineAcademicCap className="h-5 w-5" />
      </Link>

      <hr className="my-1 w-8 border-white/10" />

      <Link
        key={communityLink.name}
        href={communityLink.href}
        aria-label={communityLink.name}
        aria-current={pathname === communityLink.href ? "page" : undefined}
        className={clsx(itemClass, pathname === communityLink.href && activeClass)}
      >
        <AiOutlineTeam className="h-5 w-5" />
      </Link>
    </div>
  );
}
