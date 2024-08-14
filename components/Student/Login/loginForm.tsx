"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import data from "./data.json";
import { dotPulse } from "ldrs";
import { useAuthContext } from "@/Context/AuthContext";
import { login } from "../../../lib/login";

dotPulse.register();

export default function LogIn() {
  const authContext = useAuthContext();
  const { setUser } = authContext || {};
  const router = useRouter();

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      if (setUser) {
        setUser(data.user);
      }
      router.push("/dashboard");
    },
    onError: (error: any) => {
      console.error(error.message || "Something went wrong!");
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
      <div className="sm:hidden flex flex-row justify-between items-center w-full px-[0.5rem]">
        <Link
          href={"/auth/register"}
          className="bg-[#000] w-[8rem] font-[600] py-[0.9rem] items-center rounded-[12px] text-[17px] flex justify-center text-white"
        >
          Register
        </Link>

        <div className="relative w-[8rem] h-[4rem]">
          <Image alt={"logo"} src={data.loginForm.logo} fill />
        </div>
      </div>
      <div className="flex flex-col items-center">
        <h2 className="font-[600] text-[38px] sm:text-[50px] mt-[1rem]">
          {data.loginForm.title}
        </h2>
        {isError && <p className="text-red-500 mt-4">{error.message || "Login failed"}</p>}

        <form
          className="flex flex-col w-full gap-[2.2rem] mt-[2rem]"
          onSubmit={handleLogin}
        >
          <div className="flex flex-row gap-[1.5rem] w-full">
            <div className="flex flex-col items-start">
              <div className="font-[400] text-[14px] sm:text-[22px]">Email</div>
              <input
                placeholder="black@gmail.com"
                type="email"
                required
                name="email"
                className="fieldBoxShadow bg-[#F9F9F9] rounded-[14px] px-3 py-[1.3rem] w-[20rem] sm:w-[25rem]"
              />
            </div>
          </div>

          <div className="flex flex-row gap-[1.5rem] w-full">
            <div className="flex flex-col items-start">
              <div className="font-[400] text-[14px] sm:text-[22px]">
                Password
              </div>
              <input
                placeholder="***************"
                type="password"
                required
                name="password"
                className="fieldBoxShadow bg-[#F9F9F9] rounded-[14px] px-3 py-[1.3rem]  w-[20rem]  sm:w-[25rem]"
              />
            </div>
          </div>

          <button
            className="bg-black text-zinc-300 rounded-md p-2 text-sm sm:text-lg hover:cursor-pointer mx-auto w-[100px]"
            type="submit"
            disabled={isPending} 
          >
            <span className="pr-4">Login</span>
            {isPending && (
              <l-dot-pulse size="15" speed="2.5" color="white"></l-dot-pulse>
            )}
          </button>
          <div className="font-bold text-gray-500 text-lg mx-auto">
            Trouble logging in?
          </div>
        </form>
      </div>

      <div className="flex flex-row items-center gap-6 mt-[2rem] font-[700] w-[80%]">
        <hr className="border-[1px] border-black flex-grow" />
        OR
        <hr className="border-[1px] border-black flex-grow" />
      </div>

      <div className="relative w-[100%] flex justify-center mt-[2rem] cursor-pointer">
        <Image
          src="/logos/googleLogo.svg"
          alt={"google"}
          width={80}
          height={80}
        />
      </div>
      <div className="flex sm:hidden items-center font-[600] justify-center text-white text-[24px] bottom-0 w-full h-[11rem] bg-black mt-[10px]">
        {data.loginForm.WelcomeMsg}
      </div>
    </div>
  );
}
