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
          className="rounded-[3px] border-[3px] border-black py-2 font-[700]"
        >
          <ChevronLeftIcon width={35} height={35} fontWeight={700} />
        </Link>
        <h1 className="font-[700] text-[50px]"> {data.title} </h1>
        <div className=" relative w-[8rem] h-[4rem]">
          <Image alt={"logo"} src={data.logoPath} fill />
        </div>
      </div>
      <div className=" flex flex-col w-[80%] self-center items-center">
        <h3 className="mb-[1rem] text-[25px]">Enter Verification Code Below</h3>
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
      <h2 className="mt-[1rem] text-[30px] font-[700] text-[#808080]">Resend Code</h2>
      </div>

      <div className="flex justify-center sm:mb-[15rem]">
          <Link
            href={"#"}
            className="bg-[#000]  rounded-[7px] py-[0.5rem] text-[29px] flex justify-center text-white w-[213px] h-[66px]">
            Verify
          </Link>
        </div>
    </div>
  );
}
