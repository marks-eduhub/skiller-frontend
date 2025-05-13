"use client"
import React, { useState } from "react";
import data from "./data.json";
import Link from "@/node_modules/next/link";
import { MdArrowBackIosNew } from "react-icons/md";
import { useMutation } from "@tanstack/react-query";
import { requestPasswordReset } from "@/hooks/Authhooks/useResetPassword";
import { message } from "antd";


export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const { mutate: requestPassword, isPending } = useMutation({
    mutationFn: async () => {
      return await requestPasswordReset(email);
    },
    onSuccess: (data) => {
      message.success("Check your email for the link:", data);
      setEmail("")
    },
    onError: (error) => {
      message.error("Error requesting password reset");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    if (!email || !email.includes("@")) {
      message.warning("Please enter a valid email address.");
      return;
    }
    e.preventDefault();
    requestPassword();
  };
  return (
    <div className="bg-[#E9E9E9] h-screen w-full flex flex-col justify-center items-center relative">
      <div className="flex flex-col items-center max-w-md w-full">
        <Link
          href={"/auth"}
          className="flex justify-center items-center rounded-[8px] border-[4px] md:rounded-[14px] md:border-[4px] border-black px-2 sm:py-3 font-[700] text-[18px] w-[60px]  md:w-[58px] h-[52px] mt-10 absolute top-0 left-10"
        >
          <MdArrowBackIosNew width={60} height={30} fontWeight={100} />
        </Link>

        <div className="fixed -top-[17rem] -right-[4.5rem]  sm:-bottom-[9rem] sm:-right-[6.5rem] h-[20rem] w-[20rem]  bg-black opacity-[14%] transform rounded-full" />

        <button className="rounded-[14px] border-4 border-solid border-black text-black text-[18px] w-[120px] h-[50px] mt-10 absolute top-0 right-10">
          SKILLER
        </button>

        <div className="flex flex-col items-center w-full  sm:gap-[1.5rem] gap-[2.2rem] mt-[2rem]">
          <h2 className="font-[600] text-[30px] mt-[1rem] mb-2 text-center sm:text-left">
            {data.forgotPassword.title}
          </h2>

          <div className="flex flex-col items-start">
            <div className="text-[18px] mx-auto mb-5 ">
              Enter Registered Email Address
            </div>
            <input
              onChange={handleEmailChange}
              value={email}
              placeholder="black@gmail.com"
              type="text"
              className="rounded-md border border-gray-400 bg-inherit px-3 py-[1.3rem] w-full sm:w-[25rem]"
            />
          </div>
        </div>

        <button 
          type="button"
          disabled={isPending}
          className="bg-black text-zinc-300 rounded-md p-2 text-sm sm:text-lg hover:cursor-pointer mt-[50px] mx-auto w-[300px]" onClick={handleSubmit}
        >
          {isPending ? "Submitting ..." : "Submit"}
        </button>

        <div className="font-bold text-gray-500 text-lg mt-[50px] mx-auto text-center sm:text-left ">
          Back To
          <Link href={"/auth"} className="text-blue-600">
            Login
          </Link>
          ?
        </div>
      </div>
    </div>
  );
}
