"use client";
import React, { useEffect, useState } from "react";
import constants from "../../../../components/Student/HomePage/dummyData.json";
import Navbar from "../../../../components/Student/dashboadLayout/NavBar";
import ProductCard from "../../../../components/Student/courseCards/courseCards";

interface Course {
  id: number;
  instructor: string;
  image: string;
  rating: number;
  duration: string;
  description: string;
  topic: string;
  level: string;
  category: string;
}

const CoursecategoryPage = ({ params }: { params: { slug: string } }) => {
  const categories = [
    { title: "Featured Courses", category: "featuredCourses" },
    { title: "Recently Accessed", category: "recentCourses" },
    { title: "The Week's Picks", category: "weeksPicks" },
    { title: "New Arrivals", category: "newArrivals" },
  ];

  const { slug } = params;
  const [filteredcourses, setfilteredcourses] = useState<Course[]>([]);
  const containerWidth = "415px";

  useEffect(() => {
    localStorage.setItem("hideNavLayout", "true");
  }, []);

  useEffect(() => {
    const filtered = constants.courses.filter(
      (course) => course.category === slug
    );
    setfilteredcourses(filtered);
    console.log("filteredcourses:", filteredcourses);
  }, [slug]);

  const categoryTitle =
    categories.find((cat: { category: string }) => cat.category === slug)
      ?.title || slug;

  return (
    <>
      <div className="pl-3 pr-2 container mx-auto">
        <Navbar showGreeting={false} />
        <h1 className="mb-4 font-bold text-[20px] ml-2 mt-10">
          {categoryTitle}
        </h1>

        <div className="bg-gray-200 shadow-lg rounded-lg relative overflow-hidden justify-center items-center max-md:hidden">
          <div className="grid grid-cols-3 pl-4 py-3 mt-2">
            {filteredcourses.map((course) => (
              <div key={course.id} className="pr-4">
                <ProductCard
                  key={course.id}
                  course={course}
                  containerWidth={containerWidth}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="shadow-lg rounded-lg relative sm:hidden">
        <div className="w-full h-full flex flex-col items-center justify-center bg-transparent">
          <div className="flex flex-col w-full mt-2 mb-2">
            {filteredcourses.map((course) => (
              <ProductCard
                key={course.id}
                course={course}
                containerWidth={containerWidth}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default CoursecategoryPage;
