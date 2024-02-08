import Image from 'next/image'
import data from "./data.json";
import { useState } from "react";
import Profile from './profile';

interface MyComponentProps {
  data: {
    slider: string;
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

const Content: React.FC<MyComponentProps> = ({ data }) => {
  return (
    <>
      <div className="col-span-1"></div>
      <div className="col-span-2">
        <Options />
        {/* <Profile /> */}
      </div>
      <div className="col-span-1"></div>
      <div className="relative w-24 h-24 col-span-2 h-[20px] flex justify-center self-center md:hidden">
        <Image className="mt-50 mb-10 h-auto" src={data.slider} alt={"slider icon"} priority={true} fill />
      </div>
    </>
  );
};

export default Content;