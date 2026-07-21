"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import data from "./data.json";
import { useAuthContext } from "@/components/AuthProvider/AuthContext";
import { login } from "../../../hooks/Authhooks/useLogin";
import { message } from "antd";
import dynamic from "next/dynamic";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Image from "next/image";
import { redirectToGoogleAuth } from "@/hooks/Authhooks/useRegister";
// dotPulse.register();

const DotPulseWrapper = dynamic(() => import("@/hooks/pulse"), { ssr: false });

export default function LogIn() {
  const [showPassword, setShowPassword] = useState(false);
  const handlePassword = () => setShowPassword(!showPassword);

  const authContext = useAuthContext();
  const { setUser } = authContext || {};
  const router = useRouter();

  const { mutate, isPending } = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      message.success(`Welcome back ${data.user.username}`);

      if (setUser) {
        setUser(data.user);
      }
      router.push("/dashboard");
    },
    onError: (mutationError: Error) => {
      message.error(mutationError.message || "Something went wrong!");
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

  const {
    mutate: mutateGoogle,
    isPending: isPendingGoogle,
  } = useMutation({
    mutationFn: redirectToGoogleAuth,
    onError: (error) => {
      message.error((error as Error).message || "Something went wrong!");
    },
  });

  const handleGoogleSignUp = async () => {
     try {
       await mutateGoogle();
     } catch (error) {}
   };

  return (
    <div className="bg-[#E9E9E9] min-h-screen w-full px-4 py-10 sm:px-6">
      <div className="mx-auto flex w-full max-w-[440px] flex-col items-center justify-center">
        <h2 className="mt-2 text-center text-[34px] font-[600] sm:text-[42px]">
          {data.loginForm.title}
        </h2>
        <form
          className="mt-8 flex w-full flex-col gap-6"
          onSubmit={handleLogin}
        >
          <div className="flex w-full flex-row gap-[1.5rem]">
            <div className="flex w-full flex-col items-start">
              <label className="my-2 text-[16px] font-medium sm:text-[18px]">Email</label>
              <input
                placeholder="black@gmail.com"
                type="email"
                required
                name="email"
                className="w-full rounded-md border border-gray-600 bg-inherit px-3 py-4 text-[15px]"
              />
            </div>
          </div>

          <div className="relative flex flex-col items-start">
            <label className="my-2 text-[16px] font-medium sm:text-[18px]">Password</label>
            <input
              placeholder="***************"
              type={showPassword ? "text" : "password"}
              required
              name="password"
              className="w-full rounded-md border border-gray-600 bg-inherit px-3 py-4 pr-10 text-[15px]"
            />
            <span
              onClick={handlePassword}
              className="absolute right-3 top-[70%] -translate-y-[50%] cursor-pointer"
            >
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </span>
          </div>
          <Link href="/auth/forgot-password">
            <h1 className="text-right text-[15px] text-blue-600">Forgot Password?</h1>
          </Link>
          <button
            className="mx-auto flex min-h-[48px] w-full max-w-[320px] items-center justify-center rounded-md bg-black px-4 text-sm text-zinc-300 transition disabled:cursor-not-allowed disabled:opacity-70 sm:text-base"
            type="submit"
            disabled={isPending}
          >
            {isPending ? (
              <span className="flex items-center gap-3">
                <DotPulseWrapper size="18" speed="1.5" color="white" />
                Signing in...
              </span>
            ) : (
              <span>Login</span>
            )}
          </button>
        </form>
      </div>

      <div className="mx-auto mt-8 flex w-full max-w-[440px] flex-row items-center gap-6 font-[700]">
        <hr className="border-[1px] border-black flex-grow" />
        OR
        <hr className="border-[1px] border-black flex-grow" />
      </div>

      <div className="mx-auto flex max-w-[440px] justify-center">
        <button
          onClick={handleGoogleSignUp}
          disabled={isPendingGoogle}
          className="my-4 flex min-h-[48px] w-full max-w-[320px] items-center justify-center gap-2 rounded-md border border-black px-4 text-base transition disabled:cursor-not-allowed disabled:opacity-70"
        >
          <Image
            src={data.loginForm.googlelogo}
            alt={"google"}
            width={32}
            height={32}
          />
          <p className="text-[15px] sm:text-[16px]">
            {isPendingGoogle ? "Redirecting..." : "Sign In with Google"}
          </p>
        </button>
      </div>
      <div className="mt-8 flex w-full items-center justify-center sm:hidden">
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
