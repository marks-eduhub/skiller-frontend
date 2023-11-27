import React from "react";
import data from "./data.json"

export default function LogIn() {
  return (
    <div className="bg-[#E9E9E9] h-screen  w-[100%] flex flex-col p-[1.5rem] text-black items-center">
     <div className="flex flex-col items-center justify-center h-screen">
  <h2 className="font-[600] text-[50px] mt-[1rem]">
    {data.loginForm.title}
  </h2>
  <div className="flex flex-col w-[100%] gap-[2.2rem] mt-[2rem]">
    {/* email and password */}
    <div className="flex flex-row gap-[1.5rem] w-full">
      <div className="flex flex-col items-start">
        <div className="font-[400] text-[22px]">Email</div>
        <input
          placeholder="black@gmail.com"
          type="text"
          className="fieldBoxShadow bg-[#F9F9F9] rounded-[14px] px-3 py-[1.3rem] w-[20rem]"
        />
      </div>
    </div>
    {/* passwords */}
    <div className="flex flex-row gap-[1.5rem] w-full">
      <div className="flex flex-col items-start">
        <div className="font-[400] text-[22px]">Password</div>
        <input
          placeholder="***************"
          type="password"
          className="fieldBoxShadow bg-[#F9F9F9] rounded-[14px] px-3 py-[1.3rem] w-[20rem]"
        />
      </div>
    </div>
    {/* login button */}
    <button
      type="button"
      className="bg-black text-zinc-300 rounded-md p-2 text-sm sm:text-lg hover:cursor-pointer mx-auto"
      style={{ width: '100px' }}
    >
      Login
    </button>
    <div className="font-bold text-gray-500 text-lg mx-auto">Trouble logging in?</div>
    <div className="flex flex-row items-center gap-6 mt-[2rem] font-[700]">
          <hr className="border-[1px] border-black w-[48%] "/>
          OR
          <hr className="border-[1px] border-black w-[48%] "/>
        </div>
     </div>
         {/* google logo */}
         <div style={{ margin: '10px' }} />
            <img
              src="/logos/googleLogo.svg"
              alt="Google Logo"
              width="80"
              height="80"
            />
          </div>
    </div>
  );
}