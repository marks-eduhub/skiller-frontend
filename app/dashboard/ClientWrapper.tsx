"use client"
import { useState, ReactNode } from "react";
import SideNav from "@/components/Student/dashboadLayout/sidenav";
import Navbar from "../../components/Student/dashboadLayout/NavBar";

const ClientWrapper: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [sidebarMinimized, setSidebarMinimized] = useState(false);

  const toggleSidebar = () => {
    setSidebarMinimized(!sidebarMinimized);
  };

  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className={`w-full ${sidebarMinimized ? 'md:w-16' : 'md:w-64'}`}>
        <SideNav sidebarMinimized={sidebarMinimized} toggleSidebar={toggleSidebar} />
      </div>
      <div className={`flex-grow p-6 md:overflow-y-auto pr-10 container mx-auto ${sidebarMinimized ? 'ml-[90px]' : ""}`}>
        <Navbar sidebarMinimized={sidebarMinimized} />
        {children}
      </div>
    </div>
  );
};

export default ClientWrapper;