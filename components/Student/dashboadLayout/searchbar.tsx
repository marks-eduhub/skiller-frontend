import React, { useState, useEffect, useRef } from "react";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { useFetchSearchCourses, useFetchSearchTutors } from "@/hooks/useCourses";
import Image from "next/image";
import Link from "next/link";
import { SearchResult, Tutor } from "@/lib/types";
import { message } from "antd";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SearchBar: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const { data: coursesData, isLoading, error } = useFetchSearchCourses(searchTerm);
  const { data: tutorsData, isLoading: isLoadingTutors, error: errorTutors } = useFetchSearchTutors(searchTerm);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchResults = async () => {
      if (searchTerm.trim() === "") {
        setSearchResults([]);
        return;
      }

      const filteredCourses = coursesData?.data?.filter((course: { attributes: { coursename: string; }; }) =>
        course.attributes.coursename.toLowerCase().includes(searchTerm.toLowerCase())
      ).map((course: any) => ({
        ...course,
        type: 'course',
      })) || [];

      const filteredTutors = tutorsData?.data?.filter((tutor: Tutor) =>
        tutor.attributes.tutorname.toLowerCase().includes(searchTerm.toLowerCase())
      ).map((tutor: Tutor) => ({
        ...tutor,
        slug: tutor.attributes.tutorname.toLowerCase().replace(/\s+/g, ""),
        type: 'tutor',
      })) || [];

      setSearchResults([...filteredCourses, ...filteredTutors]);
    };

    fetchResults();
  }, [searchTerm, coursesData, tutorsData]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setShowDropdown(true);
  };

  const handleSearchSubmit = () => {
    if (searchTerm.trim()) {
      setShowDropdown(false);
    }
  };
  useEffect(() => {
    function handleClickOutside(event:any) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (showDropdown && searchResults.length === 0) {
      const timer = setTimeout(() => {
        setShowDropdown(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [showDropdown, searchResults]);


  const loadingContent = (
    <div className="absolute bg-white shadow-md mt-2 rounded-md w-3/4 z-10">
      <Skeleton height={24} count={1} />
    </div>
  );

  if (error || errorTutors) {
    message.error("Error fetching courses. Please try again later.");
  }

  return (
    <div className="relative">
      <div className="sm:col-span-10 w-1/2 flex items-center rounded-lg shadow bg-white p-3 cursor-pointer my-5">
        <MagnifyingGlassIcon className="w-6 h-6 text-black mr-2" />
        <input
          type="text"
          placeholder="Search for classes or tutors"
          className="flex-1 outline-none bg-transparent"
          value={searchTerm}
          onChange={handleInputChange}
        />
        <Image
          src="/filter-variant.svg"
          alt="filter"
          width={20}
          height={20}
        />
      </div>

      {isLoading || isLoadingTutors ? loadingContent : null}

      {showDropdown && (
        <div className="absolute bg-white border-t pt-2 border-gray-200 shadow-2xl rounded-lg w-3/4 z-10">
          {isLoading ? (
            <div className="p-2 ">Loading...</div>
          ) : searchResults.length > 0 ? (
            searchResults.map((result) => (
              <div key={result.id} className="p-3 cursor-pointer border-b border-gray-200">
                <Link
                  href={result.type === "tutor" 
                    ? `/dashboard/subscriptions/${result.id}`
                    : `/dashboard/overview/${result.id}`}
                  onClick={() => setShowDropdown(false)}
                >
                  <p className="text-md">{result.type === 'tutor' ? result.attributes.tutorname : result.attributes.coursename}</p>
                </Link>
              </div>
            ))
          ) : (
            <div className="p-2 ">No results found.</div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
