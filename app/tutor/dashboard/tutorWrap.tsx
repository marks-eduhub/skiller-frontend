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
      <div className="relative flex h-screen flex-col md:flex-row md:overflow-hidden">
        <div className={`w-full ${sidebarMinimized ? "md:w-16" : "md:w-64"}`}>
          <SideBar />
        </div>
        <div
          className={`flex-grow py-6 md:overflow-y-auto hide-scrollbar sm:pr-10 container mx-auto ${
            sidebarMinimized ? "ml-[90px]" : "ml-0"
          }`}
        >
          <TutorNav />
          <div className="flex flex-col min-h-[calc(100vh-5rem)]">
            <div className="flex-grow">{children}</div>
            <Footer />
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default TutorWrapper;
