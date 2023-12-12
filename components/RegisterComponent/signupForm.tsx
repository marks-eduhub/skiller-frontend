import React from "react";
import data from "./data.json";
import Image from "next/image";
import Link from "next/link";

export default function SignUp() {
  return (
    <div
      className="bg-[#E9E9E9] h-screen  w-[100%] flex flex-col p-[1.5rem] text-black items-center  overflow-y-auto overflow-x-hidden relative "
    >
      <div className="fixed -bottom-[10rem] -right-[5.5rem]  sm:-top-[8rem] sm:-right-[6.5rem] h-[14rem] w-[14rem]  bg-black opacity-[14%] transform rounded-full " />
      <div className="sm:hidden flex flex-row justify-between items-center w-full px-[0.5rem]">
      <Link
            href={"/auth"}
            className="bg-[#000] w-[8rem] font-[600] py-[0.9rem] items-center  rounded-[12px] text-[17px] flex justify-center text-white"
          >
            Login
          </Link>

        <div className=" relative w-[8rem] h-[4rem]">
          <Image alt={"logo"} src={data.registerForm.logo} fill />
        </div>
      </div>
      
      <h2 className="font-[600] sm:text-[50px] mt-[1rem] text-[38px]">
        {data.registerForm.title}
      </h2>
      <div className="flex flex-col w-[100%] gap-[1.5rem] sm:gap-[2.2rem] mt-[2rem]">
        <div className="flex flex-col sm:flex-row justify-between max-sm:gap-[1.5rem] w-full">
          <div className="flex flex-col items-start">
            <div className="font-[400] text-[14px]  sm:text-[22px]">Email</div>
            <input
              placeholder="black@gmail.com"
              type="text"
              className="fieldBoxShadow  bg-[#F9F9F9] rounded-[14px] px-3 py-[0.7rem] sm:py-[1.3rem] w-full sm:w-[20rem]"
            />
          </div>
          <div className="flex flex-col items-start">
            <div className="font-[400] text-[14px] sm:text-[22px]">Phone</div>
            <div className=" w-full sm:w-[20rem] gap-2 flex flex-row ">
              <input
                placeholder="256"
                type="text"
                className="fieldBoxShadow  bg-[#F9F9F9] rounded-[14px]  px-3 py-[0.7rem] sm:py-[1.3rem] w-[4rem]"
              />
              <input
                placeholder="700600504"
                type="text"
                className="fieldBoxShadow  bg-[#F9F9F9] rounded-[14px]  px-3 py-[0.7rem] sm:py-[1.3rem] w-full sm:w-[14rem]"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between max-sm:gap-[1.5rem] w-full">
          <div className="flex flex-col items-start">
            <div className="font-[400] text-[14px] sm:text-[22px]">Gender</div>
            <select
              id="gender"
              name="gender"
              className="fieldBoxShadow  bg-[#F9F9F9] rounded-[14px]  px-3 py-[0.7rem] sm:py-[1.3rem] w-full sm:w-[20rem]"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="flex flex-col items-start">
            <div className="font-[400] text-[14px] sm:text-[22px]">Date of birth</div>
            <div className=" w-full sm:w-[20rem] gap-4 flex flex-row max-sm:justify-between">
              <input
                placeholder="DD"
                type="number"
                min="1"
                className="fieldBoxShadow  bg-[#F9F9F9] rounded-[14px]  px-3 py-[0.7rem] sm:py-[1.3rem] w-[4.5rem]"
              />
              <input
                placeholder="MM"
                type="number"
                min="1"
                className="fieldBoxShadow  bg-[#F9F9F9] rounded-[14px]  px-3 py-[0.7rem] sm:py-[1.3rem] w-[4.5rem]"
              />
              <input
                placeholder="YYYY"
                type="number"
                min="1"
                className="fieldBoxShadow  bg-[#F9F9F9] rounded-[14px]  px-3 py-[0.7rem] sm:py-[1.3rem] w-[8rem]"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between max-sm:gap-[1.5rem]  w-full">
          <div className="flex flex-col items-start">
            <div className="font-[400] text-[14px] sm:text-[22px]">Password</div>
            <input
              placeholder="************"
              type="password"
              className="fieldBoxShadow  bg-[#F9F9F9] rounded-[14px] px-3 py-[0.7rem] sm:py-[1.3rem] w-full sm:w-[20rem]"
            />
          </div>
          <div className="flex flex-col items-start">
            <div className="font-[400] text-[14px] sm:text-[22px]">Confirm Password</div>
            <input
              placeholder="***********"
              type="password"
              className="fieldBoxShadow  bg-[#F9F9F9] rounded-[14px] px-3 py-[0.7rem] sm:py-[1.3rem] w-full sm:w-[20rem]"
            />
          </div>
        </div>
        <label htmlFor="termsCheckbox" className="text-[#002BC5] ">
          <input
            type="checkbox"
            id="termsCheckbox"
            name="terms"
            value="accepted"
            className="w-[20px] h-[20px] "
          />
          Terms and conditions
        </label>

        <div className="flex justify-center">
          <Link
            href={data.registerForm.action.link}
            className="bg-[#000]  rounded-[7px] py-[1rem] sm:py-[0.5rem] text-[22px] sm:text-[29px] flex justify-center text-white w-[213px] sm:h-[66px]"
          >
            {data.registerForm.action.text}
          </Link>
        </div>

        <div className="flex flex-row items-center gap-6 bottom-[5rem] font-[700]">
          <hr className="border-[1px] border-black w-[48%] " />
          OR
          <hr className="border-[1px] border-black w-[48%] " />
        </div>

        <div className="relative w-[100%] flex justify-center bottom-[1rem] mt-2 cursor-pointer">
          <Image
            src={data.registerForm.action.googlelogo}
            alt={"google"}
            width={80}
            height={80}
          />
        </div>
      </div>
    </div>
  );
}
