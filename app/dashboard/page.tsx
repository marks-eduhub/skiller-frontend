
// export default function Page() {
//   return <p>Dashboard Page</p>;
// }
'use client';
import React from 'react';
import Navbar from './NavBar';
import ProductList from './Card/ProductList';
import FeaturedProduct from './Card/FeaturedProduct';
import ProductContainer from './Card/ProductContainer';
import Footer from './Footer';

const featuredProduct = {
  id: 13,
  instructor: 'Micheal Kizito',
  image: 'https://img-c.udemycdn.com/course/750x422/986406_89c5_3.jpg',
  rating: 4.5,
  duration: '60 Hours',
  description: ' 4 weeks ago',
  topic: 'Typescript Fundamentals in 20 days',
  level: "Beginner",
};

const products = [
  {
    id: 1,
    instructor: '',
    image: 'https://kinsta.com/wp-content/uploads/2023/04/what-is-typescript.jpeg',
    rating: 9,
    duration: '',
    description: '',
    topic: '',
    level: "",
  },
  {
    id: 2,
    instructor: '',
    image: 'https://kinsta.com/wp-content/uploads/2023/04/what-is-typescript.jpeg',
    rating: 5.99,
    duration: '',
    description: '',
    topic: '',
    level: "",
  },
  {
    id: 3,
    instructor: '',
    image: 'https://kinsta.com/wp-content/uploads/2023/04/what-is-typescript.jpeg',
    rating: 4.99,
    duration: '',
    description: '.',
    topic: '',
    level: "",
  },
  {
    id: 4,
    instructor: '',
    image: 'https://kinsta.com/wp-content/uploads/2023/04/what-is-typescript.jpeg',
    rating: 49.99,
    duration: '',
    description: '',
    topic: '',
    level: "",
  },
  {
    id: 5,
    instructor: '',
    image: 'https://kinsta.com/wp-content/uploads/2023/04/what-is-typescript.jpeg',
    rating: 9.99,
    duration: '',
    description: '',
    topic: '',
    level: "",
  },
  {
    id: 6,
    instructor: '',
    image: 'https://kinsta.com/wp-content/uploads/2023/04/what-is-typescript.jpeg',
    rating: 1.99,
    duration: '',
    description: '',
    topic: '',
    level: "",
  },
  {
    id: 7,
    instructor: '',
    image: 'https://kinsta.com/wp-content/uploads/2023/04/what-is-typescript.jpeg',
    rating: 3.49,
    duration: '',
    description: '',
    topic: '',
    level: "",
  },
  {
    id: 8,
    instructor: '',
    image: 'https://kinsta.com/wp-content/uploads/2023/04/what-is-typescript.jpeg',
    rating: 7.99,
    duration: '',
    description: '.',
    topic: '',
    level: "",
  },
  {
    id: 9,
    instructor: '',
    image: 'https://kinsta.com/wp-content/uploads/2023/04/what-is-typescript.jpeg',
    rating: 19.99,
    duration: '',
    description: '',
    topic: '',
    level: "",
  },
  {
    id: 10,
    instructor: '',
    image: 'https://kinsta.com/wp-content/uploads/2023/04/what-is-typescript.jpeg',
    rating: 29.99,
    duration: '',
    description: '',
    topic: '',
    level: "",
  },
  {
    id: 11,
    instructor: '',
    image: 'https://kinsta.com/wp-content/uploads/2023/04/what-is-typescript.jpeg',
    rating: 39.99,
    duration: '',
    description: '.',
    topic: '',
    level: "",
  },
  {
    id: 12,
    instructor: '',
    image: 'https://kinsta.com/wp-content/uploads/2023/04/what-is-typescript.jpeg',
    rating: 1,
    duration: '',
    description: '',
    topic: '',
    level: "",
  },
];

// Usage of HorizontalCard component
const Page: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <h2 className="text-lg font-semibold my-4"><b>Top Programming Courses</b></h2>
      <FeaturedProduct product={featuredProduct}
       />
      <h2 className="text-lg font-semibold my-4"><b>Featured Courses</b></h2>
      <ProductContainer products={products.slice(0 ,3)} />
      <h2 className="text-lg font-semibold my-4"><b>Recently Accessed</b></h2>
      <ProductContainer products={products.slice(3, 6)} />
      <h2 className="text-lg font-semibold my-4"><b>The Week's Picks</b></h2>
      <ProductContainer products={products.slice(6 , 9)} />
      <h2 className="text-lg font-semibold my-4"><b>New Arrivals</b></h2>
      <ProductContainer products={products.slice(9)} />
      <Footer />
    </div>
     
      
  );
};
export default Page;


















































































































// import React from "react";
// import HorizontalScroll from "./HorizontalScroll/HorizontalScroll";
// // import "./HorizontalScroll/HorizontalScroll.css";

// import './App.css';
// import Badge from '../dashboard/Badge/Badge';
// import Button from '../dashboard/Button';
// import Card from '../dashboard/Card';

// function App() {
//   return (
//     <div className="App">
      
//       <HorizontalScroll>
//         .
//         <section className="card-container">
//           <Card
//             body='Do laborum sunt ut ex cupidatat exercitation. Do laborum sunt ut ex cupidatat exercitation. Do laborum sunt ut ex cupidatat exercitation. Do laborum sunt ut ex cupidatat exercitation.'
//             title='Read Post Now'
//             image='https://source.unsplash.com/random'
//             badge={{
//               text: "New Post",
//               filled: false,
//             }}
//             indicator="Sold"
//             btn={{
//               text: "Read Post",
//               href: '#',
//               type: 'primary',
//               filled: true,
//               // icon: <DocumentIcon />
//             }} />
//           <Card
//             body='Irure culpa quis in mollit nulla et velit velit ullamco ipsum aliquip eu amet.'
//             title='This is a Great Photo!'
//             image='https://source.unsplash.com/random/500X400'
//             badge={{
//               text: "New Photo Alert",
//               filled: false,
//             }}
//             indicator="New"
//             subtitle='Get your photo now'
//             btn={{
//               text: "Button",
//               href: '#',
//               type: 'secondary',
//               filled: true,
//               // icon: <CameraIcon />
//             }} />
//           <Card
//             body='hi'
//             title='hi2'
//             btn={{
//               text: "Button",
//               href: '#',
//               type: 'primary',
//               filled: false,
//             }} />
//         </section>
//       </HorizontalScroll>
//     </div>
//   );
// }

// export default App;
 