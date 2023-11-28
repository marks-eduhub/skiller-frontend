import RegisterDrawer from "@/components/RegisterForm/registerDrawer";
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-[50%]">
       <RegisterDrawer/>
      </div>
      <div className="md:w-[100%]">{children}</div>
    </div>
  );
}