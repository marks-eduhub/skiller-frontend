import React from "react";

export default function NewPasswordForm() {
  return (
    <div className="bg-[#E9E9E9] w-full">
      <button className="rounded-[7px] border-4 border-solid border-black text-black text-[20px] w-[145px] h-[60px] mt-[2rem] absolute top-0 right-[2rem]">
        SKILLER
      </button>
      <h2 className="font-[600] text-[25px] mt-[5rem] flex justify-center mb-2">
        New Password
      </h2>

      <div className="flex flex-col items-center">
        <div className="mb-4">
          <div className="font-[400] text-[22px]">Password</div>
          <input
            placeholder="************"
            type="password"
            className="fieldBoxShadow bg-[#F9F9F9] rounded-[14px] px-3 py-[1.3rem] w-[20rem]"
          />
        </div>

        <div className="mb-8">
          <div className="font-[400] text-[22px]">Repeat Password</div>
          <input
            placeholder="***********"
            type="password"
            className="fieldBoxShadow bg-[#F9F9F9] rounded-[14px] px-3 py-[1.3rem] w-[20rem]"
          />
        </div>
      </div>

      <div className="flex justify-center">
        <button className="bg-[#000] rounded-[7px] text-[25px] text-white w-[211px] h-[73px]">
          Finish
        </button>
      </div>
    </div>
  );
}
