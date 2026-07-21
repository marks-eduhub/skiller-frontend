"use client";
import { useState, ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import SideNav from "@/components/Student/dashboadLayout/sidebar";
import Navbar from "../../components/Student/dashboadLayout/NavBar";
import Footer from "@/components/Student/footer";
import Loader from "@/components/Student/loader";

const ClientWrapper: React.FC<{ children: ReactNode }> = ({ children }) => {
  const router = useRouter();
  const [sidebarMinimized, setSidebarMinimized] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();

  const toggleSidebar = () => {
    setSidebarMinimized(!sidebarMinimized);
  };

  const excludeNavbar = [
    "/dashboard/quizreview",
    "/dashboard/community",
    "/dashboard/profile",
  ];
  const showNavbar = !excludeNavbar.includes(pathname);

  const handleNavigation = (path: string) => {
    if (path === pathname) return;
    setIsLoading(true);
    setTimeout(() => {
      router.push(path);
    }, 500);
  };

  return (
    <div className="relative flex h-screen flex-col md:flex-row md:overflow-hidden">
      {isLoading && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/70 backdrop-blur-sm">
          <Loader />
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
        className={`flex-grow py-4 md:overflow-y-auto hide-scrollbar ${
          sidebarMinimized ? "md:pl-8" : "md:pl-4"
        }`}
      >
        <div className="mx-auto flex min-h-full w-full max-w-[1440px] flex-col px-4 sm:px-6 lg:px-8">
        {showNavbar && <Navbar sidebarMinimized={sidebarMinimized} />}
        <div className="flex flex-col min-h-[calc(100vh-5rem)]">
          <div className="flex-grow">{children}</div>
          <Footer />
        </div>
        </div>
      </div>
    </div>
  );
};

export default ClientWrapper;
