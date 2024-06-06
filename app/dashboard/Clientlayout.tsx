"use client";

import { ReactNode, useEffect, useState } from "react";
import Navbar from "@/components/Student/dashboadLayout/NavBar";
import Footer from "@/components/Student/footer";

export default function ClientLayout({ children }: { children: ReactNode }) {
  const [hideNavLayout, setHideNavLayout] = useState<boolean>(false);

  useEffect(() => {
    const item = localStorage.getItem("hideNavLayout");
    if (item === "true") {
      setHideNavLayout(true);
    } else {
      setHideNavLayout(false);
    }
  }, [hideNavLayout]);

  return (
    <div>
      {!hideNavLayout && <Navbar showGreeting />}
      {children}
      <Footer />
    </div>
  );
}
