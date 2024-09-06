import Image from "next/image";
import data from "./data.json";
import { useState } from "react";
import Profile from "./profile";
import Splash from "../splash";

interface MyComponentProps {
  data2: {
    currentIndex: number;
  };
}
const Options: React.FC = () => {
  const options = data.preference_options || {};
  const [selected, setSelected] = useState<string[]>([]);
  return (
    <div className="flex flex-wrap">
      {options.map((option, index) => (
        <div
          key={index}
          className={`rounded-[7px] border-2 border-gray-500 m-2 p-2 ${
            selected.includes(option)
              ? "bg-black text-white"
              : "bg-white text-black"
          }`}
          onClick={() => {
            if (selected.includes(option)) {
              setSelected(selected.filter((item) => item !== option));
            } else {
              setSelected([...selected, option]);
            }
          }}
        >
          {option}
        </div>
      ))}
    </div>
  );
};

const Content: React.FC<MyComponentProps> = ({ data2 }) => {
  return (
    <>
      <div className="col-span-1 row-span-2"></div>
      <div className="col-span-2  row-span-2 ">
        {data2.currentIndex === 0 && <Profile />}
        {data2.currentIndex === 1 && <Options />}
        {data2.currentIndex === 2 && <Splash />}
      </div>
      <div className="col-span-1  row-span-2"></div>
      
    </>
  );
};

export default Content;
