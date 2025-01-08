"use client";
import { useState, ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import SideNav from "@/components/Student/dashboadLayout/sidebar";
import Navbar from "../../components/Student/dashboadLayout/NavBar";
import Footer from "@/components/Student/footer";
import Loader from "@/components/Student/loader";

const ClientWrapper: React.FC<{ children: ReactNode }> = ({ children }) => {
  const router = useRouter()
  const [sidebarMinimized, setSidebarMinimized] = useState(false);
  const [isLoading, setIsLoading] = useState(false); 
  const pathname = usePathname();

  const toggleSidebar = () => {
    setSidebarMinimized(!sidebarMinimized);
  };

  const excludeNavbar = ["/dashboard/quizreview", "/dashboard/community"];
  const showNavbar = !excludeNavbar.includes(pathname);
  
  const handleNavigation = (path: string) => {
    setIsLoading(true);
    setTimeout(() => {
      router.push(path);
      setIsLoading(false); 
    }, 2000); 
  };
  

  return (
    <div className="relative flex h-screen flex-col md:flex-row md:overflow-hidden">
      {isLoading && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-opacity-80">
          <div><Loader/></div>
        </div>
      )}

      <div className={`w-full ${sidebarMinimized ? "md:w-16" : "md:w-64"}`}>
        <SideNav
          sidebarMinimized={sidebarMinimized}
          toggleSidebar={toggleSidebar}
          onNavigate={handleNavigation}
        />
      </div>
      <div
        className={`flex-grow py-6 md:overflow-y-auto hide-scrollbar sm:pr-10 container mx-auto ${
          sidebarMinimized ? "ml-[90px]" : "ml-0"
        }`}
      >
        {showNavbar && <Navbar sidebarMinimized={sidebarMinimized} />}
        {children}
        <Footer />
      </div>
    </div>
  );
};

export default ClientWrapper;
