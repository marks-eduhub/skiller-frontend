import { useFetchTopicDetails } from "@/hooks/useCourseTopics";
import { message } from "antd";
import { useSearchParams } from "next/navigation";
import React from "react";
import { BsBookmarkCheck, BsFillShareFill } from "react-icons/bs";
import "react-loading-skeleton/dist/skeleton.css";
import Skeleton from "react-loading-skeleton";

const Description = () => {
  const searchParams = useSearchParams();
  const topicId = searchParams.get("topicId");
  const { data, isLoading, error } = useFetchTopicDetails(Number(topicId));

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
  const description = data?.data?.attributes?.topicdescription || [];

  return (
    <div className="bg-[#F5F5F5] ">
      <div className="flex flex-col md:flex-row gap-9 pt-9 ">
        <div className="mb-2 sm:ml-3 bg-[#FFF] sm:w-[800px] w-full sm:h-[600px] ml-5 sm:pr-0 pr-4">
          <div className="ml-5 mt-8 mr-3">
            {description?.length > 0 ? (
              description?.map((point: any, index: number) => (
                <div key={index}>
                  {point.type === "paragraph" &&
                    point.children?.map((child: any, childIndex: any) => (
                      <p key={childIndex} className="my-6">
                        {child.text}
                      </p>
                    ))}

                  {point.type === "list" && (
                    <ul
                      className={
                        point.format === "unordered"
                          ? "list-disc ml-6"
                          : "list-decimal ml-6"
                      }
                    >
                      {point?.children?.map(
                        (listItem: any, listItemIndex: any) => (
                          <li key={listItemIndex}>
                            {listItem.children.map(
                              (listItemChild: any, listItemChildIndex: any) => (
                                <span key={listItemChildIndex}>
                                  {listItemChild.text}
                                </span>
                              )
                            )}
                          </li>
                        )
                      )}
                    </ul>
                  )}
                </div>
              ))
            ) : (
              <div className="flex items-center justify-center font-bold p-10">
                <p className="text-[18px]">
                  No learning decsription available.
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col mr-8 pb-10">
          <div className="flex items-center justify-between gap-8 sm:mt-0 mt-20">
            <button className="rounded-t-md  rounded-b-md border border-black bg-white px-8 py-2 ml-5 md:p-20 md:py-2 md:ml-0 hover:bg-gray-600 focus:outline-none flex items-center">
              <BsBookmarkCheck className="text-lg" />
              <span className="ml-2">Save</span>
            </button>
            <button className="rounded-t-md rounded-b-md border border-black bg-white px-8 py-2 md:p-20 md:py-2 hover:bg-gray-600 focus:outline-none flex items-center">
              <BsFillShareFill className="text-lg " />
              <span className="ml-2">Share</span>
            </button>
          </div>

          <div className="bg-[#ffffff8e] flex flex-col justify-center md:w-[570px] h-[500px] items-center mt-7 max-md:w-[320px] max-md:ml-5">
            <h2 className="font-bold">Screenshots go here</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Description;
