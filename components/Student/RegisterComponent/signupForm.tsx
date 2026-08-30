"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import data from "./data.json";
import { useAuthContext } from "../../AuthProvider/AuthContext";
import { message } from "antd";
import { useMutation } from "@tanstack/react-query";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import {
  register,
  redirectToGoogleAuth,
} from "../../../hooks/Authhooks/useRegister";
const SignupForm = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

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
    studentname: "",
  });
  const { mutate, isPending } = useMutation({
    mutationFn: register,
    onSuccess: (data) => {
      message.success(`Welcome ${data.user.displayName}`);
      if (setUser) {
        setUser(data.user);
      }
      router.push("/preference");
    },
    onError: (error) => {
      message.error((error as Error).message || "Something went wrong!");
    },
  });
  const {
    mutate: mutateGoogle,
    isPending: isPendingGoogle,
  } = useMutation({
    mutationFn: redirectToGoogleAuth,
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
    } catch (error) {}
  };

  const handleGoogleSignUp = async () => {
    try {
      await mutateGoogle();
    } catch (error) {}
  };
  return (
    <div className="relative flex min-h-screen w-full flex-col items-center overflow-x-hidden bg-background px-4 py-8 text-foreground sm:px-6">
      <div className="fixed -bottom-40 -right-[5.5rem] h-56 w-56 rounded-full bg-primary opacity-[0.08] sm:-right-[6.5rem] sm:-top-32" />
      <h2 className="text-center font-display text-3xl font-bold sm:text-4xl">
        {data.registerForm.title}
      </h2>
      <div className="mt-8 flex w-full max-w-[960px] flex-col gap-6">
        <div className="flex w-full flex-col justify-between gap-6 sm:flex-row">
          <div className="flex w-full flex-col items-start sm:w-[22rem]">
            <label className="mb-2 text-sm font-medium sm:text-base">First Name</label>
            <input
              type="text"
              name="firstName"
              required
              value={formData.firstName}
              onChange={handleChange}
              className="w-full rounded-md border border-input bg-background px-4 py-3 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 sm:py-4"
            />
          </div>
          <div className="flex w-full flex-col items-start sm:w-[22rem]">
            <label className="mb-2 text-sm font-medium sm:text-base">Last Name</label>
            <input
              type="text"
              name="lastName"
              required
              value={formData.lastName}
              onChange={handleChange}
              className="w-full rounded-md border border-input bg-background px-4 py-3 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 sm:py-4"
            />
          </div>
        </div>

        <div className="flex w-full flex-col justify-between gap-6 sm:flex-row">
          <div className="flex w-full flex-col items-start sm:w-[22rem]">
            <label className="mb-2 text-sm font-medium sm:text-base">Email Address</label>
            <input
              type="text"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full rounded-md border border-input bg-background px-4 py-3 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 sm:py-4"
            />
          </div>
          <div className="flex w-full flex-col items-start sm:w-[22rem]">
            <label className="mb-2 text-sm font-medium sm:text-base">Username</label>
            <input
              type="text"
              name="username"
              required
              value={formData.username}
              onChange={handleChange}
              className="w-full rounded-md border border-input bg-background px-4 py-3 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 sm:py-4"
            />
          </div>
        </div>

        <div className="flex w-full flex-col justify-between gap-6 sm:flex-row">
          <div className="flex w-full flex-col items-start">
            <label className="mb-2 text-sm font-medium sm:text-base">Password</label>
            <div className="relative w-full sm:w-[22rem]">
              <input
                type={passwordVisible ? "text" : "password"}
                name="password"
                required
                value={formData.password}
                placeholder="Enter your password"
                onChange={handleChange}
                className="w-full rounded-md border border-input bg-background px-4 py-3 pr-10 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 sm:py-4"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                aria-label={passwordVisible ? "Hide password" : "Show password"}
                aria-pressed={passwordVisible}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-sm text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                {passwordVisible ? <FaEye /> : <FaEyeSlash />}
              </button>
            </div>
          </div>
          <div className="flex w-full flex-col items-start sm:w-[22rem]">
            <label className="mb-2 text-sm font-medium sm:text-base">Confirm password</label>
            <div className="relative w-full sm:w-[22rem]">
              <input
                type={confirmPasswordVisible ? "text" : "password"}
                name="confirmPassword"
                required
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full rounded-md border border-input bg-background px-4 py-3 pr-10 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 sm:py-4"
              />
              <button
                type="button"
                onClick={toggleConfirmPasswordVisibility}
                aria-label={confirmPasswordVisible ? "Hide password" : "Show password"}
                aria-pressed={confirmPasswordVisible}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-sm text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                {confirmPasswordVisible ? <FaEye /> : <FaEyeSlash />}
              </button>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="terms"
            name="terms"
            required
            className="h-[1.2rem] w-[1.2rem] rounded-sm border-input text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          />
          <label htmlFor="terms" className="text-sm leading-6 text-muted-foreground">
            I agree to{" "}
            <Link href="/terms" className="font-medium text-primary underline-offset-2 hover:underline">
              terms of service
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="font-medium text-primary underline-offset-2 hover:underline">
              privacy policy
            </Link>
          </label>
        </div>

        <div className="flex justify-center">
          <button
            onClick={handleSubmit}
            type="submit"
            className="my-2 flex min-h-[48px] w-full max-w-96 items-center justify-center rounded-md bg-primary px-4 text-base font-semibold text-primary-foreground transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            disabled={isPending}
          >
            {isPending ? "Creating account..." : "Sign Up"}
          </button>
        </div>

        <div className="flex flex-row items-center gap-6 text-sm font-semibold text-muted-foreground">
          <hr className="w-[48%] border-border" />
          OR
          <hr className="w-[48%] border-border" />
        </div>

        <div className="flex justify-center">
          <button
            onClick={handleGoogleSignUp}
            disabled={isPendingGoogle}
            className="my-2 flex min-h-[48px] w-full max-w-96 items-center justify-center gap-2 rounded-md border border-input bg-background px-4 text-base font-medium text-foreground transition hover:bg-accent disabled:cursor-not-allowed disabled:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <Image
              src={data.registerForm.action.googlelogo}
              alt=""
              width={40}
              height={40}
            />
            <span>{isPendingGoogle ? "Redirecting..." : "Sign In with Google"}</span>
          </button>
        </div>

        <div className="flex items-center text-sm sm:hidden">
          <p>
            Already have an account?{" "}
            <Link href="/auth" className="font-medium text-primary hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
