"use client"; 
 
import { ReactNode, useEffect, useState } from "react";
import Navbar from "@/components/dashboadLayout/NavBar";
import Footer from "@/components/footer";
 
export default function ClientLayout({ children }: { children: ReactNode }) {
  const [localStorageValue, setLocalStorageValue] = useState<string | null>("");
 
  useEffect(() => {
    const item = localStorage.getItem("hideNavLayout");
    setLocalStorageValue(item);
  }, []);
 
  return (
    <div>
      {localStorageValue !== "true" && <Navbar showGreeting />}
      {children}
      <Footer />
    </div>
  );
}