"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import data from "./data.json";
import { API } from "../../../lib/constants";
import { setToken } from "../../../lib/helpers";

export default function SignUp() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    phone: "",
    // gender: "male",
    dob: { day: "", month: "", year: "" },
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (name === "day" || name === "month" || name === "year") {
      setFormData((prevData) => ({
        ...prevData,
        dob: {
          ...prevData.dob,
          [name]: value,
        },
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch(`${API}/api/auth/local/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          username: formData.username,
          phone: formData.phone,
          // gender: formData.gender,
          dob: `${formData.dob.year}-${formData.dob.month}-${formData.dob.day}`,
          password: formData.password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Registration failed");
      }

      const data = await response.json();
      setToken(data.jwt);
      router.push("/dashboard");
      // Assuming setToken saves the JWT in localStorage or similar
    } catch (error: any) {
      setError(error.message || "Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-[#E9E9E9] h-screen  w-[100%] flex flex-col p-[1.5rem] text-black items-center  overflow-y-auto overflow-x-hidden relative ">
      <div className="fixed -bottom-[10rem] -right-[5.5rem]  sm:-top-[8rem] sm:-right-[6.5rem] h-[14rem] w-[14rem]  bg-black opacity-[14%] transform rounded-full " />
      <div className="sm:hidden flex flex-row justify-between items-center w-full px-[0.5rem]">
        <Link
          href={"/auth"}
          className="bg-[#000] w-[8rem] font-[600] py-[0.9rem] items-center  rounded-[12px] text-[17px] flex justify-center text-white"
        >
          Login
        </Link>

        <div className=" relative w-[8rem] h-[4rem]">
          <Image alt={"logo"} src={data.registerForm.logo} fill />
        </div>
      </div>

      <h2 className="font-[600] sm:text-[50px] mt-[1rem] text-[38px]">
        {data.registerForm.title}
      </h2>
      <div className="flex flex-col w-[100%] gap-[1.5rem] sm:gap-[2.2rem] mt-[2rem]">
        <div className="flex flex-col sm:flex-row justify-between max-sm:gap-[1.5rem] w-full">
          <div className="flex flex-col items-start">
            <div className="font-[400] text-[14px]  sm:text-[22px]">Email</div>
            <input
              type="email"
              name="email"
              placeholder="black@gmail.com"
              value={formData.email}
              onChange={handleChange}
              className="fieldBoxShadow  bg-[#F9F9F9] rounded-[14px] px-3 py-[0.7rem] sm:py-[1.3rem] w-full sm:w-[20rem]"
            />
          </div>
          <div className="flex flex-col items-start">
            <div className="font-[400] text-[14px] sm:text-[22px]">Phone</div>
            <div className=" w-full sm:w-[20rem] gap-2 flex flex-row ">
              <input
                placeholder="256"
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="fieldBoxShadow  bg-[#F9F9F9] rounded-[14px]  px-3 py-[0.7rem] sm:py-[1.3rem] w-[4rem]"
              />
              <input
                placeholder="700600504"
                type="text"
                className="fieldBoxShadow  bg-[#F9F9F9] rounded-[14px]  px-3 py-[0.7rem] sm:py-[1.3rem] w-full sm:w-[14rem]"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between max-sm:gap-[1.5rem] w-full">
          <div className="flex flex-col items-start">
            {/* <div className="font-[400] text-[14px] sm:text-[22px]">Gender</div>
            <select
              id="gender"
              name="gender"
              className="fieldBoxShadow  bg-[#F9F9F9] rounded-[14px]  px-3 py-[0.7rem] sm:py-[1.3rem] w-full sm:w-[20rem]"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div> */}
            <div className="flex flex-col items-start">
              <div className="font-[400] text-[14px]  sm:text-[22px]">
                Username
              </div>
              <input
                placeholder="username"
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="fieldBoxShadow  bg-[#F9F9F9] rounded-[14px] px-3 py-[0.7rem] sm:py-[1.3rem] w-full sm:w-[20rem]"
              />
            </div>
          </div>
          <div className="flex flex-col items-start">
            <div className="font-[400] text-[14px] sm:text-[22px]">
              Date of birth
            </div>
            <div className=" w-full sm:w-[20rem] gap-4 flex flex-row max-sm:justify-between">
              <input
                placeholder="DD"
                type="number"
                min="1"
                name="day"
                value={formData.dob.day}
                onChange={handleChange}
                className="fieldBoxShadow  bg-[#F9F9F9] rounded-[14px]  px-3 py-[0.7rem] sm:py-[1.3rem] w-[4.5rem]"
              />
              <input
                placeholder="MM"
                type="number"
                min="1"
                name="month"
                value={formData.dob.month}
                onChange={handleChange}
                className="fieldBoxShadow  bg-[#F9F9F9] rounded-[14px]  px-3 py-[0.7rem] sm:py-[1.3rem] w-[4.5rem]"
              />
              <input
                placeholder="YYYY"
                type="number"
                name="year"
                min="1"
                value={formData.dob.year}
                onChange={handleChange}
                className="fieldBoxShadow  bg-[#F9F9F9] rounded-[14px]  px-3 py-[0.7rem] sm:py-[1.3rem] w-[8rem]"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between max-sm:gap-[1.5rem]  w-full">
          <div className="flex flex-col items-start">
            <div className="font-[400] text-[14px] sm:text-[22px]">
              Password
            </div>
            <input
              placeholder="************"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="fieldBoxShadow  bg-[#F9F9F9] rounded-[14px] px-3 py-[0.7rem] sm:py-[1.3rem] w-full sm:w-[20rem]"
            />
          </div>
          <div className="flex flex-col items-start">
            <div className="font-[400] text-[14px] sm:text-[22px]">
              Confirm Password
            </div>
            <input
              placeholder="***********"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="fieldBoxShadow  bg-[#F9F9F9] rounded-[14px] px-3 py-[0.7rem] sm:py-[1.3rem] w-full sm:w-[20rem]"
            />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="termsCheckbox"
            name="terms"
            value="accepted"
            className="w-[20px] h-[20px] mr-1 "
          />
          <label className="text-[#002BC5]">Terms and Conditions</label>
        </div>

        <div className="flex justify-center">
          <Link
            href={data.registerForm.action.link}
            // className="bg-[#000]  rounded-[7px] py-[1rem] sm:py-[0.5rem] text-[22px] sm:text-[29px] flex justify-center text-white w-[213px] sm:h-[66px]"
          >
            {/* {data.registerForm.action.text} */}

            <button
              onClick={handleSubmit}
              type="submit"
              className="bg-black text-white rounded-lg py-3 text-xl flex justify-center w-52"
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Register"}
            </button>
          </Link>
        </div>
        {error && <p className="text-red-500">{error}</p>}

        <div className="flex flex-row items-center gap-6 bottom-[5rem] font-[700]">
          <hr className="border-[1px] border-black w-[48%] " />
          OR
          <hr className="border-[1px] border-black w-[48%] " />
        </div>

        <div className="relative w-[100%] flex justify-center bottom-[1rem] mt-2 cursor-pointer">
          <Image
            src={data.registerForm.action.googlelogo}
            alt={"google"}
            width={80}
            height={80}
          />
        </div>
      </div>
    </div>
  );
}
