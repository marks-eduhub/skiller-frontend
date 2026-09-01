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
    <div className="min-h-screen w-full bg-background px-4 py-10 sm:px-6">
      <div className="mx-auto flex w-full max-w-[440px] flex-col items-center justify-center">
        <h2 className="mt-2 text-center text-3xl font-display font-bold sm:text-4xl">
          {data.loginForm.title}
        </h2>
        <form
          className="mt-8 flex w-full flex-col gap-6"
          onSubmit={handleLogin}
        >
          <div className="flex w-full flex-col items-start">
            <label className="mb-2 text-sm font-medium sm:text-base">Email</label>
            <input
              placeholder="black@gmail.com"
              type="email"
              required
              name="email"
              className="w-full rounded-md border border-input bg-background px-3 py-3.5 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            />
          </div>

          <div className="relative flex flex-col items-start">
            <label className="mb-2 text-sm font-medium sm:text-base">Password</label>
            <input
              placeholder="***************"
              type={showPassword ? "text" : "password"}
              required
              name="password"
              className="w-full rounded-md border border-input bg-background px-3 py-3.5 pr-10 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            />
            <button
              type="button"
              onClick={handlePassword}
              aria-label={showPassword ? "Hide password" : "Show password"}
              aria-pressed={showPassword}
              className="absolute right-3 top-[38px] text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm"
            >
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </button>
          </div>
          <Link
            href="/auth/forgot-password"
            className="text-right text-sm font-medium text-primary hover:underline"
          >
            Forgot Password?
          </Link>
          <button
            className="mx-auto flex min-h-[48px] w-full max-w-[320px] items-center justify-center rounded-md bg-primary px-4 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-70 sm:text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
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

      <div className="mx-auto mt-8 flex w-full max-w-[440px] flex-row items-center gap-6 text-sm font-semibold text-muted-foreground">
        <hr className="flex-grow border-border" />
        OR
        <hr className="flex-grow border-border" />
      </div>

      <div className="mx-auto flex max-w-[440px] justify-center">
        <button
          onClick={handleGoogleSignUp}
          disabled={isPendingGoogle}
          className="my-4 flex min-h-[48px] w-full max-w-[320px] items-center justify-center gap-2 rounded-md border border-input bg-background px-4 text-sm font-medium text-foreground transition hover:bg-accent disabled:cursor-not-allowed disabled:opacity-70 sm:text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          <Image
            src={data.loginForm.googlelogo}
            alt=""
            width={40}
            height={40}
          />
          <span>{isPendingGoogle ? "Redirecting..." : "Sign In with Google"}</span>
        </button>
      </div>
      <div className="mt-8 flex w-full items-center justify-center text-sm sm:hidden">
        <p>
          Dont have an account?{" "}
          <Link href="/auth/register" className="font-medium text-primary hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
