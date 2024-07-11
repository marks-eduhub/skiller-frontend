import ClientWrapper from "./ClientWrapper";

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
