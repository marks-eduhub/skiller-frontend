"use client";
import "./globals.css";
import { message } from "antd";
import { QueryClientProvider } from "@tanstack/react-query";
import AuthProvider from "@/components/AuthProvider/AuthProvider";
import { CourseProvider } from "@/Context/CourseContext";
import queryClient from "@/lib/queryClient";

message.config({
  maxCount: 1,
  duration: 4,
});

export default function ClientWrap({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <CourseProvider>{children}</CourseProvider>
        </AuthProvider>
      </QueryClientProvider>
    </>
  );
}
