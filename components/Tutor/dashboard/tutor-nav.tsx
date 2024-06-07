import React from 'react'
import Image from "next/image"
import Link from "next/link"
import {
    ShadowInnerIcon,
    TriangleDownIcon,
  } from "@radix-ui/react-icons";
const TutorNav = () => {
  return (
    <div className="flex justify-end">
        <div className="flex flex-row gap-4  items-center">
          <div className="flex flex-row gap-4  max-md:mt-5 items-center">
            <h2 className="font-bold text-[16px]">Student</h2>
            <Image src="/Notification-Button.svg" alt="notification" width={20} height={20}/>
            </div>
            <Link href="/tutor/profile">
            <div className="sm:col-span-2 mt-4 sm:mt-0 flex items-center justify-between p-1 rounded-full shadow bg-black text-white cursor-pointer">
          <ShadowInnerIcon className="w-6 h-6 text-white ml-2" />
          <div className="text-white">
            Norah
          </div>
          <TriangleDownIcon className="w-6 h-6 text-white mr-2" />
        </div>
        </Link>
        </div>
    </div>
  )
}

export default TutorNav