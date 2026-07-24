import { useFetchTopicResources } from '@/hooks/useTopicResources';
import { useSearchParams } from 'next/navigation';
import React from 'react';
import { HiOutlineDownload, HiOutlineDocumentText, HiOutlineLink } from 'react-icons/hi';
import Link from "next/link";
import { message } from 'antd';
import Skeleton from 'react-loading-skeleton';
import "react-loading-skeleton/dist/skeleton.css";
import { stripHtmlTags } from '@/lib/utility';

const Resources = () => {
  const searchParams = useSearchParams();
  const topicId = searchParams.get("topicId");
  const { data, isLoading, error } = useFetchTopicResources(Number(topicId));
  const resources = data?.data?.attributes?.topicResources?.data || [];
  const links = data?.data?.attributes?.topicLinks?.data || [];
  const instructions = data?.data?.attributes?.resourceInstructions || "";

  if (isLoading) {
    return (
      <div className="px-4 sm:px-6 py-4">
        <Skeleton width={220} height={18} baseColor="#e0e0e0" highlightColor="#f0f0f0" />
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          <Skeleton height={44} count={4} baseColor="#e0e0e0" highlightColor="#f5f5f5" />
        </div>
      </div>
    );
  }

  if (error) {
    message.error("Error fetching details. Please try again later.");
    return null;
  }

  const hasContent = resources.length > 0 || links.length > 0;

  return (
    <div className="px-4 sm:px-6 pb-6">
      {instructions && (
        <p className="mb-4 text-sm text-gray-600">{stripHtmlTags(instructions)}</p>
      )}

      {hasContent ? (
        <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
          {resources.map((resource: any) => (
            <Link
              key={resource.id}
              href={`${resource.attributes.url}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex min-w-0 items-center justify-between gap-3 rounded-lg border border-gray-200 bg-white px-3 py-2.5 transition hover:-translate-y-0.5 hover:border-gray-400 hover:shadow-sm"
            >
              <span className="flex min-w-0 items-center gap-2.5">
                <HiOutlineDocumentText className="shrink-0 text-lg text-gray-500" />
                <span className="truncate text-sm font-medium text-gray-800">
                  {resource.attributes.name || "Resource"}
                </span>
              </span>
              <HiOutlineDownload className="shrink-0 text-gray-400 transition group-hover:text-gray-700" />
            </Link>
          ))}

          {links.map((link: any) => (
            <Link
              key={link.id}
              href={`${link.attributes.url}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex min-w-0 items-center gap-2.5 rounded-lg border border-gray-200 bg-white px-3 py-2.5 transition hover:-translate-y-0.5 hover:border-gray-400 hover:shadow-sm"
            >
              <HiOutlineLink className="shrink-0 text-lg text-gray-500" />
              <span className="truncate text-sm font-medium text-gray-800">
                {link.attributes.label || "Resource link"}
              </span>
            </Link>
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center rounded-lg border border-dashed border-gray-300 py-10 text-sm font-medium text-gray-500">
          No resources available for this topic.
        </div>
      )}
    </div>
  );
};

export default Resources;
