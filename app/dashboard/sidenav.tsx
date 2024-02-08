"use client"
import Link from "next/link";
import NavLinks from "@/app/dashboard/nav-links";
import SkillerLogo from "@/components/ui/logo";
import { MdMenu } from "react-icons/md";
import Image from "next/image";
import { FaHome } from "react-icons/fa";
import { GoPeople } from "react-icons/go";
import { IoMdContact } from "react-icons/io";
import {useState} from "react"

export default function SideNav() {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    console.log("Sidebar toggled")
    setCollapsed(!collapsed);
  };
 
  return (
    <div className={`flex h-full flex-col text-white  ${collapsed ? 'collapsed' : ''}`}>
      <div className="flex items-center justify-between bg-black p-4 md:p-8 rounded-custom">
      <MdMenu onClick={toggleSidebar} className="text-gray-500 w-6 h-6 md:w-8 md:h-8"/>
        <Link className="flex items-center space-x-2" href="/">
        <Image
        src="/logo.svg"
        alt="Skiller logo"
        priority={true}
        width={120}
        height={50}
      />
        </Link>
      </div>



      <div className="h-auto w-full grow md:block bg-black ">
        {/* <NavLinks /> */}
          <div className="flex flex-col items-center space-y-2 md:flex-row md:space-y-0 md:space-x-4 hover:bg-gray-800 transition-colors duration-300 ease-in-out">
            <FaHome className="text-gray-500 w-5 h-4 md:w-6 md:h-6 ml-5" />
            <span className="md:block p-4">Home</span>
          </div>
          <div className="flex flex-col items-center space-y-2 md:flex-row md:space-y-0 md:space-x-4 hover:bg-gray-800 transition-colors duration-300 ease-in-out">
            <GoPeople className="text-gray-500 w-5 h-4 md:w-6 md:h-6 ml-5" />
            <span className="md:block p-4">Community</span>
          </div>
          <hr className="border-gray-600 mr-8 mt-5" />


            {/* Subscriptions div */}
          <div className="hover:bg-gray-800 transition-colors duration-300 ease-in-out">
            <h2 className="md:block p-4">Subscriptions</h2>
           </div> 
            <div className="ml-auto">
            <div className="flex flex-col items-center space-y-2 md:flex-row md:space-y-0 md:space-x-4 ">
            <IoMdContact className="text-white-500 w-5 h-4 md:w-6 md:h-6 ml-5" />
            <span className="md:block p-4">Micheal Kizito</span>
            </div>
           <div className="flex flex-col items-center space-y-2 md:flex-row md:space-y-0 md:space-x-4 ">
            <IoMdContact className="text-white-500 w-5 h-4 md:w-6 md:h-6 ml-5" />
            <span className="md:block p-4 ">Dragule Swaib</span>
            </div>
            </div>
            <hr className="border-gray-600 mr-8 mt-5" />

              {/* inprogress div */}
          <div className="hover:bg-gray-800 transition-colors duration-300 ease-in-out">
            <h2 className="md:block p-4">Inprogress</h2>
           </div> 
           <div>
<Link className="flex items-center space-x-2" href="/">
            <Image
            src="/side-menu/Typescript-Progress.webp"
            alt="Skiller logo"
            priority={true}
            width={200}
            height={80}
          />
            </Link>
            <div style={{ marginBottom: '10px' }}></div>
           <Link className="flex items-center space-x-2" href="/">
            <Image
            src="/side-menu/Malware-Progress.webp"
            alt="Skiller logo"
            priority={true}
            width={200}
            height={80}
          />
            </Link>
           </div>
         
          </div>
     

      <form>
        <button className="flex h-[48px] w-full grow items-center justify-center bg-black p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
          <div className="md:block p-4">Sign Out</div>
        </button>
      </form>
      {/* </div> */}
    </div>
  );
}
