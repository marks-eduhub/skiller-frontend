import React from "react";
import data from "./data.json";
import Image from "next/image";
import Link from "next/link";

export default function SignUp() {
  return (
    <div className="bg-[#E9E9E9] h-screen  w-[100%] flex flex-col p-[1.5rem] text-black items-center">
      <h2 className="font-[600] text-[50px] mt-[1rem]">
        {data.registerForm.title}
      </h2>
      <div className="flex flex-col w-[100%] gap-[2.2rem] mt-[2rem]">
        {/* email and password */}
        <div className="flex flex-row gap-[1.5rem] w-full">
          <div className="flex flex-col items-start">
            <div className="font-[400] text-[22px]">Email</div>
            <input
              placeholder="black@gmail.com"
              type="text"
              className="fieldBoxShadow  bg-[#F9F9F9] rounded-[14px] px-3 py-[1.3rem] w-[20rem]"
            />
          </div>
          <div className="flex flex-col items-start">
            <div className="font-[400] text-[22px]">Phone</div>
            <div className=" w-[20rem] gap-2 flex flex-row ">
              <input
                placeholder="256"
                type="text"
                className="fieldBoxShadow  bg-[#F9F9F9] rounded-[14px]  px-3 py-[1.3rem] w-[4rem]"
              />
              <input
                placeholder="700600504"
                type="text"
                className="fieldBoxShadow  bg-[#F9F9F9] rounded-[14px]  px-3 py-[1.3rem] w-[14rem]"
              />
            </div>
          </div>
        </div>
        {/* gender and dob */}
        <div className="flex flex-row gap-[1.5rem] w-full">
          <div className="flex flex-col items-start">
            <div className="font-[400] text-[22px]">Gender</div>
            <select
              id="gender"
              name="gender"
              className="fieldBoxShadow  bg-[#F9F9F9] rounded-[14px]  px-3 py-[1.3rem] w-[20rem]"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="flex flex-col items-start">
            <div className="font-[400] text-[22px]">Date of birth</div>
            <div className=" w-[20rem] gap-4 flex flex-row ">
              <input
                placeholder="DD"
                type="number"
                min="1"
                className="fieldBoxShadow  bg-[#F9F9F9] rounded-[14px]  px-3 py-[1.3rem] w-[4.5rem]"
              />
              <input
                placeholder="MM"
                type="number"
                min="1"
                className="fieldBoxShadow  bg-[#F9F9F9] rounded-[14px]  px-3 py-[1.3rem] w-[4.5rem]"
              />
              <input
                placeholder="YYYY"
                type="number"
                min="1"
                className="fieldBoxShadow  bg-[#F9F9F9] rounded-[14px]  px-3 py-[1.3rem] w-[8rem]"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-row gap-[1.5rem] w-full">
          <div className="flex flex-col items-start">
            <div className="font-[400] text-[22px]">Password</div>
            <input
              placeholder="************                                            👁"
              type="password"
              className="fieldBoxShadow  bg-[#F9F9F9] rounded-[14px] px-3 py-[1.3rem] w-[20rem]"
            />
          </div>
          <div className="flex flex-col items-start">
            <div className="font-[400] text-[22px]">Confirm Password</div>
            <input
              placeholder="************                                            👁"
              type="password"
              className="fieldBoxShadow  bg-[#F9F9F9] rounded-[14px] px-3 py-[1.3rem] w-[20rem]"
            />
          </div>
        </div>
        <label
          htmlFor="termsCheckbox"
          className="text-[#002BC5] w-[509px] h-[69px] "
        >
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
            className="bg-[#000] absolute bottom-[6rem] rounded-[7px] py-[0.5rem] text-[29px] flex justify-center text-white w-[213px] h-[66px]"
          >
            {data.registerForm.action.text}
          </Link>
        </div>

        <div className="flex flex-row items-center gap-6 bottom-[5rem] font-[700]">
          <hr className="border-[1px] border-black w-[48%] " />
          OR
          <hr className="border-[1px] border-black w-[48%] " />
        </div>

        <div className="fixed w-[40px] h-[40px] bottom-[0.2rem] ml-[21rem]">
          <Image
            src={data.registerForm.action.googlelogo}
            alt={"google"}
            fill
          />
        </div>
      </div>
    </div>
  );
}
