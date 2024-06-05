import React from "react";
import Image from "next/image";
const Resources = () => {
  return (
    <div className="flex w-full justify-between pl-9 pt-20 ">
        <div className="w-1/4 h-[200px] border-2 border-black rounded-2xl p-8">
      <div className="flex flex-col items-center justify-center">
        <Image src="/resource1.svg" alt="resources" width={45} height={45} />
        <h1 className="font-semibold mt-6">Instruction Center</h1>
      </div>
      </div>
      <div className="w-1/4 h-[200px] border-2 border-black rounded-2xl p-8">

      <div className="flex flex-col items-center justify-center">
        <Image src="/resource2.svg" alt="resources" width={45} height={45} />
        <h1 className="font-semibold mt-6">Instructor network</h1>
      </div>
      </div>
      <div className="w-1/4 h-[200px] border-2 border-black rounded-2xl p-8">

      <div className="flex flex-col items-center justify-center">
        <Image src="/resource3.svg" alt="resources" width={45} height={45} />
        <h1 className="font-semibold mt-6">Help and Support</h1>
      </div>
      </div>
    </div>
  );
};

export default Resources;
