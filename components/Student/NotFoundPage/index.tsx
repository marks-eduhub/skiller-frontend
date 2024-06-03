"use client";

import React from "react";
import data from "./data.json";
import Image from "next/image";
import { Button } from "../../ui/button";
// import { useRouter } from 'next/router';

interface NotFoundPageProps {
  errorMessage?: string;
}
const NotFoundPage: React.FC<NotFoundPageProps> = ({ errorMessage }) => {
  // const router = useRouter(); // Access the router object

  // function handleOnClick(): void {
  //   router.push("/dashboard");
  // }

  return (
    <div className="flex flex-col justify-between md:grid md:grid-cols-3 md:grid-rows-6 gap-3 bg-grey h-screen p-4 relative text-white overflow-y-auto">
      {/* <div className="grid grid-cols-3" > */}
      <div className="md:hidden flex justify-between">
        <div className="relative w-[7rem] h-[2rem] md:hidden">
          <Image
            src={data.backImage}
            alt={"skiller logo"}
            priority={true}
            fill
          />
        </div>
        <div className="hidden md:w-20 h-300 row-span-1"></div>

        <div className="relative w-[10rem] h-[3rem]">
          <Image
            src={data.whitelogo}
            alt={"skiller logo"}
            priority={true}
            fill
          />
        </div>
      </div>

      <div className=" md:w-20 md:h-300 md:row-span-1"></div>
      <div className=" md:w-20 md:h-300 md:row-span-1"></div>

      <div className="hidden md:flex md:self-center md:justify-end md:relative md:h-[3rem]">
        <Image src={data.whitelogo} alt={"skiller logo"} priority={true} fill />
      </div>

      <div className=" md:w-20 md:h-300 md:row-span-1"></div>

      <div className="text-[40px] text-black flex justify-center font-bold self-center md:self-start">
        {data.tagline}
      </div>
      <div className="md:w-20 md:h-300 md:row-span-1"></div>

      <div className="md:w-20 md:h-300 md:row-span-4"></div>

      <div className="flex w-full flex-col gap-[4rem] bg-grey items-center row-span-4">
        <div className="relative w-[18rem] h-[12rem] flex self-center justify-center">
          <Image src={data.errorImage} alt={"logo"} priority={true} fill />
        </div>
        <div className=" text-[30px] md:text-[40px] mt-[2rem] text-black text-center">
          {errorMessage || "An error has occurred"}
        </div>
        <Button size="lg">{data.buttonText}</Button>
      </div>
      <div className="md:w-20 md:h-300 md:row-span-4"></div>

      <div className="fixed left-1/8 w-[18rem] h-[18rem] bottom-[-14rem] md:left-1/6 md:bottom-[-40rem] md:h-[44rem] md:w-[44rem] lg:left-1/4  bg-black opacity-[14%] transform rounded-full " />
    </div>
  );
};
export default NotFoundPage;
