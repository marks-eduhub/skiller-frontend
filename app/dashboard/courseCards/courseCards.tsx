

// import React from 'react';
// // import ProductDescriptionBar from './DescriptionBar';

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

// interface ProductCardProps {
//   product: Product;
// }

// const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
//   return (
//     <div className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col h-full">
//       <div className="overflow-x-auto">
//       <img src={product.image} alt={product.image} className="w-full object-cover " />
//       </div>
//       <div className="p-6 relative flex-1 flex flex-col justify-between">
//         <div>
//           <h3 className="text-gray-800 font-semibold">{product.instructor}</h3>
//           <p className="mt-2 text-sm text-gray-500">{product.description}</p>
//         </div>
//         <p className="absolute bottom-0 left-0 mt-2 text-gray-600">{product.rating}</p>
//       </div>
//     </div>
//   );
// };

// export default ProductCard;


import React from 'react';

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

interface ProductCardProps {
  product: Product;
  containerWidth: string; 
}

const ProductCard: React.FC<ProductCardProps> = ({ product , containerWidth }) => {
  return (
    <div className="flex-none bg-white shadow-lg rounded-lg overflow-hidden flex-shrink-0 mr-4 mb-4" style={{ width: containerWidth, height: containerWidth }}>
      <div className="overflow-hidden  border border-white-800 rounded-lg border-8">
        <img src={product.image} alt={product.image} className="w-full object-cover" />
      </div>
      <div className="p-6 flex flex-col justify-between flex-1">
        <div>
          <h3 className="text-gray-800 font-semibold">{product.instructor}</h3>
          <p className="mt-2 text-sm text-gray-500">{product.description}</p>
        </div>
        <p className="mt-auto text-gray-600">{product.rating}</p>
      </div>
    </div>
  );
};

export default ProductCard;
