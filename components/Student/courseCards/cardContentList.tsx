import React from 'react';
import ProductCard from './courseCards';

interface Product {
  id: number;
  instructor: string;
  image: string;
  rating: number;
  duration: string;
  description: string;
  topic: string;
  level: string;
}

interface ProductListProps {
  courses: Product[];
  containerWidth: string; 
}

const ProductList: React.FC<ProductListProps> = ({ courses ,containerWidth }) => {
  return (
    <div className="flex overflow-x-auto py-3">
      {courses.map((course) => (
        <div key={course.id} className="mr-2 flex-none w-60 px-2">
          <ProductCard course={course}  />
        </div>
      ))}
    </div>
  );
};

export default ProductList;
