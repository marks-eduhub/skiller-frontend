import { PersonIcon, ClockIcon, StarFilledIcon } from "@radix-ui/react-icons";
import Image from "next/image"
interface ProductDetails {
  instructor: string;
  duration: string;
  rating: number;
  description: string;
  topic: string;
  level: string;
  days: string;
}

const ProductDescriptionBar: React.FC<ProductDetails> = ({
  instructor,
  duration,
  rating,
  description,
  topic,
  level,
  days,
}) => {
  return (
    <>
      <div className="gradient-bg text-white max-md:hidden ">
        <div className="relative bg-black px-4 py-2 ">
          <div className="relative small-screen">
            <h3 className="absolute bottom-0 right-0  font-semibold text-white">
              {days}
            </h3>

            <h3 className="absolute top-0 right-0  font-semibold text-white">
              {topic}
            </h3>

            <div className="flex flex-col md:items-center mb-2 mt-2 ">
              <div className="flex items-center">
                <ClockIcon className="w-6 h-6 mr-2" />
                <p className="text-white">{duration}</p>
              </div>
              <p className="text-sm text-white mt-2">{level}</p>
            </div>

            <div className="flex items-center mb-4 absolute top-0 left-0 ">
              <Image src="/person.svg" alt="person" width={20} height={20} className="w-6 h-6 mr-2"/>
              <h3 className="text-white font-semibold">{instructor}</h3>
            </div>

            <div className="absolute bottom-0 left-0 flex items-center  ">
              <StarFilledIcon className="w-6 h-6 mr-2" />
              <h3 className="text-white font-semibold">{rating}</h3>
            </div>
          </div>
        </div>
      </div>

      <div className="gradient-bg text-white sm:hidden relative bg-gradient-to-r from-indigo-500 to-black px-4  py-3  ">
        <div className="flex flex-row justify-between mb-4">
          <div className="font-semibold text-white">
            <h3>{topic}</h3>
          </div>
          <div className="flex items-center">
            <ClockIcon className="w-6 h-6 mr-2" />
            <p className="text-white">{duration}</p>
          </div>
        </div>

        <div className="flex flex-row justify-between ">
          <div className="flex font-semibold text-white">
            
            <PersonIcon className="w-6 h-6 mr-2" />
            <h3 className="text-white font-semibold">{instructor}</h3>
          </div>
          <div className="flex items-center">
            <StarFilledIcon className="w-6 h-6 mr-2" />
            <h3 className="text-white font-semibold">{rating}</h3>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDescriptionBar;
