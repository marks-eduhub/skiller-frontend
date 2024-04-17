
import { PersonIcon, ClockIcon, StarFilledIcon } from '@radix-ui/react-icons';

interface ProductDetails {
  instructor: string;
  duration: string;
  rating: number;
  description: string;
  topic: string;
  level: string;
}

const ProductDescriptionBar: React.FC<ProductDetails> = ({ instructor, duration, rating, description, topic, level }) => {
  return (
  <>
      <div className="gradient-bg">

    <div className="relative bg-gradient-to-r from-indigo-500 to-black px-4 py-2 rounded-lg">
    <div className="relative">
      {/* Level (right bottom corner) */}
      <h3 className="absolute bottom-0 right-0  font-semibold text-white">{level}</h3>

      {/* Topic (right most upper corner) */}
      <h3 className="absolute top-0 right-0  font-semibold text-white">{topic}</h3>

      {/* Duration (middle of the card) */}
      <div className="flex flex-col items-center">
         <div className="flex items-center">
          <ClockIcon className="w-6 h-6 mr-2" />
          <p className="text-white">{duration}</p>
        </div> 
        {/* Description (below duration) */}
         <p className="text-sm text-white mt-2">{description}</p>
      </div> 

      {/* Instructor (left most top corner) */}
      <div className="flex items-center mb-4 absolute top-0 left-0 ">
        <PersonIcon className="w-6 h-6 mr-2" />
        <h3 className="text-white font-semibold">{instructor}</h3>
      </div>

      {/* Rating (left most bottom corner) */}
      <div className="absolute bottom-0 left-0 flex items-center">
        <StarFilledIcon className="w-6 h-6 mr-2" />
        <h3 className="text-white font-semibold">{rating}</h3>
      </div> 
    </div>
    </div>

    </div>
    </>

  );
};

export default ProductDescriptionBar;

