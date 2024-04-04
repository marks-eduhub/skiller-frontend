// ProductContainer.tsx
// import React from 'react';
// import ProductList from './cardContentList';

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
//   const containerWidth = '300px'; // Set the width of the container here

//   return (
//     <div className="bg-white shadow-lg rounded-lg overflow-hidden mx-4">
//       <div className="w-full  overflow-x-auto flex flex-row  items-center justify-center">
//         <div className="overflow-x-scroll">
//         <div className="flex flex-nowrap p-4">
//         <ProductList products={products}  containerWidth={containerWidth} />
//         </div>
//       </div>
//     </div>
//     </div>
//   );
// };

// export default ProductContainer;

import React from 'react';
import ProductList from './cardContentList';
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

interface ProductContainerProps {
  products: Product[];
}

const ProductContainer: React.FC<ProductContainerProps> = ({ products }) => {
  const containerWidth = '300px'; // Set the width of the container here

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden mx-4">
      <div className="w-full h-full overflow-x-auto flex flex-row  items-center justify-center">
        <div className="overflow-x-scroll">
          <div className="flex flex-nowrap p-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} containerWidth={containerWidth} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductContainer;






















