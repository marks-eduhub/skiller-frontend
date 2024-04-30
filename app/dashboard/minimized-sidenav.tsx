import { AiOutlineTeam } from "react-icons/ai";
import { NavLinks } from "./nav-links";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import clsx from "clsx";

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
            <a
              key={link.name}
              href={link.href}
              className={clsx(
                "flex flex-col items-center justify-center h-[48px] p-3 text-sm font-medium bg-black hover:bg-sky-100 hover:rounded-md hover:text-blue-600 md:flex-none md:p-2 md:px-3 mb-4",
              )}
            >
              <div className="flex items-center justify-center mb-1">
                <LinkIcon className="w-10 h-7 text-gray-600" />
              </div>
              <p className="text-white">{link.name}</p>
            </a>
          );
        })}
        
        <a
          key={communityLink.name}
          href={communityLink.href}
          className={clsx(
            "flex flex-col items-center justify-center h-[48px] p-3 text-sm font-medium bg-black hover:bg-sky-100 hover:rounded-md hover:text-blue-600 md:flex-none md:p-2 md:px-3 mb-4",
          )}
        >
          <div className="flex items-center justify-center mb-1">
            <AiOutlineTeam className="w-10 h-7 text-gray-600" />
          </div>
          <p className="text-white">{communityLink.name}</p>
        </a>
  
        <hr className="my-5 border-gray-300" />
  
        <div className="flex items-center justify-center">
          <SubscriptionsIcon className="w-10 h-7 mb-1 text-gray-600" />
        </div>
  
        <div className=" p-6">
          <p className="text-white">Subscriptions</p>
        </div>
  
        <hr className="my-4 border-gray-300" />
        <div className="bg-black p-4">
          <p className="text-white">In Progress</p>
        </div>
        <div className="flex flex-col items-center bg-black p-2 rounded-full">
          <img
            src={blueImage}
            alt="Image"
            className="w-14 h-14 rounded-full mb-2"
          />
          <input
            type="range"
            min="0"
            max="100"
            value={progressBlue}
            onChange={handleProgressBlueChange}
            className="w-full h-2 rounded-full"
          />
          <div className="h-full rounded-full" style={{ width: "15px" }}></div>
        </div>
        <div className="flex flex-col items-center bg-black p-2 rounded-full">
          <img
            src={redImage}
            alt="Image"
            className="w-14 h-14 rounded-full mb-2"
          />
          <input
            type="range"
            min="0"
            max="100"
            value={progressRed}
            onChange={handleProgressRedChange}
            className="w-full h-2 rounded-full"
          />
          <div className="h-full rounded-full" style={{ width: "15px" }}></div>
        </div>
      </>
    );
  }
  