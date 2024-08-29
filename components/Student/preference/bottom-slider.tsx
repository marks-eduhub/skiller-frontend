import Image from "next/image";
import { TbArrowBadgeRight } from "react-icons/tb";
import data from "./data.json";
import withAuth from "@/components/AuthProvider/Auth";

interface SliderProps {
  data2: {
    currentIndex: number;
  };
  nextSlide: () => void;
  skipToSplash: () => void; 
}

const BottomSlider: React.FC<SliderProps> = ({ data2, nextSlide, skipToSplash }) => {
  const lastIndex = 2; 

  const handleLastSlide = () => {
    //incase user wants to skip to last slide 
    if (data2.currentIndex === lastIndex - 1) {
      skipToSplash(); 
    } else {
      nextSlide(); 
    }
  };

  return (
    <>
      <div className="hidden md:flex md:justify-end md:self-center md:col-span-1">
        {/* Render skip button */}
        <button className="rounded-[7px] border-4 border-solid border-black text-black text-[20px] w-[145px] h-[60px]" onClick={skipToSplash}>
          <p className="break-all">{data.skip}</p>
        </button>
      </div>
      <div className="hidden md:relative md:col-span-2 md:h-[20px] md:flex md:justify-center md:self-center cursor-pointer">
        {/* Render image based on currentIndex */}
        {data2.currentIndex === 0 && (
          <Image src={data.slider1} alt={"slider icon"} priority={true} fill onClick={handleLastSlide} />
        )}
        {data2.currentIndex === 1 && (
          <Image src={data.slider} alt={"slider icon"} priority={true} fill onClick={handleLastSlide}/>
        )}
        {data2.currentIndex === 2 && (
          <Image src={data.slider2} alt={"slider icon"} priority={true} fill onClick={handleLastSlide}/>
        )}
      </div>
      <div className="hidden md:flex md:justify-start md:self-center md:col-span-1">
        {/* Render next slide button */}
        <button onClick={handleLastSlide} className="flex justify-center items-center bg-black rounded-[7px] w-[145px] h-[60px]">
          <TbArrowBadgeRight size={30} color="white" />
        </button>
      </div>
    </>
  );
};

export default withAuth(BottomSlider);
