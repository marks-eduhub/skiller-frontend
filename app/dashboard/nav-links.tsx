import clsx from "clsx";
import { useState } from "react";
import { AiFillHome, AiOutlineTeam, AiOutlineUser } from "react-icons/ai";
import MinimizedNavLinks from "./minimized-sidenav";


const blueImage = "https://img-c.udemycdn.com/course/750x422/986406_89c5_3.jpg";
const redImage = "https://kinsta.com/wp-content/uploads/2023/04/what-is-typescript.jpeg";

const links = [
  { name: "Home", href: "/dashboard", icon: AiFillHome },
  // {
  //   name: "In Progress",
  //   href: "/dashboard/inProgress",
  //   icon: AiFillHome,
  // },
  // { name: "Completed", href: "/dashboard/completed", icon: AiFillHome },
];
const communityLink = { name: "Community", href: "/dashboard/community", icon: AiOutlineTeam };

const subscriptionLinks: NavLinks[] = [
  { name: "Micheal Kizito", href: "/subscription/micheal", icon: AiOutlineUser },
  { name: "Dragule Swaib", href: "/subscription/dragule", icon: AiOutlineUser },
];


export default function NavLinks({ minimized }: { minimized: boolean }) {
  
  const [progressBlue, setProgressBlue] = useState<number>(0);
  const [progressRed, setProgressRed] = useState<number>(0);

  const handleProgressBlueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value);
    // console.log("Blue progress value:", value);
    setProgressBlue(value);
  };
  
  const handleProgressRedChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value);
    // console.log("Red progress value:", value);
    setProgressRed(value);
  };
  
  return (
    <>
      {minimized ? (
        <MinimizedNavLinks
          links={links}
          communityLink={communityLink}
          subscriptionLinks={subscriptionLinks}
          progressBlue={progressBlue}
          progressRed={progressRed}
          handleProgressBlueChange={handleProgressBlueChange}
          handleProgressRedChange={handleProgressRedChange}
        />
      ) : (
        <>
          {links.map((link) => {
            const LinkIcon = link.icon;
            return (
              <a
                key={link.name}
                href={link.href}
                className={clsx(
                  "flex h-[48px] grow items-end p-3 text-sm font-medium bg-black hover:bg-sky-100 hover:rounded-md hover:text-blue-600 md:flex-none md:p-2 md:px-3",
                  {
                    "ml-2": link.name === "Home",
                    "ml-20": link.name !== "Home",
                  }
                )}
              >
                <LinkIcon className="w-10 h-7 mr-2 text-gray-600" />
                <p className="md:block">{link.name}</p>
              </a>
            );
          })}
          <a
            key={communityLink.name}
            href={communityLink.href}
            className={clsx(
              "flex h-[48px] grow items-end p-3 text-sm font-medium bg-black hover:bg-sky-100 hover:rounded-md hover:text-blue-600 md:flex-none md:p-2 md:px-3",
              "mb-8"
            )}
          >
            <AiOutlineTeam className="w-10 h-7 mr-2 text-gray-600 " />
            <p className="md:block">{communityLink.name}</p>
          </a>
          {/* Horizontal line */}
          <hr className="my-4 border-gray-300" />
          <div className="bg-black p-4">
            <p className="text-white">Subscriptions</p>
          </div>
          {/* Individual subscription entries */}
          {subscriptionLinks.map((subscription) => (
            <div key={subscription.name} className="flex items-center justify-between bg-black p-2">
              <div className="flex items-center space-x-2">
                <subscription.icon className="w-6 h-6 " />
                <p className="text-white">{subscription.name}</p>
              </div>
            </div>
          ))}
          {/* Horizontal line */}
          <hr className="my-4 border-gray-300" />
          <div className="bg-black p-4">
            <p className="text-white">In Progress</p>
          </div>
          {/* Progress bars with range inputs and images */}
          <div className="flex items-center space-x-2 bg-black p-2 rounded-full">
            <img src={blueImage} alt="Image" className="w-14 h-14 rounded-full" />
            <input
              type="range"
              min="0"
              max="100"
              value={progressBlue}
              onChange={handleProgressBlueChange}
              className="w-full h-2 rounded-full"
            />
            <div className="h-fullrounded-full" style={{ width: "15px"}}></div>
          </div>
          <div className="flex items-center space-x-2 bg-black p-2 rounded-full">
            <img src={redImage} alt="Image" className="w-14 h-14 rounded-full" />
            <input
              type="range"
              min="0"
              max="100"
              value={progressRed}
              onChange={handleProgressRedChange}
              className="w-full h-2 rounded-full"
            />
            <div className="h-full rounded-full" style={{ width: "15px"}}></div>
          </div>
        </>
      )}
    </>
  );
}
export interface NavLinks {
  name: string;
  href:string
  icon: React.ComponentType<{ className?: string }>;
}