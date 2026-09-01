import { useFetchTopicDetails } from "@/hooks/useCourseTopics";
import { message } from "antd";
import { useSearchParams } from "next/navigation";
import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import RichContent from "@/components/ui/richContent";
import { hasRichContent } from "@/lib/richText";

const Description = () => {
  const searchParams = useSearchParams();
  const topicId = searchParams.get("topicId");
  const { data, isLoading, error } = useFetchTopicDetails(topicId ?? "");

  if (isLoading) {
    return (
      <div className="px-4 sm:px-6 py-4">
        <Skeleton width={200} height={18} baseColor="#e0e0e0" highlightColor="#f0f0f0" />
        <div className="mt-4">
          <Skeleton count={6} height={14} baseColor="#e0e0e0" highlightColor="#f5f5f5" />
        </div>
      </div>
    );
  }

  if (error) {
    message.error("Error fetching details. Please try again later.");
  }

  const topic = data?.data?.attributes;
  const description = topic?.topicdescription || "";
  const expectations = topic?.topicExpectations || "";

  if (!hasRichContent(description) && !hasRichContent(expectations)) {
    return (
      <div className="px-4 sm:px-6 pb-6">
        <div className="flex items-center justify-center rounded-lg border border-dashed border-gray-300 py-12 text-sm font-medium text-gray-500">
          No learning description available for this topic.
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-6 pb-8">
      {/* Tutors have always filled in "What will the student learn?" - it just
          never had anywhere to appear on the student side. */}
      {hasRichContent(expectations) && (
        <section className="mb-6 rounded-lg border border-gray-200 bg-gray-50 p-4 sm:p-5">
          <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-gray-500">
            What you will learn
          </h3>
          <RichContent html={expectations} className="rich-content--compact" />
        </section>
      )}

      <RichContent html={description} />
    </div>
  );
};

export default Description;
