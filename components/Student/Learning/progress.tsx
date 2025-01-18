import React, {useState, useEffect} from "react";
import ProductCard from "../courseCards/courseCards";
import { useFetchCourses } from "@/hooks/useCourses";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { message } from "antd";
import Image from "next/image";
import { ClockIcon, StarFilledIcon } from "@radix-ui/react-icons";
import api from "@/lib/axios";
import { useAuthContext } from "@/Context/AuthContext";
import { useFetchAllResults } from "@/hooks/useCourseTopics";
import { useFetchOverview } from "@/hooks/useCourseOverview";
import { useParams, useSearchParams } from "next/navigation";


const Progress = () => {
   const { user } = useAuthContext();
  const userId = user?.id;
  const { slug } = useParams();
  
  const { data, isLoading, error } = useFetchCourses();
  const [progress, setProgress] = useState(0);
  const { data: allTestResults, isLoading: resultsLoading, error: resultsError } = useFetchAllResults(Number(userId));
    const { data: topicsData, isLoading:  topicsLoading, error: topicsError } = useFetchOverview(Number(slug));
  
  
  const allCourses = data?.data;
  
 useEffect(() => {
    const topics = topicsData?.data?.attributes?.topicname?.data || [];
    const results = allTestResults?.data || [];

    if (!topics.length || !results.length) {
      setProgress(0);
      return;
    }

    const completedTopics = topics.filter((topic: any) => {
      const topicResults = results.filter(
        (result: any) => result.attributes.topic.data.id === topic.id
      );

      if (topicResults.length === 0) {
        return false;
      }

      const bestResult = topicResults.reduce((max: any, current: any) => {
        return current.attributes.score > max.attributes.score ? current : max;
      });

      const testPassmark = parseInt(
        bestResult.attributes.test.data.attributes.passmark,
        10
      );

      const passed = bestResult.attributes.score >= testPassmark;

      return passed;
    });

    const calculatedProgress = (completedTopics.length / topics.length) * 100;

    setProgress(calculatedProgress);
  }, [topicsData, allTestResults]);

  if (isLoading) {
    return (
      <div>
        <h2 className="text-lg font-300 my-4 ">
          <Skeleton
            width={200}
            height={24}
            baseColor="#e0e0e0"
            highlightColor="#f0f0f0"
          />
        </h2>

        <div>
          <Skeleton
            height={300}
            count={3}
            baseColor="#e0e0e0"
            highlightColor="#f5f5f5"
            enableAnimation={true}
          />
        </div>
      </div>
    );
  }

  if (error) {
    message.error("Error fetching liked courses. Please try again later.");
  }

  if (!allCourses || allCourses.length === 0) {
    return (
      <p className="font-semibold flex items-center justify-center p-20 text-[20px]">
        Start watching topic videos to track your course progress.
      </p>
    );
  }

  return (
    <div className="mr-4 pb-10 sm:pb-0 h-full grid grid-cols-3 gap-6 mt-10">
      {data?.data?.map((course: any) => {
        const { id , card} = course;
        const imageUrl = course?.attributes?.card?.data?.attributes?.url;
        const tutorname = course?.attributes?.tutor?.data?.attributes?.tutorname

        return (
          <div key={id} className="border border-gray-400">
            <div className="rounded-lg flex relative overflow-hidden h-[180px]">
              <Image
                src={
                  imageUrl ? `${api.defaults.baseURL}${imageUrl}` : "/cake.svg"
                }
                alt={course?.attributes?.alternativeText || "Course Image"}
                fill
                className="object-cover object-center p-1"
              />

              <div className="flex items-center absolute justify-between p-2 w-full">
                <p className="text-black bg-white px-4 py-0 rounded-full">
                  Free
                </p>
              </div>
            </div>

            <div className="p-2 bg-[#F3F4F3] cursor-pointer text-black">
              <div className="mb-4 sm:h-[30px] h-[50px]">
                <h3 className="font-semibold line-clamp-2 text-ellipsis">
                  {course.attributes.coursename || "Course Name"}
                </h3>
              </div>
              <div className="flex items-center mb-4">
                <p>{tutorname || "dragule swaib"}</p>
              </div>
              <div className="w-full  bg-gray-300 rounded-full h-[20px] border border-black relative">
            <div
              className="bg-gray-700 h-[18px] rounded-full "
              style={{ width: `${progress}%` }}
            ></div>
            <div className="absolute inset-0 flex items-center justify-center text-white text-sm font-bold">
              {progress}%
            </div>
          </div>
              <div className="flex justify-between mt-3 gap-2 text-[0.8rem]">
                <div className="flex gap-1">
                  <StarFilledIcon className="w-4 h-4 text-black" />
                  <p>{course.attributes.rating}</p>
                </div>
                <div className="flex gap-1">
                  <ClockIcon className="w-4 h-4 text-black" />
                  <p>{course.attributes.duration}</p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Progress;
