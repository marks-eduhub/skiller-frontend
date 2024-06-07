import React from 'react'

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
         <div className="bg-[#D9D9D9] w-full h-[350px] rounded-lg">
          {courses.map((course, index) => (
            <div
              key={index}
              className="flex  px-4 pt-7 items-center justify-between "
            >
              <h1 className="font-bold pl-[200px]">{course.student}</h1>
              <h1 className="justify-end flex items-center pr-[200px] ">
                {course.number}
              </h1>
            </div>
          ))}
        </div>
  )
}

export default Overview