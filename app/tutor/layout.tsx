import Footer from "@/components/Student/footer";
import SideBar from "@/components/Tutor/dashboard/sidebar";
import TutorWrapper from "./dashboard/tutorWrap";
import { Inter } from "next/font/google";


export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
         <body >
           <TutorWrapper>
             {children}
           </TutorWrapper>
         </body>
       </html>
  );
}
