"use client";
import { useState, ReactNode } from "react";
import SideNav from "@/components/Student/dashboadLayout/sidebar";
import Navbar from "../../components/Student/dashboadLayout/NavBar";
import Footer from "@/components/Student/footer";

const ClientWrapper: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [sidebarMinimized, setSidebarMinimized] = useState(false);

  const toggleSidebar = () => {
    setSidebarMinimized(!sidebarMinimized);
  };

  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className={`w-full ${sidebarMinimized ? "md:w-16" : "md:w-64"}`}>
        <SideNav
          sidebarMinimized={sidebarMinimized}
          toggleSidebar={toggleSidebar}
        />
      </div>
      <div
        className={`flex-grow py-6 md:overflow-y-auto hide-scrollbar pr-10 container mx-auto ${
          sidebarMinimized ? "ml-[90px]" : "ml-0"
        }`}
      >
        <Navbar sidebarMinimized={sidebarMinimized} />
        {children}
        <Footer />
      </div>
    </div>
  );
};

export default ClientWrapper;
