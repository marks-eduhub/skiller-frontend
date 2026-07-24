"use client";
import React, { useState } from "react";
import { useParams } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { message } from "antd";
import { useFetchOverview } from "@/hooks/useCourseOverview";
import { useFetchCourseTopics } from "@/hooks/useCourses";
import { submitCourseForReview } from "@/hooks/useCourseUpload";

const SubmitForReview = () => {
  const { slug } = useParams();
  const courseId = String(slug);
  const { data } = useFetchOverview(courseId);
  const { data: topicData } = useFetchCourseTopics(courseId);
  const queryClient = useQueryClient();
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);

  const totalTests = topicData?.data?.reduce(
    (count: any, topic: any) =>
      count + (topic.attributes?.topic_tests?.data?.length || 0),
    0
  );
  const numberOfTests = totalTests || 0;
  const courseStatus = (data?.data?.attributes?.adminStatus || "").toLowerCase();
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

  if (!isDraftCourse) {
    return null;
  }

  return (
    <div className="mb-6 flex flex-col items-center gap-2 text-center">
      <button
        className="rounded-md bg-emerald-700 px-5 py-2 text-sm font-medium text-white transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-500 disabled:hover:bg-slate-300"
        onClick={handleSubmitForReview}
        disabled={!canSubmitForReview || isSubmittingReview}
      >
        {isSubmittingReview ? "Submitting..." : "Submit for Review"}
      </button>
      <p className="text-xs text-slate-500">
        You need at least 1 topic and 1 assessment (test) before this course can be submitted for review.
      </p>
    </div>
  );
};

export default SubmitForReview;
