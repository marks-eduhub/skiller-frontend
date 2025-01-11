"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import data from "./data.json";
// import { dotPulse } from "ldrs";
import { useAuthContext } from "@/Context/AuthContext";
import { login } from "../../../lib/login";
import { message } from "antd";
import dynamic from "next/dynamic";
import { FaEye, FaEyeSlash } from "react-icons/fa";
// dotPulse.register();

const DotPulseWrapper = dynamic(() => import('@/hooks/pulse'), { ssr: false });

export default function LogIn() {
  const [showPassword, setShowPassword] = useState(false);
  const handlePassword = () => setShowPassword(!showPassword);

  const authContext = useAuthContext();
  const { setUser } = authContext || {};
  const router = useRouter();

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      message.success(`Welcome back ${data.user.username}`);

      if (setUser) {
        setUser(data.user);
      }
      router.push("/dashboard");
    },
    onError: (error: any) => {
      error(error.message || "Something went wrong!");
    },
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData();
    formData.append("identifier", form.email.value);
    formData.append("password", form.password.value);

    mutate(formData);
  };

  return (
    <div className="bg-[#E9E9E9] h-screen w-full flex flex-col justify-center items-center relative">
      <div className="flex flex-col items-center">
        <h2 className="font-[600] text-[38px] sm:text-[50px] mt-[1rem]">
          {data.loginForm.title}
        </h2>
        {isError && (
          <p className="text-red-500 mt-4">{error.message || "Login failed"}</p>
        )}

        <form
          className="flex flex-col w-full gap-[2.2rem] mt-[2rem]"
          onSubmit={handleLogin}
        >
          <div className="flex flex-row gap-[1.5rem] w-full">
            <div className="flex flex-col items-start">
              <label className=" my-2 sm:text-[22px]">Email</label>
              <input
                placeholder="black@gmail.com"
                type="email"
                required
                name="email"
                className=" bg-inherit rounded-md border border-gray-600 px-3 py-[1.3rem] w-[20rem] sm:w-[25rem]"
              />
            </div>
          </div>

          <div className="flex flex-col items-start relative">
            <label className=" my-2 sm:text-[22px]">Password</label>
            <input
              placeholder="***************"
              type={showPassword ? "text" : "password"}
              required
              name="password"
              className=" bg-inherit rounded-md border border-gray-600 px-3 py-[1.3rem]  w-[20rem]  sm:w-[25rem]"
            />
            <span
              onClick={handlePassword}
              className="absolute right-3 top-[70%] transform -translate-y-[50%] cursor-pointer"
            >
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </span>
          </div>
          <Link href="/auth/forgot-password">
          <h1 className="text-blue-600 cursor-pointer">Forgot Password?</h1>
          </Link>
          <button
            className="bg-black text-zinc-300 rounded-md p-2 text-sm sm:text-lg hover:cursor-pointer mx-auto w-[300px]"
            type="submit"
            disabled={isPending}
          >
            <span className="pr-4">Login</span>
            {isPending && (
               <DotPulseWrapper size="20" speed="1.5" color="white" />
              // <l-dot-pulse size="20" speed="1.5" color="white"/>
            )}
          </button>
          {/* <div className="font-bold text-gray-500 text-lg mx-auto">
            Trouble logging in?
          </div> */}
        </form>
      </div>

      <div className="flex flex-row items-center gap-6 mt-[2rem] font-[700] w-[80%]">
        <hr className="border-[1px] border-black flex-grow" />
        OR
        <hr className="border-[1px] border-black flex-grow" />
      </div>

      <div className="relative w-[100%] flex justify-center mt-[2rem] cursor-pointer">
        <Image
          src="/logos/google.png"
          alt={"google"}
          width={130}
          height={130}
        />
      </div>
      <div className="flex sm:hidden items-center  justify-center w-full  mt-10">
        <h1>
          Dont have an account?{" "}
          <Link href="/auth/register" className="text-blue-600">
            Sign Up
          </Link>
        </h1>
      </div>
    </div>
  );
}
