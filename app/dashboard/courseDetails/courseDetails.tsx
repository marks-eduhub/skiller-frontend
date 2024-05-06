
"use client";
import FeaturedProduct from "../courseCards/mainFeaturedCard";
import ProductList from "../courseCards/cardContentList";
import React from 'react';
// import ProductCard from "../courseCards/courseCards"



const SubscribePage: React.FC = () => {
  const products = [{
    id: 1,
    instructor: "Micheal Kizito",
    image:
      "https://kinsta.com/wp-content/uploads/2023/04/what-is-typescript.jpeg",
    rating: 4.5,
    duration: "60 Hours",
    description: "4 weeks ago",
    topic: "Typescript Fundamentals in 20 days",
    level: "Beginner ",
  }, 
  {
    id: 2,
    instructor: "Dragule Swaib",
    image:
      "https://kinsta.com/wp-content/uploads/2023/04/what-is-typescript.jpeg",
    rating: 4.5,
    duration: " 60 Hours",
    description: "4 weeks ago",
    topic: "Malware Analysis",
    level: "Beginner",
  },
  {
    id: 3,
    instructor: "Micheal Kizito",
    image:
      "https://kinsta.com/wp-content/uploads/2023/04/what-is-typescript.jpeg",
    rating: 4.5,
    duration: "60 hours",
    description: "4 weeks ago",
    topic: "Typescript Fundamentals in 20 days",
    level: "Beginner",
  },
  {
    id: 4,
    instructor: "Dragule Swaib",
    image:
      "https://kinsta.com/wp-content/uploads/2023/04/what-is-typescript.jpeg",
    rating: 4.5,
    duration: "60 Hours ",
    description: "4 weeks ago",
    topic: "Malware Analysis",
    level: "Beginner",
  },
  
];


  return (
    <div className="flex flex-col min-h-screen">
      {/* flex flex-col min-h-screen */}
      <h2 className="text-lg font-semibold my-4">
        <b>Featured Courses</b>
      </h2>
      <div className="flex flex-row  ">
        {/* classname="flex flex-col max-h-[600px] overflow-y-auto py-4 " */}
       
        <div className="flex flex-col">
          <ProductList products={products} containerWidth="100%" />
        </div>
        <div className="flex flex-col">
          <ProductList products={products} containerWidth="100%" />
        </div>
        <div className="flex flex-col">
          <ProductList products={products} containerWidth="100%" />
        </div>
        <div className="flex flex-col">
          <ProductList products={products} containerWidth="100%" />
        </div>
        
      </div>
    </div>
  );
};

export default SubscribePage;











































































































