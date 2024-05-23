import React from 'react';
import ProductContainer from './cardContainer';

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

interface CoursePageProps {
  courses: Course[];
}

const CoursePage: React.FC<CoursePageProps> = ({ courses }) => {
  return (
    <div>
      <h1>Courses</h1>
      <ProductContainer courses={courses} />
    </div>
  );
};

export default CoursePage;
