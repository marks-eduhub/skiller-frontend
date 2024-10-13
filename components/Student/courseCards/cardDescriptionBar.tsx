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
      <div className="w-full flex flex-col bg-black p-4 text-white max-md:hidden">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center  space-x-2">
            <div className="w-6 h-6 relative">
              <Image src="/person.svg" alt="person" fill />
            </div>
            <h3 className="text-white font-semibold whitespace-nowrap">
              {tutorName}
            </h3>
          </div>
          <div className="flex items-center space-x-2">
            <ClockIcon className="w-5 h-5" />
            <p>{duration}</p>
          </div>

          <div className="relative group">
            <p className="text-[17px] whitespace-nowrap overflow-hidden overflow-ellipsis">
              {description.length > 21
                ? `${description.substring(0, 21)}...`
                : description}
            </p>
            {description.length > 21 && (
              <div className="absolute left-0 hidden w-auto p-2 text-sm bg-gray-700 text-white rounded-md shadow-md group-hover:block z-10">
                {description}
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-2">
            <StarFilledIcon className="w-5 h-5" />
            <p>{rating}</p>
          </div>
          <p>{level}</p>
          <p>{days}</p>
        </div>
      </div>

      <div className=" text-white sm:hidden relative bg-black px-2 py-3  ">
        <div className="relative flex flex-col ">
          <h3 className=" font-semibold text-white">{description}</h3>
          <h3 className=" font-semibold text-white my-2">{days}</h3>

          <div className="flex items-center gap-3">
            <div className="w-6 h-6 relative">
              <Image src="/person.svg" alt="person" fill />
            </div>
            <p className="text-white">{tutorName}</p>
          </div>

          <div className="flex  justify-between w-full items-center mb-2 mt-2 ">
            <div className="flex items-center">
              <ClockIcon className="w-6 h-6 mr-2" />
              <p className="text-white">{duration}</p>
            </div>
            <p className="text-sm text-white mt-2">{level}</p>
          </div>

          <div className=" flex items-center  ">
            <StarFilledIcon className="w-6 h-6 mr-2" />
            <h3 className="text-white font-semibold">{rating}</h3>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDescriptionBar;
