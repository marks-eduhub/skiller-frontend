import React, { useEffect, useState } from "react";
import CourseFields from "../uploadCourse/coursefileds";
import { useFetchOverview } from "@/hooks/useCourseOverview";
import Loader from "@/components/Student/loader";
import { message } from "antd";

interface CourseModalProps {
  isOpen: boolean;
  onClose: () => void;
  courseId: number;
}
const CourseModal: React.FC<CourseModalProps> = ({
  isOpen,
  onClose,
  courseId,
}) => {
  const { data, isLoading, error } = useFetchOverview(courseId);
  const [uploadImage, setUploadImage] = useState<string | null>(null);
  const [courseDescription, setCourseDescription] = useState("");
  const [courseRequirements, setCourseRequirements] = useState("");
  const [courseLearning, setCourseLearning] = useState("");
  const [courseName, setCourseName] = useState("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [category, setCategory] = useState("");
  const [duration, setDuration] = useState("");
  const [existingMediaId, setExistingMediaId] = useState<number | null>(null);  


  useEffect(() => {
    if (data?.data) {
      setCourseName((prev) => prev || data.data.attributes.coursename);
      setCourseDescription(
        (prev) => prev || data.data.attributes.coursedescription
      );
      setCourseRequirements(
        (prev) => prev || data.data.attributes.requirements
      );
      setCourseLearning((prev) => prev || data.data.attributes.expectations);
      setCategory((prev) => prev || data.data.attributes.category);
      setDuration((prev) => prev || data.data.attributes.duration);

      const cardImage = data.data.attributes.card?.data?.attributes?.url;
      if (cardImage) {
        const imageURL = `${process.env.NEXT_PUBLIC_API_BASE_URL}${cardImage}`;
        setUploadImage((prev) => prev || imageURL);
      }
      const mediaId = data.data.attributes.card?.data?.id; 
      setExistingMediaId(mediaId);
    }
  }, [data]);

  if(isLoading) {
      <div className="flex items-center  min-h-screen justify-center p-20">
        <Loader />
      </div>
    
  }

  if(error) {
    message.error("Error displaying course information")
  }


  return (
    <div
      className={`fixed inset-0 bg-opacity-50 z-50 flex items-center justify-end ${
        isOpen ? "translate-x-0" : "translate-x-full"
      } transition-transform duration-300`}
    >
      <div className="w-[600px] bg-white h-full p-6 shadow-lg overflow-y-auto">
        <button
          onClick={() => {
            onClose();
          }}
          className="text-gray-600 text-sm px-4 py-2 border border-black rounded-md mb-4"
        >
          Close
        </button>
        <h2 className="text-xl font-semibold mb-4 flex items-center justify-center">
          Edit Course Details
        </h2>
        <div className="overflow-y-auto">
          <CourseFields
            setCourseName={setCourseName}
            setCourseDescription={setCourseDescription}
            setCourseRequirements={setCourseRequirements}
            setCourseLearning={setCourseLearning}
            setCategory={setCategory}
            setUploadImage={setUploadImage}
            setDuration={setDuration}
            courseName={courseName}
            courseDescription={courseDescription}
            courseRequirements={courseRequirements}
            courseLearning={courseLearning}
            category={category}
            uploadImage={uploadImage}
            duration={duration}
            selectedImage={selectedImage}
            setSelectedImage={setSelectedImage}
            onClose={onClose}
            existingMediaId={existingMediaId}
          />
        </div>
      </div>
    </div>
  );
};

export default CourseModal;
