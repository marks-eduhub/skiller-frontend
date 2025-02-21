import React from "react";
import data from "./data.json";


interface MyComponentProps {
  data2: {
    currentIndex: number;
  };
}

const Header: React.FC<MyComponentProps> = ({ data2 }) => {
  return (
    <>
      <div className=""></div>
      <div className=" text-black mt-10 mb-10 font-semibold text-2xl col-span-2 flex justify-center md:self-end">
      {data2.currentIndex === 0 && data.profileTitle}
        {data2.currentIndex === 1 && data.title}
        {/* {data2.currentIndex === 2 && data.title2} */}
        <div className="fixed right-1/8 w-[5rem] h-[5rem] top-[2rem] md:right-1/6 md:top-[14rem] md:h-[8rem] md:w-[8rem] lg:right-1/4 lg:top-[5rem] bg-black opacity-[14%] transform rounded-full " />
        <div className="fixed left-1/8 w-[18rem] h-[18rem] bottom-[-14rem] md:left-1/6 md:bottom-[-40rem] md:h-[44rem] md:w-[44rem] lg:left-1/4  bg-black opacity-[14%] transform rounded-full " />
      </div>
      <div className=""></div>
    </>
  );
};

export default Header;
