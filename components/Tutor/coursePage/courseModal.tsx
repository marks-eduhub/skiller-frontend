import React, { useEffect, useState } from "react";
import CourseFields from "../uploadCourse/coursefields";
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
  const [level, setLevel] = useState("");
  const [days, setDays] = useState("");
  const [existingMediaId, setExistingMediaId] = useState<number | null>(null);
  const [hours, setHours] = useState("");
  const [minutes, setMinutes] = useState("");
  const [seconds, setSeconds] = useState("");

  useEffect(() => {
    if (data?.data) {
      setCourseName(data.data.attributes.coursename);
      setCourseDescription(data.data.attributes.coursedescription);
      setCourseRequirements(
        data.data.attributes.requirements.split("\n").join("<br/>")
      );
      setLevel(data.data.attributes.level);
      setDays(data.data.attributes.days);
      setCourseLearning(
        data.data.attributes.expectations.split("\n").join("<br/>")
      );

      const cardImage = data.data.attributes.card?.data?.attributes?.url;
      if (cardImage) {
        setUploadImage(cardImage);
      }
      const mediaId = data.data.attributes.card?.data?.id;
      setExistingMediaId(mediaId);
    }

    if (data?.data) {
      const durationBackend = data.data.attributes.duration;

      if (durationBackend) {
        const [hh, mm, ssMs] = durationBackend.split(":");
        const [ss] = ssMs.split(".");

        setHours(hh || "00");
        setMinutes(mm || "00");
        setSeconds(ss || "00");

        setDuration(`${hh}:${mm}:${ss}`);
      }
    }
  }, [data]);

  useEffect(() => {
    if (data?.data?.attributes?.categories?.data[0]?.id) {
      setCategory(data.data.attributes.categories.data[0].id); 
    }
  }, [data]);

  if (isLoading) {
    <div className="flex items-center  min-h-screen justify-center p-20">
      <Loader />
    </div>;
  }

  if (error) {
    message.error("Error displaying course information");
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
            setLevel={setLevel}
            setDays={setDays}
            level={level}
            days={days}
          />
        </div>
      </div>
    </div>
  );
};

export default CourseModal;
