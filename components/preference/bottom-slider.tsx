import React from "react";
import { TbArrowBadgeRight } from "react-icons/tb";
import data from "./data.json";

interface SliderProps {
  data2: {
    currentIndex: number;
  };
  nextSlide: () => void;
  skipToEnd: () => void; 
}

const BottomSlider: React.FC<SliderProps> = ({ data2, nextSlide, skipToEnd }) => {
  return (
    <>
      <div className="hidden md:flex md:justify-end md:self-center md:col-span-1">
        {/* Render skip button only if currentIndex is not equal to 2 */}
        {data2.currentIndex !== 2 && (
          <button className="rounded-[7px] border-4 border-solid border-black text-black text-[20px] w-[145px] h-[60px]" onClick={skipToEnd}>
            <p className="break-all">{data.skip}</p>
          </button>
        )}
      </div>
     
      <div className="mt-[100px] flex justify-between md:hidden">
        <div className="flex justify-end self-center col-span-1">
          {/* Render skip button only if currentIndex is not equal to 2 */}
          {data2.currentIndex !== 2 && (
            <button className="rounded-[7px] border-4 border-solid border-black text-black text-[20px] w-[145px] h-[60px]" onClick={skipToEnd}>
              <p className="break-all">{data.skip}</p>
            </button>
          )}
        </div>
        
      </div>
    </>
  );
};

export default BottomSlider;
