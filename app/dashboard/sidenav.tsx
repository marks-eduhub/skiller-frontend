"use client"
import Link from "next/link";
import NavLinks from "@/app/dashboard/nav-links";
import SkillerLogo from "@/components/ui/logo";
import { TiThMenuOutline } from "react-icons/ti";
import {  logout } from "../../lib/userSS";
import { redirect } from "next/navigation";
import { useRouter } from 'next/navigation'
 import {  HamburgerMenuIcon   } from '@radix-ui/react-icons';

export default function SideNav() {
  const router = useRouter()
  return (
    <div className="flex h-full flex-col text-white">
      <Link href="/"  className="flex items-center justify-start space-x-6 bg-black p-4 md:justify-left">
          <div className="flex items-center space-x-6">
            <HamburgerMenuIcon className="w-6 h-6 text-white" />
            <div className="w-28 text-white md:w-30">
              <SkillerLogo />
            </div>
           
          </div>
      </Link>
      <div className="h-auto w-full grow md:block bg-black">
      
        <NavLinks />
      </div>
      

      <form onSubmit={async(e)=> {
        e.preventDefault()
        await logout()
        router.push("/auth")
        }}>
        <button className="flex h-[48px] w-full grow items-center justify-center bg-black p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
          <div className="md:block p-4">Sign Out</div>
        </button>
      </form>
    </div>
    
  );
}



// import { MagnifyingGlassIcon ,ShadowInnerIcon, TriangleDownIcon , HamburgerMenuIcon } from '@radix-ui/react-icons';

// export default function SideNav() {
//   const router = useRouter();

//   return (
//     <div className="flex h-full flex-col text-white  bg-black ">
//       <Link
//         className="flex h-20 items-end justify-start space-x-4 bg-black p-4 md:h-40 md:justify-center"
//         href="/"
//       >
//         <div className="flex items-center space-x-2">
//           <HamburgerMenuIcon className="w-6 h-6 text-white  bg-black" /> 
//           <div className="w-15 text-white md:w-16">
//             <SkillerLogo />
//           </div>
//         </div>
//       </Link>

//       <div className="flex flex-col text-left pl-4 mt-4 space-y-2  bg-black"> {/* Adjusted for vertical stacking */}
//         <div className="flex items-center space-x-2  bg-black">
//           <ShadowInnerIcon /> {/* Replace with actual Subscription icon component */}
//           <span className="text-sm font-medium  bg-black">Subscriptions</span>
//         </div>
//         <div className="flex items-center space-x-2  bg-black">
//           <ShadowInnerIcon className="w-6 h-6 text-white" />
//           <span className="text-sm font-medium">Michael Kizito</span>
//         </div>
//       </div>

//       <div className="h-auto w-full grow md:block bg-black">
//         <NavLinks />
//       </div>

//       <form onSubmit={async (e) => {
//         e.preventDefault();
//         await logout();
//         router.push("/auth");
//       }}>
//         <button className="flex h-[48px] w-full grow items-center justify-center bg-black p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
//           <div className="md:block p-4">Sign Out</div>
//         </button>
//       </form>
//     </div>
//   );
// }
