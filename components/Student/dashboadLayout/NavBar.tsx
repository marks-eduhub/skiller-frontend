import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  MagnifyingGlassIcon,
  TriangleDownIcon,
} from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";
import SkillerLogo from "@/components/ui/logo";
import { useAuthContext } from "@/Context/AuthContext";
import Greeting from "@/lib/greeting";
import { useFetchSearchCourses, useFetchSearchTutors } from "@/hooks/useCourses";
import { Course, SearchResult, Tutor } from "@/lib/types";

interface NavBarProps {
  sidebarMinimized: boolean;
}

const Navbar: React.FC<NavBarProps> = ({ sidebarMinimized }) => {
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);
  const { user } = useAuthContext();
  const username = user?.username || "Guest";

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);


  const { data: coursesdata } = useFetchSearchCourses();
  const { data: tutorsdata } = useFetchSearchTutors();


  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const fetchResults = async () => {
      if (searchTerm.trim() === "") {
        setSearchResults([]);
        return;
      }
  
      const filteredCourses = coursesdata?.data?.filter(course =>
        course.attributes.coursename.toLowerCase().includes(searchTerm.toLowerCase())
      ).map(course => ({
        ...course,
        type: 'course', 
      })) || [];
  
      const filteredTutors = tutorsdata?.data?.filter((tutor: { attributes: { tutorname: string; }; }) =>
        tutor.attributes.tutorname.toLowerCase().includes(searchTerm.toLowerCase())
      ).map((tutor: any) => ({
        ...tutor,
        type: 'tutor', 
      })) || [];
  
      setSearchResults([...filteredCourses, ...filteredTutors]);
    };
  
    fetchResults();
  }, [searchTerm, coursesdata, tutorsdata]);
  

  const hiddenRoutes = ["/dashboard/profile"];
  const hideGreetingAndSearch = isMounted && hiddenRoutes.includes(pathname);

  return (
    <>
      <nav className="max-md:hidden">
        <div className={`flex items-center justify-between w-full`}>
          {!sidebarMinimized ? (
            <>
              {!hideGreetingAndSearch && <Greeting username={username} />}
              <div className="flex items-center gap-10 ml-auto">
                <p className="rounded-full px-6 py-2 shadow text-black bg-white">
                  Premium
                </p>
                <div className="p-2 flex gap-1 items-center justify-between rounded-full shadow bg-black text-white cursor-pointer">
                  <Image
                    src="/Ellipse 1.svg"
                    alt="variant"
                    width={20}
                    height={20}
                    className="ml-2"
                  />
                  <Link href="/dashboard/profile" className="text-white">
                    {username}
                  </Link>
                  <TriangleDownIcon className="w-6 h-6 text-white mr-2" />
                </div>
              </div>
            </>
          ) : (
            <div className="w-full flex items-center justify-between mt-3 mb-10">
              <div className="w-32 h-10 mr-10">
                <SkillerLogo />
              </div>
              <div className="sm:col-span-10 w-1/2 flex items-center rounded-lg shadow bg-white p-3 cursor-pointer">
                <MagnifyingGlassIcon className="w-6 h-6 text-black mr-2" />
                <input
                  type="text"
                  placeholder="Search for classes or tutors"
                  className="flex-1 outline-none bg-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-10">
                <p className="rounded-full px-6 py-2 shadow text-black bg-white">
                  Premium
                </p>
                <div className="p-2 flex items-center justify-between rounded-full shadow bg-black text-white cursor-pointer">
                  <Image
                    src="/Ellipse 1.svg"
                    alt="variant"
                    width={20}
                    height={20}
                    className="ml-2"
                  />
                  <Link href="/dashboard/profile" className="text-white">
                    {username}
                  </Link>
                  <TriangleDownIcon className="w-6 h-6 text-white mr-2" />
                </div>
              </div>
            </div>
          )}
        </div>

        {!sidebarMinimized && !hideGreetingAndSearch && (
          <div className="sm:col-span-8 w-1/2 my-6 flex items-center rounded-lg shadow bg-white p-2 cursor-pointer">
            <MagnifyingGlassIcon className="w-6 h-6 text-black mr-2" />
            <input
              type="text"
              placeholder="Search for classes or tutors"
              className="flex-1 outline-none bg-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Image
              src="/filter-variant.svg"
              alt="filter"
              width={20}
              height={20}
            />
          </div>
        )}
      </nav>

      {searchResults.length > 0 && (
  <div className="absolute bg-white cursor-pointer shadow-md mt-2 rounded-lg w-full z-10">
    {searchResults.map((result) => {
      console.log('Result:', result); 
      return (
        <div key={result.id} className="p-2 border-b cursor-pointer last:border-b-0">
          <Link 
            href={result.type === 'tutor' ? `/dashboard/tutorspage` : `/dashboard/overview/${result.id}`}
          >
            <p>{result.type === 'tutor' ? result.attributes.tutorname : result.attributes.coursename}</p>
          </Link>
        </div>
      );
    })}
  </div>
)}

    </>
  );
};

export default Navbar;
