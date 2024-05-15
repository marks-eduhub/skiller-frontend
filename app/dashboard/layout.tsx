import SideNav from '@/components/dashboadLayout/sidenav';
// import { getSession } from '../../lib/userSS';
import { redirect } from 'next/navigation';
import Navbar from '../../components/dashboadLayout/NavBar';
import Footer from '@/components/footer';


export default async function Layout({ children }: { children: React.ReactNode }) {
  //will always redirect to auth
  // const session = await getSession();
  //     if (!session) {
  //       redirect('/auth'); 
  //     }
  return (
    <div className="flex h-screen  flex-col md:flex-row md:overflow-hidden">

      <div className="w-full md:w-64">
        <SideNav/>
      </div>
      <div className="flex-grow p-6 md:overflow-y-auto md:p-12">
      <Navbar showGreeting />
        {children}
        <Footer/>
        </div>
    </div>
  );
}