"use client";
import React from "react";
import data from "./data.json";
import Image from "next/image";
import { Button } from "../../ui/button";
import { TbArrowBadgeRight } from "react-icons/tb";
import { useState } from "react";
import { useRouter } from "next/navigation";
// import { login } from "../../../lib/userSS";
import { useAuthContext } from "@/Context/AuthContext";

const Splash: React.FC = () => {
  const router = useRouter();
  const [button, setButton] = useState(false);
  const { user } = useAuthContext();

  const handleDash = async () => {
    if (user) {
      router.push("/dashboard");
    } else {
      router.push("/auth");
    }
  };

  return (
    <div
      className="flex justify-center items-center h-screen bg-cover bg-no-repeat"
      style={{ backgroundImage: "url('/backgroundImage.svg')" }}
    >
      <div className="absolute top-1/4 transform -translate-y-1/2 text-center z-10">
        <p className="text-2xl font-bold text-black">
          Ready to Start?, Hello {user?.username}.
        </p>
      </div>
      <div className="absolute bottom-16">
        <button
          onClick={handleDash}
          className="px-4 py-2 bg-black text-white rounded-md"
        >
          {data.buttonText}
        </button>
      </div>
      <Image
        layout="intrinsic"
        width={375.99}
        height={618}
        src="/image.svg"
        alt="bulb"
        className=" z-0"
        style={{ maxWidth: "50%", maxHeight: "40%" }}
      />
    </div>
  );
};

export default Splash;
