// pages/auth/google-callback.js
"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { message } from "antd";
import { registerUserWithGoogle } from "../../../hooks/Authhooks/useRegister";

const GoogleCallbackPage = () => {
  const router = useRouter();

  useEffect(() => {
    const handleGoogleCallback = async () => {
      try {
        const user = await registerUserWithGoogle();
        message.success(`Welcome ${user.displayName}`);
        router.push("/dashboard");
      } catch (error) {
        message.error((error as Error).message || "Failed to sign in with Google");
        router.push("/auth");
      }
    };

    handleGoogleCallback();
  }, [router]);

  return <p>Loading...</p>;
};

export default GoogleCallbackPage;