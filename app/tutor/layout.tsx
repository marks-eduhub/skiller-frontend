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
      <div className="flex-1 flex flex-col sm:pr-12 pr-3 pb-4">
        {/* <TutorNav /> */}
        {children}
      </div>
    </div>
  );
}
