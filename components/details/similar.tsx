"use client"
import React from 'react';
import ProductContainer from '../../app/dashboard/courseCards/cardContainer';
type Course = {
  id: number;
  instructor: string;
  image: string;
  rating: number;
  duration: string;
  description: string;
  topic: string;
  level: string;
};
const SimilarCourses: React.FC<{ courses: Course[] }> = ({ courses }) => {
  return (
    <div className='shadow-md bg-white'>
      <h2 className="text-lg font-semibold ml-10 pt-10"><b>Similar Courses</b></h2>
      <ProductContainer products={courses} />

      </div>
  );
};

export default SimilarCourses;
