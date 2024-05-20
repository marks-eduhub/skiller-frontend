// ProductList.tsx
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
    <div className="flex overflow-x-auto py-4">
      {courses.map((course) => (
        <div key={course.id} className="flex-none w-64 mx-4 mr-2">
          <ProductCard course={course} containerWidth={containerWidth} />
        </div>
      ))}
    </div>
  );
};

export default ProductList;
