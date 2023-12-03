"use client";

import React from "react";
import data from "./data.json";
import Image from "next/image";
import { Button } from "../ui/button";
// import { useRouter } from 'next/router';

export default function ErrorPage() {
  // const router = useRouter(); // Access the router object

  // function handleOnClick(): void {
  //   router.push("/dashboard");
  // }

  return (
    <div className="flex flex-col justify-center md:grid md:grid-cols-3 md:grid-rows-3 gap-4  bg-grey h-screen p-10 relative text-white overflow-y-auto">
      {/* <div className="grid grid-cols-3" > */}
      <div className="md:w-20 "></div>
      <div className="relative w-[16rem] h-[4rem] flex justify-end self-center md:hidden">
        <Image src={data.whitelogo} alt={"logo"} priority={true} fill />
      </div>
      <div className="text-[40px] text-black flex justify-center self-center">
        {data.tagline}
      </div>

      <div className="hidden md:relative  md:h-[4rem] md:flex md:self-start md:justify-end">
        <Image src={data.whitelogo} alt={"logo"} priority={true} fill />
      </div>
      {/* </div> */}
      <div className="md:w-20 h-300 row-span-2"></div>

      <div className="flex w-full flex-col gap-[4rem] bg-grey items-center row-span-2">
        <div className="relative w-[18rem] h-[12rem] flex self-center justify-center">
          <Image src={data.errorImage} alt={"logo"} priority={true} fill />
        </div>
        <div className="text-[40px] mt-[2rem] text-black">
          {data.errorMessage}
        </div>
        <Button size="lg">{data.buttonText}</Button>
      </div>

      <div className="md:w-20"></div>
    </div>
  );
}
