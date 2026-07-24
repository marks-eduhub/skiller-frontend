import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useFetchCourseTopics } from "@/hooks/useCourses";
import { useParams } from "next/navigation";
import QuizModal from "./testModal";
import { stripHtmlTags } from "@/lib/utility";

const Assessments = () => {
  const { slug } = useParams();
  const courseId = String(slug);
  const { data: topicData } = useFetchCourseTopics(courseId);
  const [isDown, setIsDown] = useState<{ [key: number]: boolean }>({});

  const toggleDown = (topicId: number) => {
    setIsDown((prev) => ({
      ...prev,
      [topicId]: !prev[topicId],
    }));
  };

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTest, setSelectedTest] = useState<{
    testId: number;
    topicId: number;
  } | null>(null);

  const handleModalOpen = (testId: number, topicId: number) => {
    setSelectedTest({ testId, topicId });
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setSelectedTest(null);
  };

  return (
    <div className="w-full rounded-2xl border border-gray-300 bg-[#E7E8EA] p-3 sm:p-4">
      <div className="flex flex-col gap-2.5">
        {topicData?.data
          ?.filter(
            (topic: any) => topic.attributes?.topic_tests?.data?.length > 0
          )
          .map((topic: any, index: number) => (
            <div key={index} className="w-full min-w-0 overflow-hidden rounded-xl bg-gray-700">
              <div
                onClick={() => toggleDown(topic.id)}
                className="flex min-w-0 cursor-pointer items-center justify-between gap-3 px-4 py-3 transition hover:bg-gray-600 sm:px-5"
              >
                <h1 className="min-w-0 flex-1 truncate text-sm font-medium text-white sm:text-base">
                  {topic.attributes?.topicname}
                </h1>
                <Image
                  src="/drop.svg"
                  alt="toggle"
                  width={18}
                  height={18}
                  className={`shrink-0 transition-transform duration-200 ${
                    isDown[topic.id] ? "rotate-180" : ""
                  }`}
                />
              </div>

              {isDown[topic.id] && (
                <div className="flex flex-col gap-3 p-3 pt-0 sm:p-4 sm:pt-0">
                  {topic.attributes?.topic_tests?.data.map(
                    (test: any, index: number) => (
                      <div
                        key={index}
                        className="flex min-w-0 flex-col gap-3 rounded-lg bg-[#1a1b1ab0] p-3 sm:flex-row sm:items-center sm:justify-between sm:p-4"
                      >
                        <div className="flex min-w-0 flex-col text-white sm:flex-row sm:items-center sm:gap-4">
                          <span className="truncate text-sm font-medium sm:text-base">
                            {test.attributes?.testname}
                          </span>
                          <span className="truncate text-xs text-white/75 sm:text-sm">
                            {stripHtmlTags(test.attributes?.testdescription || "")}
                          </span>
                        </div>

                        <div
                          className="flex shrink-0 cursor-pointer items-center justify-center gap-2 self-start rounded-md bg-white px-3 py-1.5 text-gray-800 transition hover:-translate-y-0.5 hover:shadow-sm sm:self-auto"
                          onClick={() => handleModalOpen(test.id, topic.id)}
                        >
                          <Image
                            src="/pluss.svg"
                            alt="plus"
                            width={10}
                            height={10}
                          />
                          <span className="text-xs font-semibold sm:text-sm">
                            View Test
                          </span>
                        </div>
                      </div>
                    )
                  )}
                </div>
              )}
            </div>
          ))}
      </div>

      <Link href={`/tutor/dashboard/setQuiz?courseId=${courseId}`}>
        <div className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-gray-300 px-4 py-3 cursor-pointer transition hover:-translate-y-0.5 hover:shadow-sm">
          <Image src="/pluss.svg" alt="plus" width={18} height={18} />
          <h1 className="text-sm font-semibold text-black sm:text-base">Add a quiz</h1>
        </div>
      </Link>

      {modalOpen && selectedTest && (
        <QuizModal
          modalOpen={modalOpen}
          onClose={handleModalClose}
          selectedTest={selectedTest}
          courseId={courseId}
        />
      )}
    </div>
  );
};

export default Assessments;
