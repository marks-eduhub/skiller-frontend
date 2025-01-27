"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import data from "./data.json";
import { useAuthContext } from "../../../Context/AuthContext";
import { message } from "antd";
import { useMutation } from "@tanstack/react-query";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import {register} from "../../../lib/register"
const SignupForm = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  const authContext = useAuthContext();
  const { setUser } = authContext || {};
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    lastName: "",
    firstName: "",
    password: "",
    confirmPassword: "",
    studentname:""
  });
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: register,
    onSuccess: (data) => {
      message.success(`Welcome ${data.user.username}`);
      if (setUser) {
        setUser(data.user);
      }
      router.push("/dashboard");
    },
    onError: (error) => {
      message.error((error as Error).message || "Something went wrong!");
    },
  });
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      message.error("Passwords do not match");
      return;
    }

    if (formData.password.length < 6) {
      message.error("Password must be at least 6 characters long");
      return;
    }
    if (!formData.firstName.trim() || !formData.lastName.trim()) {
      message.error("First Name and Last Name are required");
      return;
    }
    
    const formDataToSend = new FormData();
    formDataToSend.append("email", formData.email);
    formDataToSend.append("username", formData.username);
    formDataToSend.append("firstName", formData.firstName);
    formDataToSend.append("lastName", formData.lastName);
    formDataToSend.append("password", formData.password);
    
  
    try {
      await mutate(formDataToSend); 
    } catch (error) {
    }
  };
  
  return (
    <div className="bg-[#E9E9E9] h-screen w-[100%] flex flex-col p-[1.5rem] text-black items-center overflow-y-auto overflow-x-hidden relative ">
        <div className="fixed -bottom-[10rem] -right-[5.5rem] sm:-top-[8rem] sm:-right-[6.5rem] h-[14rem] w-[14rem] bg-black opacity-[14%] transform rounded-full " />
      <h2 className="font-[400] sm:text-[50px] text-[38px]">
        {data.registerForm.title}
      </h2>
      {isError && <p className="text-red-500">{isError}</p>}
      <div className="flex flex-col w-[100%] gap-[1.5rem] sm:gap-[1.5rem] mt-[2rem]">

        <div className="flex flex-col sm:flex-row justify-between max-sm:gap-[1.5rem] w-full">
          <div className="flex flex-col items-start w-full sm:w-[22rem]">
            <label className="sm:text-[22px]">First Name</label>
            <input
              type="text"
              name="firstName"
              required
              value={formData.firstName}
              onChange={handleChange}
              className="border border-gray-600 my-2 bg-inherit rounded-md px-4 py-[0.7rem] sm:py-4 w-full"
            />
          </div>
          <div className="flex flex-col items-start w-full sm:w-[22rem]">
            <label className="sm:text-[22px]">Last Name</label>
            <input
              type="text"
              name="lastName"
              required
              value={formData.lastName}
              onChange={handleChange}
              className="border border-gray-600 my-2 bg-inherit rounded-md px-4 py-[0.7rem] sm:py-4 w-full"
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between max-sm:gap-[1.5rem] w-full">
          <div className="flex flex-col items-start w-full sm:w-[22rem]">
            <label className="sm:text-[22px]">Email Address</label>
            <input
              type="text"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="border border-gray-600 my-3 bg-inherit rounded-md px-4 py-[0.7rem] sm:py-4 w-full"
            />
          </div>
          <div className="flex flex-col items-start w-full sm:w-[22rem]">
            <label className="sm:text-[22px]">Username</label>
            <input
              type="text"
              name="username"
              required
              value={formData.username}
              onChange={handleChange}
              className="border border-gray-600 my-2 bg-inherit rounded-md px-4 py-[0.7rem] sm:py-4 w-full"
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between max-sm:gap-[1.5rem] w-full">
          <div className="flex flex-col items-start w-full">
            <label className="  sm:text-[22px]">Password</label>
            <div className="relative  sm:w-[22rem] w-full">
              <input
                type={passwordVisible ? "text" : "password"}
                name="password"
                required
                value={formData.password}
                placeholder="Enter your password"
                onChange={handleChange}
                className="border border-gray-600 my-2 bg-inherit rounded-md px-4 py-[0.7rem] sm:py-4 w-full"
              />
              <span
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-[50%] transform -translate-y-[50%] cursor-pointer"
              >
                {passwordVisible ? <FaEye /> : <FaEyeSlash />}
              </span>
            </div>
          </div>
          <div className="flex flex-col items-start w-full sm:w-[22rem]">
            <label className="  sm:text-[22px]">Confirm password</label>
            <div className="relative sm:w-[22rem] w-full">
              <input
                type={passwordVisible ? "text" : "password"}
                name="confirmPassword"
                required
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="border border-gray-600 my-2 bg-inherit rounded-md px-4 py-[0.7rem] sm:py-4 w-full"
              />
              <span
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-[50%] transform -translate-y-[50%] cursor-pointer"
              >
                {passwordVisible ? <FaEye /> : <FaEyeSlash />}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="terms"
            name="terms"
            required
            className="w-[1.2rem] h-[1.2rem]"
          />
          <label>
            I agree to <span className="text-blue-600">terms of service </span>{" "}
            and <span className="text-blue-600">privacy policy</span>
          </label>
        </div>

        <div className="flex justify-center">
          <button
            onClick={handleSubmit}
            type="submit"
            className="bg-black text-white rounded-lg py-3 text-xl flex justify-center w-96 my-4"
            disabled={isPending}
          >
            {isPending ? "Loading..." : "Sign Up"}
          </button>
        </div>

        <div className="flex flex-row items-center gap-6 bottom-[5rem] font-[700]">
          <hr className="border-[1px] border-black w-[48%] " />
          OR
          <hr className="border-[1px] border-black w-[48%] " />
        </div>

        <div className="flex justify-center">
          <button className=" rounded-md py-3 text-xl flex justify-center w-52 border border-black my-4">
            <Image
              src={data.registerForm.action.googlelogo}
              alt={"google"}
              width={50}
              height={50}
            />
            <p className="text-[16px]">Sign in with Google</p>
          </button>
        </div>

        <div className="sm:hidden flex items-center ">
          <h1>Already have an account? <Link href="/auth" className="text-blue-600">Login</Link></h1>
        </div>
      </div>
    
    </div>
    
  );
};

export default SignupForm;
