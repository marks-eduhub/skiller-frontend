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



