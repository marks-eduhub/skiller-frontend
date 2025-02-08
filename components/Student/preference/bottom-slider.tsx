import Image from "next/image";
import { TbArrowBadgeRight } from "react-icons/tb";
import data from "./data.json";
import withAuth from "@/components/AuthProvider/Auth";
import { useAuthContext } from "@/Context/AuthContext";
import { useFetchUserDetails } from "@/hooks/useProfile";

interface SliderProps {
  data2: {
    currentIndex: number;
  };
  nextSlide: () => void;
  prevSlide: () => void; // Added function to go back
  skipToSplash: () => void;
  handleSubmit: () => void;
}

const BottomSlider: React.FC<SliderProps> = ({
  data2,
  nextSlide,
  prevSlide, // Accept prevSlide function
  skipToSplash,
  handleSubmit,
}) => {
  const lastIndex = 2;

  const handleLastSlide = async () => {
    if (data2.currentIndex === lastIndex - 1) {
      skipToSplash();
    } else {
      await handleSubmit();
      nextSlide();
    }
  };

  return (
    <>
      {/* Desktop View */}
      <div className="hidden md:flex md:justify-end md:self-center md:col-span-1">
        <button
          className="rounded-[7px] border-4 border-solid border-black text-black text-[20px] w-[145px] h-[60px]"
          onClick={data2.currentIndex === 1 ? prevSlide : skipToSplash} // Show "Back" on second slide
        >
          <p className="break-all">
            {data2.currentIndex === 1 ? "Back" : data.skip}
          </p>
        </button>
      </div>

      <div className="hidden md:relative md:col-span-2 md:h-[20px] md:flex md:justify-center md:self-center cursor-pointer">
        {data2.currentIndex === 0 && (
          <Image
            src={data.slider1}
            alt={"slider icon"}
            priority={true}
            fill
            onClick={handleLastSlide}
          />
        )}
        {data2.currentIndex === 1 && (
          <Image
            src={data.slider}
            alt={"slider icon"}
            priority={true}
            fill
            onClick={handleLastSlide}
          />
        )}
        {data2.currentIndex === 2 && (
          <Image
            src={data.slider2}
            alt={"slider icon"}
            priority={true}
            fill
            onClick={handleLastSlide}
          />
        )}
      </div>

      <div className="hidden md:flex md:justify-start md:self-center md:col-span-1">
        <button
          onClick={handleLastSlide}
          className="flex justify-center items-center bg-black rounded-[7px] w-[145px] h-[60px]"
        >
          <TbArrowBadgeRight size={30} color="white" />
          <p className="text-white">Continue</p>
        </button>
      </div>

      {/* Mobile View */}
      <div className="sm:hidden">
        <div className="relative my-10 flex items-center justify-center self-center cursor-pointer">
          {data2.currentIndex === 0 && (
            <Image
              src={data.slider1}
              alt={"slider icon"}
              priority={true}
              width={150}
              height={200}
              onClick={handleLastSlide}
            />
          )}
          {data2.currentIndex === 1 && (
            <Image
              src={data.slider}
              alt={"slider icon"}
              priority={true}
              width={150}
              height={200}
              onClick={handleLastSlide}
            />
          )}
          {data2.currentIndex === 2 && (
            <Image
              src={data.slider2}
              alt={"slider icon"}
              priority={true}
              width={150}
              height={200}
              onClick={handleLastSlide}
            />
          )}
        </div>

        <div className="flex justify-between mt-5 items-center w-full">
          <button
            className="rounded-[7px] border-4 border-solid border-black text-black text-[20px] w-[145px] h-[60px]"
            onClick={data2.currentIndex === 1 ? prevSlide : skipToSplash} // Show "Back" on second slide
          >
            <p className="break-all">
              {data2.currentIndex === 1 ? "Back" : data.skip}
            </p>
          </button>

          <button
            onClick={handleLastSlide}
            className="flex justify-center items-center bg-black rounded-[7px] w-[145px] h-[60px]"
          >
            <TbArrowBadgeRight size={30} color="white" />
            <p className="text-white">Next</p>
          </button>
        </div>
      </div>
    </>
  );
};

export default withAuth(BottomSlider);
