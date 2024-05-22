"use client"
import React, { useEffect } from "react"
import Navbar from "../dashboadLayout/NavBar";

const CoursePage: React.FC = () => { 
    useEffect(() => {
        localStorage.setItem("hideNavLayout", "true");
        return () => {
          localStorage.removeItem("hideNavLayout");  // Clean up when component unmounts
        };
      }, []);
    return(

<div className="">
    <Navbar showGreeting={false} />
    <div className="mt-10">
    <h1 className="font-bold text-[30px]">All Courses</h1>
</div>
</div>
)}
export default CoursePage