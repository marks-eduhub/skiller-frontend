import { useFetchTopicResources } from '@/hooks/useTopicResources';
import { useSearchParams } from 'next/navigation';
import React from 'react';
import { BiSolidDownArrow } from 'react-icons/bi';
import Link from "next/link"
import api from '@/lib/axios';
import { message } from 'antd';
import Skeleton from 'react-loading-skeleton';
import "react-loading-skeleton/dist/skeleton.css";

const Resources = () => {
  const searchParams = useSearchParams();
  const topicId = searchParams.get("topicId");
  const { data, isLoading, error } = useFetchTopicResources(Number(topicId));

  const resources = data?.data?.attributes?.resources?.data || [];
 
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
            count={1}
            baseColor="#e0e0e0"
            highlightColor="#f5f5f5"
            enableAnimation={true}
          />
        </div>
      </div>
    );
  }

  if (error) {
    message.error("Error fetching details. Please try again later.");
  }

 

  return (
    <div className="sm:ml-6 sm:mr-6 ">
      <div className="overflow-x-auto">
        {resources?.length > 0 ? (
          resources?.map((resource: any) => (
            <div
              key={resource.id}
              className="h-20 mt-10 bg-gray-700 text-white flex items-center justify-between px-4"
            >
              <Link
                href= {`${api.defaults.baseURL}${resource.attributes.url}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between w-full"
              >
                <h2 className="ml-6">{resource.attributes.name}</h2>
                <BiSolidDownArrow className="text-white mr-6" />
              </Link>
            </div>
          ))
        ) : (
          <div className="p-4 font-bold text-center">No resources available for this topic.</div>
        )}
      </div>
    </div>
  );
};

export default Resources;
