"use client";
import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function NewPasswordForm() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  return (
    <div className="bg-[#E9E9E9] w-full h-screen">
      <button className="rounded-[7px] border-4 border-solid border-black text-black text-[20px] w-[145px] h-[60px] mt-[2rem] absolute top-0 right-[2rem]">
        SKILLER
      </button>
      <h2 className="font-[550] text-[35px] pt-[6rem] flex justify-center mb-2 p-6">
        New Password
      </h2>

      <div className="flex flex-col items-center">
        <div className="mb-4 flex flex-col p-6 relative w-[32rem]">
          <label className=" text-[20px] mb-4">Enter password</label>
          <div className="relative">
            <input
              placeholder="************"
              type={passwordVisible ? "text" : "password"}
              className="bg-inherit border border-gray-400 rounded-md px-3 py-[1.3rem] w-full pr-10"
            />
            <span
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-[50%] transform -translate-y-[50%] cursor-pointer"
            >
              {passwordVisible ? <FaEye /> : <FaEyeSlash />}
            </span>
          </div>
        </div>

        <div className="mb-8 flex flex-col p-6 relative w-[32rem]">
          <label className=" text-[20px] mb-5">Repeat Password</label>
          <div className="relative">
            <input
              placeholder="***********"
              type={passwordVisible ? "text" : "password"}
              className="bg-inherit border border-gray-400 rounded-md px-3 py-[1.3rem] w-full pr-10"
            />
            <span
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-[50%] transform -translate-y-[50%] cursor-pointer"
            >
              {passwordVisible ? <FaEye /> : <FaEyeSlash />}
            </span>
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <button className="bg-[#000] rounded-[7px] text-[25px] text-white px-4 py-1 w-[470px]">
          Finish
        </button>
      </div>
    </div>
  );
}
