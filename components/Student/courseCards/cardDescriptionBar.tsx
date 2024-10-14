import { PersonIcon, ClockIcon, StarFilledIcon } from "@radix-ui/react-icons";
import Image from "next/image";

interface ProductDetailsProps {
  days: string;
  description: string;
  duration: string;
  level: string;
  rating: number;
  tutorName: string;
}

const ProductDescriptionBar: React.FC<ProductDetailsProps> = ({
  days,
  description,
  duration,
  level,
  rating,
  tutorName,
}) => {
  return (
    <>
      <div className="relative bg-black px-4 pt-2 pb-8 text-white max-md:hidden ">
        <div className="relative ">
          <h3 className="absolute bottom-0 right-0  font-semibold text-white">
            {days}
          </h3>

          <h3 className="absolute top-0 right-0  font-semibold text-white">
            {description}
          </h3>

          <div className="flex flex-col md:items-center mb-2 mt-2 ">
            <div className="flex items-center">
              <ClockIcon className="w-6 h-6 mr-2" />
              <p className="text-white">{duration}</p>
            </div>
            <p className="text-sm text-white mt-2">{level}</p>
          </div>

          <div className="flex items-center mb-4 absolute gap-2 top-0 left-0 ">
            <div className="w-6 h-6 relative">
              <Image src="/person.svg" alt="person" fill />
            </div>
            <h3 className="text-white font-semibold">{tutorName}</h3>
          </div>

          <div className="absolute bottom-0 left-0 flex items-center  ">
            <StarFilledIcon className="w-6 h-6 mr-2" />
            <h3 className="text-white font-semibold">{rating}</h3>
          </div>
        </div>
      </div>

      <div className=" text-white sm:hidden relative bg-black px-4  py-3 h-full  ">
        <div className="relative flex flex-col ">
          <h3 className=" font-semibold text-white">{description}</h3>
          <h3 className=" font-semibold text-white mt-2 ">{days}</h3>
          <div className="flex items-center mt-4 mb-2 gap-2 ">
            <div className="w-6 h-6 relative">
            <Image
              src="/person.svg"
              alt="person"
             fill
            />
            </div>
            <h3 className="text-white font-semibold">
              {tutorName}
            </h3>
          </div>
          <div className="flex  justify-between w-full items-center mb-2 mt-2 ">
            <div className="flex items-center">
              <ClockIcon className="w-6 h-6 mr-2" />
              <p className="text-white">{duration}</p>
            </div>
            <p className="text-sm text-white mt-2 ">{level}</p>
          </div>

          <div className=" flex items-center pt-5 ">
            <StarFilledIcon className="w-6 h-6 " />
            <h3 className="text-white font-semibold">{rating}</h3>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDescriptionBar;
