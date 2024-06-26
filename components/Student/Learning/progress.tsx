import React from 'react';
import ProgressCard from './progressCard';
import {myprogress} from "./data.json"
import CoursecategoryPage from '@/app/dashboard/coursePage/[slug]/page';
interface Progress {
  id:number;
  image: string;
  topic: string;
  instructor: string;
  rating: number;
  progress: number;
 }
interface  ProgressProps{
myprogress: Progress[]
}
const Progress: React.FC<ProgressProps> = ({myprogress}) => {
  return (
    <div className="container mx-auto p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
      {myprogress.map((course) => (
        <ProgressCard
          key={course.id}
         myprogress={course}
        />
      ))}
    </div>
  );
};

export default Progress;
