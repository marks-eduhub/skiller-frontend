// ProductList.tsx
import React from 'react';
import ProductCard from './ProductCard';

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
  products: Product[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  return (
    <div className="flex overflow-x-auto py-4">
      {products.map((product) => (
        <div key={product.id} className="flex-none w-64 mx-4">
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
};

export default ProductList;
