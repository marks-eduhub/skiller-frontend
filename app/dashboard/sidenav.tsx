"use client"
import Link from "next/link";
import NavLinks from "@/app/dashboard/nav-links";
import SkillerLogo from "@/components/ui/logo";
// import { TiThMenuOutline } from "react-icons/ti";
import {  logout } from "../../lib/userSS";
import { redirect } from "next/navigation";
import { useRouter } from 'next/navigation'

export default function SideNav() {
  const router = useRouter()
  return (
    <div className="flex h-full flex-col text-white">
      <Link
        className="flex h-20 items-end justify-start space-x-40 bg-black p-4 md:h-40 md:justify-center"
        href="/"
      >
        <div className="w-32 text-white md:w-40">
          <SkillerLogo />
        </div>
        {/* <div className="w-32 h-10 text-white md:w-40 md:hidden">
        <TiThMenuOutline/>
        </div> */}
      </Link>
      {/* <div className="flex grow flex-row justify-center md:flex-col "> */}

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
      {/* </div> */}
    </div>
  );
}
