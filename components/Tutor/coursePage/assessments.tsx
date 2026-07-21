import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useFetchCourseTopics } from "@/hooks/useCourses";
import { useParams } from "next/navigation";
import QuizModal from "./testModal";

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
    <div className="relative w-full bg-[#E7E8EA] px-4 pt-4 pb-6 border border-gray-300">
      <div className="relative w-full mt-10">
        {topicData?.data
          ?.filter(
            (topic: any) => topic.attributes?.topic_tests?.data?.length > 0
          )
          .map((topic: any, index: number) => (
            <div key={index} className="mb-6">
              <div className="h-[90px] bg-gray-700">
                <div className="flex items-center justify-between p-6">
                  <h1 className="text-white mb-5">
                    {topic.attributes?.topicname}
                  </h1>
                  <div className="flex items-center">
                    <Image
                      src="/drop.svg"
                      alt="toggle"
                      width={20}
                      height={20}
                      onClick={() => toggleDown(topic.id)}
                      className={`transition-transform duration-200 transform cursor-pointer ${
                        isDown[topic.id] ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                </div>
              </div>

              {isDown[topic.id] && (
                <div className="p-4 space-y-6">
                  {topic.attributes?.topic_tests?.data.map(
                    (test: any, index: number) => (
                      <div
                        key={index}
                        className="bg-[#1a1b1ab0]  p-4 flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-3 sm:space-y-0 rounded-lg"
                      >
                        <div className="text-white flex flex-col sm:flex-row sm:items-center sm:space-x-4">
                          <span className="sm:mb-0 mb-2">
                            {test.attributes?.testname}
                          </span>
                          <span className="sm:text-sm text-white">
                            {test.attributes?.testdescription}
                          </span>
                        </div>

                        <div className="flex justify-end sm:justify-start">
                          <div
                            className="bg-white text-gray-800 px-3 py-1 rounded flex items-center cursor-pointer hover:bg-gray-200 transition"
                            onClick={() => handleModalOpen(test.id, topic.id)}
                          >
                            <Image
                              src="/pluss.svg"
                              alt="plus"
                              width={10}
                              height={10}
                            />
                            <span className="ml-2 text-sm font-semibold">
                              View Test
                            </span>
                          </div>
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
        <div className="w-full h-[90px] mt-4 gap-2 bg-gray-300 flex items-center justify-center cursor-pointer">
          <Image src="/pluss.svg" alt="plus" width={20} height={20} />
          <h1 className="text-black sm:text-[20px]">Add a quiz</h1>
        </div>
      </Link>

      {modalOpen && selectedTest && (
        <QuizModal
          modalOpen={modalOpen}
          onClose={handleModalClose}
          selectedTest={selectedTest}
        />
      )}
    </div>
  );
};

export default Assessments;
