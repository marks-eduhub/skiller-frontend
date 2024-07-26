import React from "react";

const Overview = () => {
  const courses = [
    { student: "Enrolled Students:", number: "557" },
    { student: "Active Students:", number: "204" },
    { student: "Likes:", number: "100k" },
    { student: "Course Duration:", number: "47 minutes" },
    { student: "Number of Quizzes:", number: "20" },
    { student: "Number of Tests:", number: "15" },
  ];
  return (
    <div className="bg-gray-100 mb-10 w-full sm:h-[350px] sm:px-0 px-10 sm:py-4 py-10 items-center rounded-lg  ">
      {courses.map((course, index) => (
        <div
          key={index}
          className="flex  sm:flex-row py-4 px-6 items-center sm:justify-between"
        >
          <h1 className="font-bold text-center w-full sm:w-auto sm:pl-[200px]">
            {course.student}
          </h1>
          <h1 className="justify-end flex items-center w-full sm:w-auto sm:pr-[200px] ">
            {course.number}
          </h1>
        </div>
      ))}
    </div>
  );
};

export default Overview;
