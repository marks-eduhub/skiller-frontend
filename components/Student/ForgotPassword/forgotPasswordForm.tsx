"use client";
import React , {useState} from "react";

import data from "./data.json";
import Link from "@/node_modules/next/link";
import { MdArrowBackIosNew } from "react-icons/md";
import { useMutation } from "@tanstack/react-query";

import { requestPasswordReset } from "@/hooks/Authhooks/useResetpassword";
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
      message.success("Check your email for the link",);

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
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center bg-[#E9E9E9] px-4 py-10 sm:px-6">
      <div className="flex w-full max-w-[460px] flex-col items-center">
        <Link
          href={"/auth"}
          className="absolute left-4 top-4 flex h-[48px] w-[48px] items-center justify-center rounded-[12px] border-[3px] border-black text-[18px] font-[700] sm:left-8 sm:top-8"
        >
          <MdArrowBackIosNew width={60} height={30} fontWeight={100} />
        </Link>

        <div className="fixed -top-[17rem] -right-[4.5rem]  sm:-bottom-[9rem] sm:-right-[6.5rem] h-[20rem] w-[20rem]  bg-black opacity-[14%] transform rounded-full" />

        <button className="absolute right-4 top-4 h-[46px] w-[110px] rounded-[12px] border-[3px] border-solid border-black text-[16px] sm:right-8 sm:top-8">
          SKILLER
        </button>

        <div className="mt-16 flex w-full flex-col items-center gap-6">
          <h2 className="mb-1 text-center text-[30px] font-[600] sm:text-[36px]">
            {data.forgotPassword.title}
          </h2>

          <div className="flex w-full flex-col items-start">
            <div className="mb-4 text-[16px] text-gray-700">
              Enter Registered Email Address
            </div>
            <input
              onChange={handleEmailChange}
              value={email}
              placeholder="black@gmail.com"
              type="text"
             
              className="w-full rounded-md border border-gray-400 bg-inherit px-3 py-4"
            />
          </div>
        </div>

        <button 
          type="button"
          disabled={isPending}
          className="mx-auto mt-8 flex min-h-[48px] w-full max-w-[320px] items-center justify-center rounded-md bg-black px-4 text-sm text-zinc-300 transition disabled:cursor-not-allowed disabled:opacity-70 sm:text-base" onClick={handleSubmit}
        >
          {isPending ? "Sending reset link..." : "Submit"}
        </button>

        <div className="mx-auto mt-8 text-center text-base font-bold text-gray-500">
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
