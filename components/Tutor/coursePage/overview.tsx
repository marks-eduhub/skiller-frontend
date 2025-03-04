"use client";
import Loader from "@/components/Student/loader";
import { useFetchOverview } from "@/hooks/useCourseOverview";
import { useFetchCourseTopics } from "@/hooks/useCourses";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import CourseModal from "./courseModal";
import DeletecourseModal from "./deletecourse";

const Overview = () => {
  const { slug } = useParams();
  const courseId = Number(slug);
  const { data, isLoading, error } = useFetchOverview(courseId);
  const { data: topicData } = useFetchCourseTopics(courseId);
  const duration = data?.data?.attributes?.duration || "N/A";
  const enrolledLearners = data?.data?.attributes?.users?.data || [];
  const learners = enrolledLearners.length > 0 ? enrolledLearners.length : "No learners yet";
  const likes = data?.data?.attributes?.liked_courses?.data || [];
  const numberOfLiked = likes.length > 0 ? likes.length : "No likes yet";
  const [isModal, setModalOpen] = useState(false);
  const [openModal, setOpenModalOpen] = useState(false);

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleOpen = () => {
    setOpenModalOpen(true);
  };

  const handleClose = () => {
    setOpenModalOpen(false);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const totalTests = topicData?.data.reduce(
    (count: any, topic: any) =>
      count + (topic.attributes?.topic_tests?.data?.length || 0),
    0
  );
  const numberOfTests = totalTests > 0 ? totalTests : "No tests yet";

  const courses = [
    { value: "Enrolled Students:", number: learners },
    { value: "Active Students:", number: learners },
    { value: "Likes:", number: numberOfLiked },
    { value: "Course Duration:", number: duration },
    { value: "Number of Tests:", number: numberOfTests },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-20">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center p-20 text-red-500 text-[17px]">
        Error fetching data
      </div>
    );
  }

  return (
    <div className="bg-gray-100 mb-10 w-full relative sm:mt-0 mt-5  sm:h-auto sm:px-0 px-10 sm:py-4 py-10 items-center rounded-lg">
      <div className="flex items-center justify-between mb-10 mt-4">
        <button
          className="absolute top-4 sm:mb-0 mb-5 left-6 bg-red-700  text-white px-4 py-2 rounded-md hover:bg-white hover:border-2 hover:border-black hover:text-black"
          onClick={handleOpen}
        >
          Delete Course
        </button>
        <button
          className="absolute top-4 sm:mb-0 mb-5 right-4 bg-blue-900 text-white px-4 py-2 rounded-md hover:bg-white hover:border-2 hover:border-black hover:text-black"
          onClick={handleModalOpen}
        >
          Edit
        </button>
      </div>
      {courses.map((course, index) => (
        <div
          key={index}
          className="flex sm:flex-row py-4 px-6 items-center sm:justify-between"
        >
          <h1 className="font-bold text-center w-full sm:w-auto sm:pl-[200px]">
            {course.value}
          </h1>
          <h1 className="justify-end flex items-center w-full sm:w-auto sm:pr-[200px]">
            {course.number}
          </h1>
        </div>
      ))}
      <CourseModal
        isOpen={isModal}
        onClose={handleModalClose}
        courseId={courseId}
      />
      {openModal && (
        <DeletecourseModal
          isOpen={openModal}
          onClose={handleClose}
          courseId={courseId}
        />
      )}
    </div>
  );
};

export default Overview;
