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
    <div className="bg-[#E9E9E9] w-full h-screen">
      <button className="rounded-[7px] border-4 border-solid border-black text-black text-[20px] w-[145px] h-[60px] mt-[2rem] absolute top-0 right-[2rem]">
        SKILLER
      </button>
      <h2 className="font-[550] text-[35px] pt-[6rem] flex justify-center mb-2 p-6">
        New Password
      </h2>

      <div className="flex flex-col items-center">
        <div className="mb-4 flex flex-col p-6 relative w-[32rem]">
          <label className=" text-[20px] mb-4">Enter password</label>
          <div className="relative">
            <input
              placeholder="************"
              type={passwordVisible ? "text" : "password"}
              onChange={handlePasswordChange}
              value={password}
              className="bg-inherit border border-gray-400 rounded-md px-3 py-[1.3rem] w-full pr-10"
            />
            <span
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-[50%] transform -translate-y-[50%] cursor-pointer"
            >
              {passwordVisible ? <FaEye /> : <FaEyeSlash />}
            </span>
          </div>
        </div>

        <div className="mb-8 flex flex-col p-6 relative w-[32rem]">
          <label className=" text-[20px] mb-5">Repeat Password</label>
          <div className="relative">
            <input
              placeholder="***********"
              onChange={handlePasswordConfirmationChange}
              value={passwordConfirmation}
              type={confirmPasswordVisible ? "text" : "password"}
              className="bg-inherit border border-gray-400 rounded-md px-3 py-[1.3rem] w-full pr-10"
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
          className="bg-[#000] rounded-[7px] text-[25px] text-white px-4 py-1 w-[470px]"
        >
          {isPending ? "Submitting ..." : "Finish"}
        </button>
      </div>

      <div className="font-bold text-gray-500 text-lg mt-[50px] mx-auto text-center sm:text-left  flex  justify-center">
        Back To 
        <Link href={"/auth"} className="text-blue-600">
          Login 
        </Link>
        ?
      </div>
    </div>
  );
}
