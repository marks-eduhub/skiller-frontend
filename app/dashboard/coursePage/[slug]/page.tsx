"use client";
import React, { useEffect, useState } from "react";
import constants from "../../../../components/Student/HomePage/dummyData.json";
import ProductContainer from "@/components/Student/courseCards/cardContainer";
import Navbar from "@/components/Student/dashboadLayout/NavBar";

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
  useEffect(() => {
    localStorage.setItem("hideNavLayout", "true");
  });
  useEffect(() => {
    const filtered = constants.courses.filter(
      (course) => course.category === slug
    );
    setfilteredcourses(filtered);
    console.log("filteredcourses:", filteredcourses);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);
  const categoryTitle =
    categories.find((cat: { category: string }) => cat.category === slug)
      ?.title || slug;

  return (
    <div>
      <Navbar showGreeting={false} />
      <h1 className="mb-4 font-bold text-[20px] ml-2 mt-10 ">
        {categoryTitle}
      </h1>
      <ProductContainer courses={filteredcourses} />
    </div>
  );
};

export default CoursecategoryPage;
