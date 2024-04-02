// ProductContainer.tsx
import React from 'react';
import ProductList from './ProductList';

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

interface ProductContainerProps {
  products: Product[];
}

const ProductContainer: React.FC<ProductContainerProps> = ({ products }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden mx-4">
      <div className="w-full h-64 overflow-x-auto flex flex-row  items-center justify-center">
        <div className="overflow-x-scroll">
        <div className="flex flex-nowrap p-4">
        <ProductList products={products} />
        </div>
      </div>
    </div>
    </div>
  );
};

export default ProductContainer;






















// import React from 'react';
// import ProductList from './ProductList';

// interface Product {
//   id: number;
//   instructor: string;
//   image: string;
//   rating: number;
//   duration: string;
//   description: string;
//   topic: string;
//   level: string;
// }

// interface ProductContainerProps {
//   products: Product[];
// }

// const ProductContainer: React.FC<ProductContainerProps> = ({ products }) => {
//   return (
//     <div className="bg-white shadow-lg rounded-lg overflow-hidden mx-4">
//       <div className="w-full h-64 flex flex-row items-center justify-center">
//         {/* Removed unnecessary nesting and overflow-x-scroll */}
//         <div className="flex flex-nowrap p-4">
//           <ProductList products={products} />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductContainer;

