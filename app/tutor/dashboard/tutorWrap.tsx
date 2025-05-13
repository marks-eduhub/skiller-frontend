"use client";
import { useState, ReactNode } from "react";
import SideBar from "@/components/Tutor/dashboard/sidebar";
import TutorNav from "@/components/Tutor/dashboard/tutor-nav";
import Footer from "@/components/Student/footer";


const TutorWrapper: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [sidebarMinimized, setSidebarMinimized] = useState(false);

  const toggleSidebar = () => {
    setSidebarMinimized(!sidebarMinimized);
  };

  return (
    <div className="relative flex h-screen flex-col md:flex-row md:overflow-hidden">
   
      <div className={`w-full ${sidebarMinimized ? "md:w-16" : "md:w-64"}`}>
        <SideBar
          sidebarMinimized={sidebarMinimized}
          toggleSidebar={toggleSidebar}
        />
      </div>
      <div
        className={`flex-grow py-6 md:overflow-y-auto hide-scrollbar sm:pr-10 container mx-auto ${
          sidebarMinimized ? "ml-[90px]" : "ml-0"
        }`}
      >
         <TutorNav sidebarMinimized={sidebarMinimized} />
        <div className="flex flex-col min-h-[calc(100vh-5rem)]">
          <div className="flex-grow">{children}</div>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default TutorWrapper;
