"use client";
import { useState, ReactNode } from "react";
import SideBar from "@/components/Tutor/dashboard/sidebar";
import TutorNav from "@/components/Tutor/dashboard/tutor-nav";
import Footer from "@/components/Student/footer";
import { SidebarProvider } from "@/components/AuthProvider/sidebarContext";

const TutorWrapper: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [sidebarMinimized, setSidebarMinimized] = useState(false);

  return (
    <SidebarProvider>
      <div className="relative flex h-screen flex-col overflow-hidden bg-[radial-gradient(circle_at_top,_rgba(247,196,95,0.18),_transparent_30%),linear-gradient(180deg,_#fffaf0_0%,_#f5f7fb_45%,_#eef2f7_100%)] md:flex-row md:overflow-hidden">
        <div className={`w-full ${sidebarMinimized ? "md:w-16" : "md:w-64"}`}>
          <SideBar />
        </div>
        <div
          className={`flex-grow py-4 md:overflow-y-auto hide-scrollbar ${
            sidebarMinimized ? "md:pl-8" : "md:pl-4"
          }`}
        >
          <div className="mx-auto flex min-h-full w-full max-w-[1440px] flex-col px-4 sm:px-6 lg:px-8">
            <TutorNav />
            <div className="flex min-h-[calc(100vh-5rem)] flex-col">
              <div className="flex-grow">{children}</div>
              <Footer />
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default TutorWrapper;
