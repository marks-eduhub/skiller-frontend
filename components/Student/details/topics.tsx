import { useFetchOverview } from "@/hooks/useCourseOverview";
import { Topic } from "@/lib/types";
import { useParams } from "next/navigation";
import Link from "next/link";
import React from "react";
import { CiShare2 } from "react-icons/ci";
import { message } from "antd";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const TopicsCard: React.FC = () => {
  const { slug } = useParams();
  const { data: topicsData, isLoading, error } = useFetchOverview(Number(slug));

  if (isLoading) {
    return (
      <div>
        <h2 className="rounded-lg my-4 ">
          <Skeleton
            width={350}
            height={500}
            baseColor="#e0e0e0"
            highlightColor="#f0f0f0"
            enableAnimation={true}
          />
        </h2>
      </div>
    );
  }

  if (error) {
    message.error("Error fetching course topics. Please try again later.");
  }

  const topics = topicsData?.data?.attributes?.topicname?.data || [];
  const total = topics.length;
  

  return (
    <div>
      <div className="max-md:hidden rounded-lg h-[500px] flex flex-col overflow-y-auto scroll bg-gray-900 ">
        <div className="sm:p-4 ">
          <h2 className="text-xl text-right font-bold text-white max-md:mr-4">
            {total} Topics
          </h2>
        </div>
        <ul className="p-4 flex flex-col">
          {topics?.map((topic: Topic, index: number) => (
            <Link
              key={topic.id}
              href={`/dashboard/overview/${slug}/topics?topicId=${topic.id}`}
            >
              <li className="flex justify-between items-center px-4 py-[14px] rounded hover:bg-zinc-600 transition duration-300 ease-in-out">
                <span className="text-white">{`${index + 1}. ${
                  topic.attributes.name
                }`}</span>
                <span className="text-white ml-auto">
                  {topic.attributes.duration}
                </span>
              </li>
            </Link>
          ))}
        </ul>
      </div>
      <div className="flex items-center gap-3 sm:mt-6 w-full justify-between">
        <div className="flex flex-col">
          <div className="flex items-center justify-between font-bold">
            <h2>Progress</h2>
            <span>30%</span>
          </div>
          <div className="mt-1 flex flex-row space-x-4 items-center">
            <div className="sm:w-48 w-60 h-4 bg-gray-300 flex flex-row">
              <div
                className="h-full bg-[#1C4E85]"
                style={{ width: "30%" }}
              ></div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 mt-4 font-bold">
          <CiShare2 className="ml-2 text-[20px]" />
          <h1>Share</h1>
        </div>
      </div>
    </div>
  );
};

export default TopicsCard;
