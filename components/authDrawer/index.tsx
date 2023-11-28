"use client"


import React from "react";
import data from "./data.json"
import Image from "next/image";
import Link from "next/link";
import { useSelectedLayoutSegments } from "next/navigation";

export default function AuthDrawer() {
    const segment = useSelectedLayoutSegments();
    const route = `/${segment}`;
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
      <Link href={ route === "/register"? data.loginAction.link : data.registerAction.link} className="bg-white absolute bottom-[2rem] rounded-[22px] py-[1rem] text-[29px] min-w-[22rem] flex justify-center text-black">
      { route === "/register"? data.loginAction.text: data.registerAction.text}
      </Link>
    </div>
  );
}
