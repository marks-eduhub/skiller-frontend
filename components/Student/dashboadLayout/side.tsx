import React, { useState } from "react";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import NavLinks from "@/components/Student/dashboadLayout/nav-links";

const SmallScreenSideNav = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div
      className={`flex h-full flex-col text-white  ${
        sidebarOpen ? "w-64" : "w-0"
      }`}
    >
      <div
        className={`flex items-center justify-start space-x-6 ${
          sidebarOpen ? "bg-black" : ""
        } p-4 md:justify-left`}
      >
        <div
          className="flex items-center space-x-6 cursor-pointer sidebar-header"
          onClick={toggleSidebar}
        >
          <HamburgerMenuIcon className="w-6 h-6 text-white" />
        </div>
      </div>
      {sidebarOpen && (
        <div className="h-auto w-full grow md:block bg-black">
          <NavLinks minimized={false} />
          <form
            onSubmit={async (e) => {
              e.preventDefault();
            }}
          >
            {sidebarOpen && (
              <button className="flex h-[48px] w-full grow items-center justify-center bg-black p-3 text-sm font-medium hover:bg-gray-600  hover:rounded-md  md:flex-none md:justify-start md:p-2 md:px-3">
                <div className="md:block p-4">Sign Out</div>
              </button>
            )}
          </form>
        </div>
      )}
    </div>
  );
};

export default SmallScreenSideNav;
