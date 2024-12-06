"use client";
import React from "react";
import Image from "next/image";
import { useFetchCommunityDetails } from "@/hooks/useCommunity";
import api from "@/lib/axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { message } from "antd";
import { useFetchCategory } from "@/hooks/useCourseUpload";
const Community = () => {
  const { data, isLoading, error } = useFetchCommunityDetails();
  const {
    data: category,
    isLoading: categoryLoading,
    error: categoryError,
  } = useFetchCategory();
  const categoryData = category?.data;
  if (isLoading || categoryLoading) {
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

  if (error ) {
    message.error("Error fetching community details. Please try again later.");
  }
  if (categoryError) {
    message.error("Error fetching course categories.");
  }
 
  return (
    <div className="flex sm:flex-row flex-col gap-10 mt-10 w-full">
      <div className="sm:w-[80%]">
        {data?.data?.map((member: any, index: number) => {
          const {
            Question,
            nameofquestioner,
            nameofresponder,
            response,
            responserpicture,
          } = member.attributes;

          const responderImage = responserpicture?.data?.attributes?.url;
          const ImageUrl = responderImage
            ? `${api.defaults.baseURL}${responderImage}`
            : "/Ellipse 445.webp";
          return (
            <div
              key={index}
              className="flex flex-col border mb-5 rounded-lg py-6 border-black h-auto"
            >
              <div className="flex flex-col pl-3 border-b pb-2 border-gray-400">
                <h1 className="font-semibold">
                  Question: <span className="font-normal"> {Question}</span>
                </h1>
                <p className="text-gray-500">{nameofquestioner}</p>
              </div>
              <div className="flex mt-5 relative items-center pl-3">
                <div className="h-[70px] w-[70px] relative">
                  <Image
                    src={ImageUrl}
                    alt={nameofresponder}
                    fill
                    className="rounded-full"
                  />
                </div>
                <p className="pl-3">{nameofresponder}</p>
              </div>
              <h1 className="mt-5 pl-3">{response}</h1>
              <p className="text-gray-400 pl-3 underline cursor-pointer sm:mt-0 mt-2 hover:text-blue-500">
                See more responses
              </p>
            </div>
          );
        })}
      </div>
      <div className="sm:w-[20%] h-auto border border-black">
        <div className="flex flex-col">
          <h1 className="bg-gray-300 p-3">Course Categories</h1>
          <div className="p-2">
           {categoryData?.map((category: any, index: number) => {
            return (
               <div key={index} className="flex items-center mb-2">
                 <h2>{category.attributes.coursecategories}</h2>
               </div>
             );
           })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;
