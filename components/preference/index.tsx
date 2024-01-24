"use client";

import React from "react";
import data from "./data.json";
import Image from "next/image";
import { Button } from "../ui/button";
// import { useRouter } from 'next/router';

interface PreferenceProps {
  errorMessage?: string;
}
const Preference: React.FC<PreferenceProps> = ({ errorMessage }) => {
  // const router = useRouter(); // Access the router object

  // function handleOnClick(): void {
  //   router.push("/dashboard");
  // }

  return (
    <div className="flex flex-col justify-center md:grid md:grid-cols-4 md:grid-rows-3 gap-3 bg-grey h-screen p-4 relative  overflow-y-auto">
      {/* row 1 */}
      <div className=""></div>
      <div className="text-black font-semibold text-2xl col-span-2 flex justify-center self-center ">
        <h3>Almost there, what's your taste ?</h3>
        <div className="fixed left-1/8 w-[18rem] h-[18rem] bottom-[-14rem] md:left-1/6 md:bottom-[-40rem] md:h-[44rem] md:w-[44rem] lg:left-1/4  bg-black opacity-[14%] transform rounded-full " />
      </div>
      <div className=""></div>

      {/* row 2 */}
        <div className="col-span-1">1</div>
        <div className="col-span-1">2</div>
        <div className="col-span-2">3</div>

    
      {/* row 3 */}
      <div className="flex justify-end self-center col-span-1">
        <button className="rounded-[7px] border-4 border-solid border-black text-black text-[20px] w-[145px] h-[60px] ">
          Skip
        </button>
      </div>
      <div className="col-span-2"></div>
      <div className=" flex justify-start self-center col-span-1">
        <button className="rounded-[7px] bg-black w-[145px] h-[60px] mt-[2rem] ">
          Sk
        </button>
      </div>
    </div>
  );
};
export default Preference;
