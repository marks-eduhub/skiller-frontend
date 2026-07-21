"use client";

import AuthDrawer from "@/components/Student/drawerLayout/authDrawer";
export default function DrawerLayout({
  children,
  pageTo,
  link,
}: {
  children: React.ReactNode;
  pageTo: string;
  link: string;
}) {
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-1/2">
        <AuthDrawer pageTo={pageTo} link={link} />
      </div>
      <div className="w-full md:w-1/2">{children}</div>
    </div>
  );
}
