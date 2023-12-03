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
    <div className="flex w-full flex-col self-end md:flex w-full flex-col gap-[3rem] bg-grey h-screen justify-center relative items-center text-white">
      <div className="relative w-[16rem] h-[3rem]">
        <Image src={data.whitelogo} alt={"logo"} priority={true} fill />
      </div>

      <div className="text-[40px] mt-[2rem] text-black">{data.tagline}</div>

      <div className="relative w-[22rem] h-[12rem]">
        <Image src={data.errorImage} alt={"logo"} priority={true} fill />
      </div>
      <div className="text-[40px] mt-[2rem] text-black">
        {data.errorMessage}
      </div>
      <Button>{data.buttonText}</Button>
    </div>
  );
}
