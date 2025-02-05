import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useFetchCourseTopics } from "@/hooks/useCourses";
import { useParams } from "next/navigation";
const Assessments = () => {
  const { slug } = useParams();
  const courseId = Number(slug);
  const { data: topicData } = useFetchCourseTopics(courseId);
  const totalTests = topicData?.data.reduce(
    (count: any, topic: any) =>
      count + (topic.attributes?.topic_tests?.data?.length || 0),
    0
  );

 const tests = topicData?.data?.flatMap(
    (topic: any) =>
      topic.attributes?.topic_tests?.data.map((test: any) => test.attributes) ||
      []
  ) || [];

  const [isDown, setIsDown] = useState(false);

  const toggleDown = () => {
    setIsDown(!isDown);
  };

  return (
    <div className="relative w-full bg-[#E7E8EA] px-4 pt-4 pb-6 border border-gray-300">
      <div className="relative w-full mt-10">
      {tests.length > 0 && (
          <div className="h-[90px] bg-gray-700">
            <div className="flex items-center justify-between p-6">
              <h1 className="text-white mb-5">{tests.length} Test(s)</h1>
              <div className="flex items-center">
                <Image
                  src="/drop.svg"
                  alt="toggle"
                  width={20}
                  height={20}
                  onClick={toggleDown}
                  className={`transition-transform duration-200 transform cursor-pointer ${
                    isDown ? "rotate-180" : ""
                  }`}
                />
              </div>
            </div>
          </div>
        )}


        {tests.length > 0 ? (
          isDown && (
            <div className="p-4 space-y-2">
              {tests.map((test: any, index: any) => (
                <div
                  key={index}
                  className="bg-[#1a1b1ab0] p-4 flex justify-between items-center"
                >
                  <span className="text-white">{test.testname}</span>
                  <span className="text-white">{test.testdescription}</span>
                  <div className="flex items-center space-x-2">
                    <div className="bg-white text-gray-800 px-3 py-1 rounded flex items-center cursor-pointer">
                      <Image src="/pluss.svg" alt="plus" width={10} height={10} />
                      <span className="ml-2 text-sm font-semibold">
                        View Test
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )
        ) : (
          <div className="p-4 flex justify-center items-center  text-gray-700">No tests available for this course</div>
        )}
      </div>

      <Link href={`/tutor/dashboard/setQuiz?courseId=${courseId}`}>
        <div className="w-full h-[90px] mt-4 gap-2 bg-gray-300 flex items-center justify-center cursor-pointer">
          <Image src="/pluss.svg" alt="plus" width={20} height={20} />
          <h1 className="text-black sm:text-[20px]">Add a quiz</h1>
        </div>
      </Link>
    </div>
  );
};

export default Assessments;
