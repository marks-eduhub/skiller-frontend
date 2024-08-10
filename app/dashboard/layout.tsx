import { getSession } from "@/lib/userSS";
import ClientWrapper from "./ClientWrapper";
import { redirect } from "next/navigation";

export default async function Layout({ children }: { children: React.ReactNode }) {
  // will always redirect to auth
  // const session = await getSession();
  // if (!session) {
  //   redirect('/auth');
  // }

  return (
    <ClientWrapper>
     {children}
    </ClientWrapper>
  );
}
