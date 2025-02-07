import React, { useState } from "react";
import { GrCloudUpload } from "react-icons/gr";
import Image from "next/image";
import Loader from "@/components/Student/loader";
import dynamic from "next/dynamic";
import {
  courseEditing,
  uploadMedia,
  useFetchCategory,
} from "@/hooks/useCourseUpload";
import { message } from "antd";
import { useParams, usePathname } from "next/navigation";
import { useMutation } from "@tanstack/react-query";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

interface CourseFieldsProps {
  courseName: string;
  setCourseName: React.Dispatch<React.SetStateAction<string>>;
  courseDescription: string;
  setCourseDescription: React.Dispatch<React.SetStateAction<string>>;
  courseRequirements: string;
  setCourseRequirements: React.Dispatch<React.SetStateAction<string>>;
  courseLearning: string;
  setCourseLearning: React.Dispatch<React.SetStateAction<string>>;
  category: string;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
  selectedImage: File | null;
  uploadImage: string | null;
  setUploadImage: React.Dispatch<React.SetStateAction<string | null>>;
  duration: string;
  setDuration: React.Dispatch<React.SetStateAction<string>>;
  setSelectedImage: React.Dispatch<React.SetStateAction<File | null>>;
  onClose: () => void;
  existingMediaId: number | null
}
const CourseFields: React.FC<CourseFieldsProps> = ({
  courseName,
  setCourseName,
  courseDescription,
  setCourseDescription,
  courseRequirements,
  setCourseRequirements,
  courseLearning,
  setCourseLearning,
  category,
  setCategory,
  selectedImage,
  uploadImage,
  setUploadImage,
  duration,
  setDuration,
  setSelectedImage,
  onClose,
  existingMediaId

}) => {
  const pathname = usePathname();
  const { slug } = useParams();
  const courseId = Number(slug);
  const { data, isLoading, error } = useFetchCategory();
  const [fileName, setFileName] = useState<string | null>(null);

  const handleCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
  };
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      setFileName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      message.error("No course image selected. Please try again.");
    }
  };

  const { mutate: courseEdit } = useMutation({
    mutationFn: async ({
      courseId,
      courseName,
      courseLearning,
      courseDescription,
      courseRequirements,
      mediaId,
      category,
      duration,
    }: {
      courseId: number;
      courseName: string;
      courseLearning: string;
      courseDescription: string;
      courseRequirements: string;
      mediaId: number;
      category: string;
      duration: string;
    }) => {
      return await courseEditing(
        courseId,
        courseName,
        courseLearning,
        courseDescription,
        courseRequirements,
        mediaId,
        category,
        duration
      );
    },
    onSuccess: () => {
      message.success("Course edited successfully!");
      onClose();
    },
    onError: () => {
      message.error("Error editing course.");
    },
  });
  
  const handleSaveChanges = async () => {
    const mediaId = selectedImage ? await uploadMedia(selectedImage) : existingMediaId;
  if (!mediaId) {
    throw new Error("Course image upload failed.");
  }
  
    try {
      courseEdit({
        courseId,
        courseName,
        courseLearning,
        courseDescription,
        courseRequirements,
        mediaId, 
        category,
        duration,
      });
    } catch (error) {
      message.error("Error editing course.");
    }
  };
  

  return (
    <div>
      <div className="flex gap-5">
        <div className="mt-5 flex sm:flex-row flex-col sm:items-center w-full">
          <label className="sm:flex-shrink-0 my-2 sm:my-0">Course name:</label>
          <input
            type="text"
            value={courseName}
            onChange={(e) => {
              setCourseName(e.target.value);
            }}
            className="border sm:ml-5 border-black w-full bg-[#F9F9F9] px-3 py-2 outline-none"
          />
        </div>
        <div className="mt-5 flex sm:flex-row flex-col sm:items-center w-full">
          <label className="sm:flex-shrink-0 my-2 sm:my-0">
            Course duration:
          </label>
          <input
            type="text"
            value={duration}
            onChange={(e) => {
              setDuration(e.target.value);
            }}
            className="border sm:ml-2 border-black w-full bg-[#F9F9F9] px-3 py-2 outline-none"
          />
        </div>
      </div>
      <div className="mb-10 mt-4">
        <label className="block text-sm font-medium mb-4 mt-6">
          Enter a brief description about the course
        </label>
        <ReactQuill
          placeholder="Write content here"
          value={courseDescription}
          onChange={(value) => {
            setCourseDescription(value);
          }}
          className="bg-white h-40"
        />
      </div>
      <div className="mb-6 mt-10">
        <label className="block text-sm font-medium mb-4 mt-20">
          What will the student learn?
        </label>
        <ReactQuill
          value={courseLearning}
          onChange={(value) => {
            setCourseLearning(value);
          }}
          className="h-40"
        />
      </div>
      <div className="mb-6 mt-6">
        <label className="block text-sm font-medium mb-4 mt-20">
          Course Requirements
        </label>
        <ReactQuill
          value={courseRequirements}
          onChange={(value) => {
            setCourseRequirements(value);
          }}
          className="h-40"
        />
      </div>

      <div>
        <label
          htmlFor="category"
          className="block text-sm font-medium mb-4 mt-20"
        >
          Course Category
        </label>
        {isLoading ? (
          <Loader />
        ) : error ? (
          <p className="text-red-500">Failed to load categories</p>
        ) : (
          <select
            id="category"
            value={category}
            onChange={handleCategory}
            className="px-4 py-2 rounded-lg w-full sm:w-[300px] border border-gray-300 outline-none text-black bg-white shadow-md transition-all"
          >
            <option value="" className="text-gray-500">
              Select a category for your course
            </option>
            {data?.data?.map(
              (CategoryData: {
                id: string;
                attributes: { coursecategories: string };
              }) => (
                <option
                  key={CategoryData.id}
                  value={CategoryData.id}
                  className="text-black bg-white  hover:bg-gray-100"
                >
                  {CategoryData.attributes.coursecategories}
                </option>
              )
            )}
          </select>
        )}
      </div>

      <div className="mt-10">
        <h1>Upload Course Image</h1>

        <div className="flex flex-col items-center justify-center border border-dashed border-black p-3 relative h-[200px] rounded">
          {uploadImage ? (
            <Image
              src={uploadImage}
              alt="Course Image"
              fill
              className="object-contain rounded-md p-4"
            />
          ) : (
            <>
              <GrCloudUpload className="text-blue-800 w-10 h-10" />
              <span className="text-gray-500">
                Drag & drop files or
                <span className="text-blue-500 ml-1 cursor-pointer">
                  Browse
                </span>
              </span>
            </>
          )}
          <input
            type="file"
            className="absolute inset-0 opacity-0 cursor-pointer"
            onChange={handleImageChange}
          />
        </div>

        <div className="flex items-center justify-center my-5">
          {pathname === `/tutor/dashboard/courseoverview/${courseId}` && (
            <button
              className="bg-black text-white px-4 py-2 rounded-md"
              onClick={handleSaveChanges}
            >
              Submit changes
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseFields;
