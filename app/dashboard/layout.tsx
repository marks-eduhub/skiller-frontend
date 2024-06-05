import SideNav from "@/components/Student/dashboadLayout/sidenav";
// import { getSession } from '../../lib/userSS';
import { redirect } from "next/navigation";
import Navbar from "../../components/Student/dashboadLayout/NavBar";
import Footer from "@/components/Student/footer";
import ClientLayout from "./Clientlayout";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  //will always redirect to auth
  // const session = await getSession();
  //     if (!session) {
  //       redirect('/auth');
  //     }

  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full md:w-64">
        <SideNav />
      </div>
      {/* <div className="flex-grow p-6 md:overflow-y-auto  md:p-12 ">
        <Navbar showGreeting />
        {children}
        <Footer />
      </div> */}
      
       <div className="flex-grow p-6 md:overflow-y-auto md:p-12">
        <ClientLayout>{children}</ClientLayout> 
      </div>
    </div>
  );
}
