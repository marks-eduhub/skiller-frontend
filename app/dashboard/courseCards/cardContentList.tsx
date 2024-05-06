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
  products: Product[];
  containerWidth: string; 
}

const ProductList: React.FC<ProductListProps> = ({ products ,containerWidth }) => {
  return (
    <div className=" overflow-y-auto  py-4">
      {/* flex overflow-y-auto py-4 */}
      {products.map((product) => (
        <div key={product.id} className="flex-none w-64 mx-4 mr-2">
          <ProductCard product={product} containerWidth={containerWidth} />
        </div>
      ))}
    </div>
  );
};

export default ProductList;
