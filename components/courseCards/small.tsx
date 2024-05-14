import { PersonIcon, ClockIcon, StarFilledIcon } from "@radix-ui/react-icons";

interface ProductDetails {
  instructor: string;
  duration: string;
  rating: number;
  description: string;
  topic: string;
  level: string;
}

const ProductDescriptionSmallScreen: React.FC<ProductDetails> = ({
  instructor,
  duration,
  rating,
  description,
  topic,
  level,
}) => {
  return (
    <div className="flex flex-col">
      <div className="flex items-center">
        <ClockIcon className="w-6 h-6 mr-2" />
        <p className="text-white">{duration}</p>
      </div>
      <div className="flex items-center mt-2">
        <PersonIcon className="w-6 h-6 mr-2" />
        <h3 className="text-white font-semibold">{instructor}</h3>
      </div>
      <div className="flex items-center mt-2">
        <StarFilledIcon className="w-6 h-6 mr-2" />
        <h3 className="text-white font-semibold">{rating}</h3>
      </div>
      <div className="flex items-center mt-2">
        <h3 className="text-white font-semibold">{level}</h3>
      </div>
    </div>
  );
};

export default ProductDescriptionSmallScreen;
