"use client"

import AuthDrawer from "@/components/drawerLayout/authDrawer";
export default function DrawerLayout({ children, pageTo, link }: { children: React.ReactNode, pageTo:string, link:string }) {
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-[50%]">
       <AuthDrawer pageTo={pageTo} link={link}/>
      </div>
      <div className="md:w-[100%]">{children}</div>
    </div>
  );
}