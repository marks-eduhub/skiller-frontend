"use client";

import React, { useState } from "react";
import InputCode from "./inputCode";

import Image from "next/image";
import Link from "next/link";
import data from "./data.json";
import { ChevronLeftIcon } from "@radix-ui/react-icons";

export default function VerificationComponent() {
  const [loading, setLoading] = useState(false);

  return (
    <div className="bg-[#E9E9E9] h-screen w-full flex flex-col justify-between items-center text-black relative py-5 ">
      <div className="flex flex-row justify-between items-center w-full px-[2rem]">
        <Link
          href={"#"}
          className="rounded-[3px] border-[3px] border-black px-2 sm:py-3 font-[700]"
        >
          <ChevronLeftIcon width={30} height={30} fontWeight={700} />
        </Link>
        <h1 className=" hidden sm:flex font-[500] mt-10 text-[50px]">
          
          {data.title}
        </h1>
        <div className=" relative w-[8rem] h-[4rem]">
          <Image alt={"logo"} src={data.logoPath} fill />
        </div>
      </div>
      <h1 className=" sm:hidden flex font-[700] text-[40px] mt-[2rem]">
        {" "}
        {data.title}{" "}
      </h1>
      <div className=" flex flex-col w-[80%] self-center items-center">
        <h3 className="text-[20px] sm:text-[25px] mb-6 ">
          Enter the code sent to your email
        </h3>
        <div className="flex flex-row items-center ">
          <InputCode
            length={6}
            loading={loading}
            onComplete={(code: number) => {
              setLoading(true);
              setTimeout(() => setLoading(false), 1000);
            }}
          />
        </div>
        <h2 className="mt-10 text-[25px]  ">
          havent received the code?
          <span className="text-blue-600 ml-1">resend code</span>
        </h2>
      </div>

      <div className="flex justify-center mb-[7rem] sm:mb-[15rem]">
        <Link
          href={"#"}
          className="bg-[#000]  rounded-[7px] py-[0.5rem] text-[29px] flex justify-center text-white w-[300px] h-[66px]"
        >
          Verify
        </Link>
      </div>
      <div className="fixed -bottom-[17rem] -right-[4.5rem]  sm:-bottom-[9rem] sm:-right-[6.5rem] h-[20rem] w-[20rem]  bg-black opacity-[14%] transform rounded-full " />
    </div>
  );
}
