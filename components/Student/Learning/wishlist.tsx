import React from 'react';
import WishlistCard from './wishlistCard';
interface Wishlist{
  id: number;
  instructor: string;
  image: string;
  rating: number;
  duration: string;
  description: string;
  topic: string;
  level: string;
 }
 interface WishlistProps {
  courses: Wishlist[];
}

const Wishlist: React.FC<WishlistProps> = ({ courses }) => {
  return (
    <div className="py-6 grid grid-cols-1 md:grid-cols-3 gap-6">
      {courses.map((course) => (
        <WishlistCard
          key={course.id}
          course={course}
        />
      ))}
    </div>
  );
};


export default Wishlist;
