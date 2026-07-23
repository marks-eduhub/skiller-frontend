import React, { useEffect, useState } from "react";
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
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  COURSE_IMAGE_MAX_BYTES,
  COURSE_IMAGE_TYPES,
  isValidUploadSize,
  isValidUploadType,
} from "@/lib/uploadRules";

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
  setLevel: React.Dispatch<React.SetStateAction<string>>;
  setDays: React.Dispatch<React.SetStateAction<string>>;
  setDuration: React.Dispatch<React.SetStateAction<string>>;
  level: string;
  days: string;
  setSelectedImage: React.Dispatch<React.SetStateAction<File | null>>;
  onClose: () => void;
  existingMediaId: number | null;
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
  existingMediaId,
  setLevel,
  setDays,
  level,
  days,
}) => {
  const queryClient = useQueryClient();
  const pathname = usePathname();
  const { slug } = useParams();
  const courseId = String(slug);
  const { data, isLoading, error } = useFetchCategory();
  const [fileName, setFileName] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [hours, setHours] = useState("");
  const [minutes, setMinutes] = useState("");
  const [seconds, setSeconds] = useState("");

  useEffect(() => {
    if (duration) {
      const [hours, minutes, seconds] = duration.split(":");
      const [ss] = seconds.split(".");
      setHours(hours || "02");
      setMinutes(minutes || "05");
      setSeconds(ss || "07");
    }
  }, [duration]);

  const handleCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!isValidUploadType(file, COURSE_IMAGE_TYPES)) {
        message.error("Course thumbnail must be a JPG, PNG, or WEBP image.");
        return;
      }

      if (!isValidUploadSize(file, COURSE_IMAGE_MAX_BYTES)) {
        message.error("Course thumbnail must be 8MB or smaller.");
        return;
      }

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
      level,
      days,
      courseLearning,
      courseDescription,
      courseRequirements,
      mediaId,
      category,
      duration,
    }: {
      courseId: string;
      courseName: string;
      level: string;
      days: string;
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
        level,
        days,
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
      queryClient.invalidateQueries({ queryKey:["courses"]}); 
     
      onClose();
    },
    onError: () => {
      message.error("Error editing course.");
    },
  });
  
  const handleSaveChanges = async () => {
    setIsSaving(true);
    try {
      const mediaId = selectedImage
        ? await uploadMedia(selectedImage)
        : existingMediaId;
  
      if (!mediaId) {
        message.error("Course image upload failed.");
        setIsSaving(false);
        return;
      }
  
      const categoryId =
        category || data?.data?.attributes?.categories?.data[0]?.id;
  
      if (!categoryId) {
        message.error("Category ID is required.");
        setIsSaving(false);
        return;
      }
  
      const payload = {
        courseId,
        courseName: courseName || data?.data?.attributes?.coursename,
        level: level || data?.data?.attributes?.level,
        days: days || data?.data?.attributes?.days,
        courseLearning: courseLearning || data?.data?.attributes?.expectations,
        courseDescription:
          courseDescription || data?.data?.attributes?.coursedescription,
        courseRequirements:
          courseRequirements || data?.data?.attributes?.requirements,
        mediaId,
        category: categoryId, 
        duration: duration || data?.data?.attributes?.duration,
      };
  
      console.log("Payload:", payload);
  
      courseEdit(payload, {
        onSettled: () => {
          setIsSaving(false);
        },
      });
    } catch (error) {
      message.error("Error editing course.");
      setIsSaving(false);
    }
  };

  const handleDurationChange = () => {
    const formattedDuration = `${(hours || "00").padStart(2, "0")}:${(
      minutes || "00"
    ).padStart(2, "0")}:${(seconds || "00").padStart(2, "0")}.000`;
    setDuration(formattedDuration);
  };

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
        <div className="flex flex-col">
          <label className="mb-1 text-sm font-medium">Course Name:</label>
          <input
            type="text"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
            className="border rounded-md border-black w-full sm:max-w-[300px] bg-[#F9F9F9] px-3 py-2 outline-none"
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-1 text-sm font-medium">Course Duration:</label>
          <div className="flex gap-2">
            <input
              type="number"
              min="0"
              value={hours}
              onChange={(e) => setHours(e.target.value)}
              onBlur={() => {
                setHours((hours || "00").padStart(2, "0"));
                handleDurationChange();
              }}
              placeholder="HH"
              className="border rounded-md border-black w-16 text-center bg-[#F9F9F9] px-3 py-2 outline-none"
            />
            <span>:</span>
            <input
              type="number"
              min="0"
              max="59"
              value={minutes}
              onChange={(e) => setMinutes(e.target.value)}
              onBlur={() => {
                setMinutes((minutes || "00").padStart(2, "0"));
                handleDurationChange();
              }}
              placeholder="MM"
              className="border rounded-md border-black w-16 text-center bg-[#F9F9F9] px-3 py-2 outline-none"
            />
            <span>:</span>
            <input
              type="number"
              min="0"
              max="59"
              value={seconds}
              onChange={(e) => setSeconds(e.target.value)}
              onBlur={() => {
                setSeconds((seconds || "00").padStart(2, "0"));
                handleDurationChange();
              }}
              placeholder="SS"
              className="border rounded-md border-black w-16 text-center bg-[#F9F9F9] px-3 py-2 outline-none"
            />
          </div>
        </div>

        <div className="flex flex-col">
          <label className="mb-1 text-sm font-medium">Course Level:</label>
          <select
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            className="border rounded-md border-black w-full sm:max-w-[300px] bg-[#F9F9F9] px-3 py-2 outline-none"
          >
            <option value="">Select Level</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label className="mb-1 text-sm font-medium">Days:</label>
          <input
            type="text"
            value={days}
            onChange={(e) => setDays(e.target.value)}
            className="border rounded-md border-black w-full sm:max-w-[300px] bg-[#F9F9F9] px-3 py-2 outline-none"
          />
        </div>
      </div>

      <div className="mb-10  mt-4">
        <label className="block text-sm font-medium mb-4 mt-8">
          Enter a brief description about the course
        </label>
        <ReactQuill
          placeholder="Write content here"
          value={courseDescription}
          onChange={(value) => {
            setCourseDescription(value);
          }}
          className="bg-white h-auto"
        />
      </div>

      <div className="mb-6 ">
        <label className="block text-sm font-medium mb-4 ">
          What will the student learn?
        </label>
        <ReactQuill
          value={courseLearning}
          onChange={(value) => {
            setCourseLearning(value);
          }}
          className="h-auto"
        />
      </div>

      <div className="mb-6 mt-6">
        <label className="block text-sm font-medium mb-4 ">
          Course Requirements
        </label>
        <ReactQuill
          value={courseRequirements}
          onChange={(value) => {
            setCourseRequirements(value);
          }}
          className="h-auto"
        />
      </div>

      <div>
        <label htmlFor="category" className="block text-sm font-medium mb-4 ">
          Course Category
        </label>
        {isLoading ? (
          <div className="flex items-center justify-center">
            <Loader />
          </div>
        ) : error ? (
          <p className="text-red-500">Failed to load categories</p>
        ) : (
          <select
            id="category"
            value={category}
            onChange={handleCategory}
            className="px-4 py-2 rounded-lg w-full sm:w-[300px] border border-gray-300 outline-none text-black bg-white shadow-md transition-all"
          >
            
            {!category && (
              <option value="" className="text-gray-500">
                Select a category for your course
              </option>
            )}
            {data?.data?.map(
              (CategoryData: {
                id: string;
                attributes: { coursecategories: string };
              }) => {

                return (
                  <option
                    key={CategoryData.id}
                    value={CategoryData.id}
                    className="text-black bg-white hover:bg-gray-100"
                  >
                    {CategoryData.attributes.coursecategories}
                  </option>
                );
              }
            )}
            
          </select>
        )}
      </div>

      <div className="mt-10">
        <h1 className="text-base font-medium text-slate-950">Upload Course Image</h1>
        <p className="mt-2 text-sm text-slate-600">
          Use a clear thumbnail that helps learners recognize the course quickly.
        </p>

        <div className="relative mt-4 flex h-[220px] w-full items-center justify-center overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 sm:w-[420px]">
          {uploadImage ? (
            <Image
              src={uploadImage}
              alt="Course Image"
              fill
              className="object-cover"
            />
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center bg-white p-6 text-center">
              <div className="relative h-[124px] w-[220px] overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 shadow-sm">
                <Image
                  src="/course-placeholder.svg"
                  alt="Course placeholder"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="mt-5 flex items-center gap-3 text-slate-700">
                <GrCloudUpload className="h-5 w-5" />
                <span className="text-sm font-medium">
                  Drop an image here or click to browse
                </span>
              </div>
              <p className="mt-2 text-xs text-slate-500">
                Recommended landscape image for a cleaner course card.
              </p>
            </div>
          )}
          <input
            type="file"
            className="absolute inset-0 opacity-0 cursor-pointer"
            accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp"
            onChange={handleImageChange}
          />
        </div>
        <div className="flex items-center justify-center my-5">
          {pathname === `/tutor/dashboard/courseoverview/${courseId}` && (
            <button
              className="bg-black text-white px-4 py-2 rounded-md"
              onClick={handleSaveChanges}
              disabled={isSaving}
            >
              {isSaving ? "Submitting ..." : "Submit changes"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseFields;
