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
  progressBlue: number;
  progressRed: number;
  handleProgressBlueChange: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
  handleProgressRedChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
const blueImage = "https://img-c.udemycdn.com/course/750x422/986406_89c5_3.jpg";
const redImage =
  "https://kinsta.com/wp-content/uploads/2023/04/what-is-typescript.jpeg";

export default function MinimizedNavLinks({
  links,
  communityLink,
  subscriptionLinks,
  progressBlue,
  progressRed,
  handleProgressBlueChange,
  handleProgressRedChange,
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

      <div className="flex flex-col items-center bg-black pt-5 rounded-full gap-2">
        <div className="w-[3rem] relative h-[3rem]">
          <Image
            alt={"Image"}
            src={blueImage}
            fill
            className="object-cover object-center rounded-full"
          />
        </div>
        {/* <input
          type="range"
          min="0"
          max="100"
          value={progressBlue}
          onChange={handleProgressBlueChange}
          className="w-full h-2 rounded-full"
        /> */}
        <div className="h-full rounded-full" style={{ width: "15px" }}></div>
      </div>
      <div className="flex flex-col items-center bg-black pt-5 rounded-full gap-2">
        <div className="w-[3rem] relative h-[3rem]">
          <Image
            alt={"Image"}
            src={redImage}
            fill
            className="object-cover object-center rounded-full"
          />
        </div>

        {/* <input
          type="range"
          min="0"
          max="100"
          value={progressRed}
          onChange={handleProgressRedChange}
          className="w-full h-2 rounded-full"
        /> */}
        <div className="h-full rounded-full" style={{ width: "15px" }}></div>
      </div>
    </>
  );
}
