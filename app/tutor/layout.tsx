import Footer from "@/components/Student/footer";
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
    
      <div className="flex-1 flex flex-col sm:pr-12 pr-3 pb-4 min-h-[calc(100vh-5rem)]">
          <div className="flex-grow">{children}</div>
          <Footer />
        </div>

    </div>
  );
}
