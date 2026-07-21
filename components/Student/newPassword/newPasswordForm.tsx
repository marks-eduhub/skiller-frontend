"use client";
import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { confirmPasswordReset } from "@/hooks/Authhooks/useResetpassword";
import { useMutation } from "@tanstack/react-query";
import { message } from "antd";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function NewPasswordForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token")
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const handlePasswordConfirmationChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPasswordConfirmation(e.target.value);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const { mutate: resetPassword, isPending } = useMutation({
    mutationFn: async () => {
      return await confirmPasswordReset(password, passwordConfirmation, token);
    },
    onSuccess: (data) => {
      message.success("Password reset successful. You can log in now.");
      setPassword("");
      setPasswordConfirmation("");

    },
    onError: (error) => {
      message.error("Error resetting password");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    if (!password || password.length < 8) {
      message.warning("Password must be at least 8 characters long.");
      return;
    }
    if (password !== passwordConfirmation) {
      message.warning("Passwords do not match.");
      return;
    }

    e.preventDefault();
    resetPassword();
  };

  return (
    <div className="min-h-screen w-full bg-[#E9E9E9] px-4 py-8 sm:px-6">
      <button className="absolute right-4 top-4 h-[48px] w-[118px] rounded-[10px] border-[3px] border-solid border-black text-[16px] sm:right-8 sm:top-8">
        SKILLER
      </button>
      <h2 className="mb-2 flex justify-center px-6 pt-20 text-[32px] font-[550] sm:text-[38px]">
        New Password
      </h2>

      <div className="flex flex-col items-center">
        <div className="relative mb-3 flex w-full max-w-[520px] flex-col p-4 sm:p-6">
          <label className="mb-3 text-[16px] font-medium sm:text-[18px]">Enter password</label>
          <div className="relative">
            <input
              placeholder="************"
              type={passwordVisible ? "text" : "password"}
              onChange={handlePasswordChange}
              value={password}
              className="w-full rounded-md border border-gray-400 bg-inherit px-3 py-4 pr-10"
            />
            <span
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-[50%] transform -translate-y-[50%] cursor-pointer"
            >
              {passwordVisible ? <FaEye /> : <FaEyeSlash />}
            </span>
          </div>
        </div>

        <div className="relative mb-6 flex w-full max-w-[520px] flex-col p-4 sm:p-6">
          <label className="mb-3 text-[16px] font-medium sm:text-[18px]">Repeat Password</label>
          <div className="relative">
            <input
              placeholder="***********"
              onChange={handlePasswordConfirmationChange}
              value={passwordConfirmation}
              type={confirmPasswordVisible ? "text" : "password"}
              className="w-full rounded-md border border-gray-400 bg-inherit px-3 py-4 pr-10"
            />
            <span
              onClick={toggleConfirmPasswordVisibility}
              className="absolute right-3 top-[50%] transform -translate-y-[50%] cursor-pointer"
            >
              {confirmPasswordVisible ? <FaEye /> : <FaEyeSlash />}
            </span>
          </div>
        </div>
      </div>

      <div className="flex justify-center">

        <button
          disabled={isPending}
          onClick={handleSubmit}
          type="button"
          className="flex min-h-[48px] w-full max-w-[420px] items-center justify-center rounded-[8px] bg-[#000] px-4 py-2 text-[16px] text-white transition disabled:cursor-not-allowed disabled:opacity-70 sm:text-[18px]"
        >
          {isPending ? "Updating password..." : "Finish"}
        </button>
      </div>

      <div className="mx-auto mt-8 flex justify-center text-center text-base font-bold text-gray-500">
        Back To 
        <Link href={"/auth"} className="text-blue-600">
          Login 
        </Link>
        ?
      </div>
    </div>
  );
}
