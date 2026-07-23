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
      <div className="relative flex h-screen flex-col bg-[#f8fafc] md:flex-row md:overflow-hidden">
        <div className={`w-full ${sidebarMinimized ? "md:w-[116px]" : "md:w-[224px]"}`}>
          <SideBar />
        </div>
        <div
          className={`flex-grow overflow-y-auto py-4 hide-scrollbar ${
            sidebarMinimized ? "md:pl-6" : "md:pl-4"
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
