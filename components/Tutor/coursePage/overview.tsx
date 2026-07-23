"use client";
import Loader from "@/components/Student/loader";
import { useFetchOverview } from "@/hooks/useCourseOverview";
import { useFetchCourseTopics } from "@/hooks/useCourses";
import { submitCourseForReview } from "@/hooks/useCourseUpload";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { message } from "antd";
import CourseModal from "./courseModal";
import DeletecourseModal from "./deletecourse";
import { useFetchEnrolledCourses } from "@/hooks/useSubmit";

const Overview = () => {
  const { slug } = useParams();
  const courseId = String(slug);
  const { data, isLoading, error } = useFetchOverview(courseId);
  const { data: topicData } = useFetchCourseTopics(courseId);
  const queryClient = useQueryClient();
  const duration = data?.data?.attributes?.duration || "N/A";
  const likes = data?.data?.attributes?.liked_courses?.data || [];
  const numberOfLiked = likes.length;
  const [isModal, setModalOpen] = useState(false);
  const [openModal, setOpenModalOpen] = useState(false);
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  const {data: totalStudentsEnrolled} = useFetchEnrolledCourses(courseId)
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
  const numberOfTests = totalTests || 0;
  const studentsenrolled = totalStudentsEnrolled?.length || 0;
  const courseStatus = (data?.data?.attributes?.status || "").toLowerCase();
  const isDraftCourse = courseStatus !== "published" && courseStatus !== "pending";
  const hasTopic = (topicData?.data?.length || 0) > 0;
  const hasAssessment = numberOfTests > 0;
  const canSubmitForReview = hasTopic && hasAssessment;

  const handleSubmitForReview = async () => {
    if (!canSubmitForReview || isSubmittingReview) return;
    setIsSubmittingReview(true);
    try {
      await submitCourseForReview(courseId);
      message.success("Course submitted for review!");
      queryClient.invalidateQueries({ queryKey: ["courseoverview", courseId] });
    } catch (error) {
      message.error("Failed to submit course for review. Please try again.");
    } finally {
      setIsSubmittingReview(false);
    }
  };

  const metrics = [
    {
      label: "Enrolled Students",
      value: studentsenrolled,
      helper: studentsenrolled === 0 ? "No learners enrolled yet" : "Total learners in this course",
    },
    {
      label: "Active Students",
      value: studentsenrolled,
      helper: studentsenrolled === 0 ? "Activity will appear after enrollments" : "Learners currently tracked in this course",
    },
    {
      label: "Likes",
      value: numberOfLiked,
      helper: numberOfLiked === 0 ? "No likes yet" : "Learners who saved this course",
    },
    {
      label: "Course Duration",
      value: duration,
      helper: duration === "N/A" ? "Duration has not been set" : "Total configured course runtime",
    },
    {
      label: "Tests",
      value: numberOfTests,
      helper: numberOfTests === 0 ? "No tests created yet" : "Assessments linked to topics",
    },
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
    <div className="relative mb-8 mt-5 w-full rounded-[24px] border border-slate-200 bg-slate-50 px-4 py-16 sm:mt-0 sm:px-5 sm:py-14">
      <div className="mb-8 flex items-center justify-between">
        <button
          className="absolute left-4 top-4 rounded-md bg-red-700 px-4 py-2 text-sm text-white transition hover:border-2 hover:border-black hover:bg-white hover:text-black sm:left-5"
          onClick={handleOpen}
        >
          Delete Course
        </button>
        <button
          className="absolute right-4 top-4 rounded-md bg-slate-950 px-4 py-2 text-sm text-white transition hover:border-2 hover:border-black hover:bg-white hover:text-black"
          onClick={handleModalOpen}
        >
          Edit
        </button>
      </div>
      {isDraftCourse && (
        <div className="mb-6 flex flex-col items-center gap-2 text-center">
          <button
            className="rounded-md bg-emerald-700 px-5 py-2 text-sm font-medium text-white transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-500 disabled:hover:bg-slate-300"
            onClick={handleSubmitForReview}
            disabled={!canSubmitForReview || isSubmittingReview}
          >
            {isSubmittingReview ? "Submitting..." : "Submit for Review"}
          </button>
          {!canSubmitForReview && (
            <p className="text-xs text-slate-500">
              Add at least one topic and one assessment before submitting this course for review.
            </p>
          )}
        </div>
      )}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {metrics.map((metric, index) => (
          <div
            key={index}
            className="rounded-[20px] border border-slate-200 bg-white p-4 shadow-sm"
          >
            <p className="text-[11px] uppercase tracking-[0.18em] text-slate-500">
              {metric.label}
            </p>
            <h2 className="mt-3 text-2xl font-semibold text-slate-950">
              {metric.value}
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              {metric.helper}
            </p>
          </div>
        ))}
      </div>
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
