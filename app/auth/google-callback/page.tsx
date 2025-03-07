// pages/auth/google-callback.js
"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { message } from "antd";
import { registerUserWithGoogle } from "../../../hooks/Authhooks/useRegister";
import Skeleton from "react-loading-skeleton";

const GoogleCallbackPage = () => {
  const router = useRouter();

  useEffect(() => {
    const handleGoogleCallback = async () => {
      try {
        const user = await registerUserWithGoogle();
        message.success(`Welcome ${user.username}`);
        router.push("/dashboard");
      } catch (error) {
        message.error(
          (error as Error).message || "Failed to sign in with Google"
        );
        router.push("/auth");
      }
    };

    handleGoogleCallback();
  }, [router]);

  return (
    <>
      <div className="ml-5">
        <h2 className="text-lg font-300 my-4">
          <Skeleton
            width={200}
            height={24}
            baseColor="#e0e0e0"
            highlightColor="#f0f0f0"
          />
        </h2>
        <div>
          <Skeleton
            height={300}
            count={1}
            baseColor="#e0e0e0"
            highlightColor="#f5f5f5"
            enableAnimation={true}
          />
        </div>
      </div>
    </>
  );
};

export default GoogleCallbackPage;