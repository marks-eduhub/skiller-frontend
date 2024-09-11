"use client";
import React, { useEffect } from "react";
import ClientWrapper from "./ClientWrapper";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/Context/AuthContext";
import Loader from "@/components/Student/loader";

const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user, isLoading } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/auth");
    }
  }, [user, isLoading, router]);

  
  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
        <div className="text-center">
          <Loader />
          <p className="mt-4 text-lg text-gray-600">Redirecting...</p>
        </div>
      </div>
    );
  }

  return <ClientWrapper>{children}</ClientWrapper>;};

export default DashboardLayout;
