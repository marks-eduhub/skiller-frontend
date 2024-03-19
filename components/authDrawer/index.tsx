"use client"

import React from "react";
import data from "./data.json"
import Image from "next/image";
import Link from "next/link";


export default function AuthDrawer({pageTo, link}:{pageTo:string, link:string}) {
  return (
    <div className="hidden md:flex w-full flex-col gap-[3rem] bg-black h-screen justify-center relative items-center text-white" >
      <div className="relative w-[22rem] h-[12rem]">
      <Image
       src={data.logo}
       alt={"logo"}
       fill
      />
      </div>
      <div className="text-[40px] mt-[2rem]">{data.tagline}</div>
      <Link href={link} className="bg-white absolute bottom-[2rem] rounded-[22px] py-[1rem] text-[29px] min-w-[22rem] flex justify-center text-black">
      {pageTo}
      </Link>
    </div>
  );
}