import TutorNav from "@/components/Tutor/dashboard/tutor-nav";
import Navbar from "../../components/Student/dashboadLayout/NavBar";
import SideBar from "@/components/Tutor/dashboard/sidebar";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col md:flex-row md:overflow-hidden">
      <div className="w-full md:w-64">
        <SideBar />
      </div>
      <div className="flex-1 flex flex-col pr-12">
        <TutorNav />
        {children}
      </div>
    </div>
  );
}
