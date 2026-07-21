"use client"

import React from "react";
import data from "./data.json"
import Image from "next/image";
import Link from "next/link";


export default function AuthDrawer({pageTo, link}:{pageTo:string, link:string}) {
  return (
    <div className="relative hidden h-screen w-full flex-col items-center justify-center gap-10 bg-black px-8 text-white md:flex">
      <div className="relative h-[9rem] w-[18rem] lg:h-[10rem] lg:w-[20rem]">
      <Image
       src={data.logo}
       alt={"logo"}
       fill
      />
      </div>
      <div className="max-w-[24rem] text-center text-[30px] font-medium leading-tight lg:text-[36px]">{data.tagline}</div>
      <Link href={link} className="absolute bottom-8 flex min-h-[52px] min-w-[18rem] items-center justify-center rounded-[18px] bg-white px-6 text-[22px] text-black lg:min-w-[20rem] lg:text-[24px]">
      {pageTo}
      </Link>
    </div>
  );
}
