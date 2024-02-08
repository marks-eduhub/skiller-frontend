import Image from "next/image";
import { TbArrowBadgeRight } from "react-icons/tb"; // replace with actual import
import data from "./data.json";

interface SliderProps {
  data2: {
    currentIndex: number;
  };
  nextSlide: () => void;
}

const BottomSlider: React.FC<SliderProps> = ({ data2, nextSlide }) => {
  return (
    <>
      <div className="hidden md:flex md:justify-end md:self-center md:col-span-1">
        <button className="rounded-[7px] border-4 border-solid border-black text-black text-[20px] w-[145px] h-[60px] ">
          <p className="break-all">{data.skip}</p>
        </button>
      </div>
      <div className="hidden md:relative md:col-span-2 md:h-[20px] md:flex md:justify-center md:self-center">
        {data2.currentIndex === 0 && (
          <Image  src={data.slider1} alt={"slider icon"} priority={true} fill />
        )}
        {data2.currentIndex === 1 && (
          <Image src={data.slider} alt={"slider icon"} priority={true} fill />
        )}
      </div>
      <div className="hidden md:flex md:justify-start md:self-center md:col-span-1">
        <button
          onClick={nextSlide}
          className="flex justify-center items-center bg-black rounded-[7px] w-[145px] h-[60px] "
        >
          <TbArrowBadgeRight size={30} color="white" />
        </button>
      </div>
      <div className="mt-[100px] flex justify-between md:hidden">
        <div className=" flex justify-end self-center col-span-1">
          <button className="rounded-[7px] border-4 border-solid border-black text-black text-[20px] w-[145px] h-[60px] ">
            <p className="break-all">{data.skip}</p>
          </button>
        </div>
        <div className=" flex justify-start self-center col-span-1">
          <button
            onClick={nextSlide}
            className="flex justify-center items-center bg-black rounded-[7px] w-[145px] h-[60px] "
          >
            <TbArrowBadgeRight size={30} color="white" />
          </button>
        </div>
      </div>
    </>
  );
};

export default BottomSlider;
