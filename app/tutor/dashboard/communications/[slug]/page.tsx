"use client";
import React from "react";
import Image from "next/image";
import TutorNav from "@/components/Tutor/dashboard/tutor-nav";

const CommunicationsPage = ({ params }: { params: { slug: string } }) => {
  const { slug } = params;

  const subOptionsContent: { [key: string]: JSX.Element } = {
    QandA: (
      <div className="items-center justify-center cursor-pointer">
        <div className="flex flex-col items-center justify-center mt-20 px-4 sm:px-0">
          <Image src="/QandA.svg" alt="QandA" width={300} height={300} />
          <h1 className="text-2xl sm:text-2xl font-bold mt-6 mb-4 text-center">
            No questions yet
          </h1>
          <h1 className="text-gray-500 text-sm sm:text-base text-center">
            Q&A is a form where your students can ask
          </h1>
          <h1 className="text-gray-500 text-sm sm:text-base text-center">
            questions, hear your responses and respond to one
          </h1>
          <h1 className="text-gray-500 text-sm sm:text-base text-center">
            another. Here is where you will see your courses Q&A threads
          </h1>
        </div>
      </div>
    ),

    Messages: (
      <div className="items-center justify-center">
        <div className="flex flex-col items-center justify-center mt-20">
          <Image src="/QandA.svg" alt="QandA" width={300} height={300} />
          <h1 className="text-2xl font-bold mt-6 mb-4">No new messages</h1>
          <h1 className="text-gray-500 text-sm">
            Direct messages are for you to communicate with
          </h1>
          <h1 className="text-gray-500 text-sm">
            your students or other instructors privately. Heres
          </h1>
          <h1 className="text-gray-500 text-sm">
            where you will learn to use them.
          </h1>
        </div>
      </div>
    ),
    Assignments: (
      <div className="items-center flex flex-col justify-center ">
        <div className="flex flex-col sm:flex-row justify-between items-center cursor-pointer w-full mb-4">
          <div className="flex gap-2 sm:mt-0 mt-10 items-center mb-2 sm:mb-0 sm:ml-8">
            <input
              type="checkbox"
              className="appearance-none border border-black  h-4 w-4 mr-1 "
            />

            <label className="font-semibold">Unread(0)</label>
            <h1 className="ml-10 font-medium">Sortby: Newest First</h1>
            <Image src="/dropdown.svg" alt="dropdown" width={10} height={10} />
          </div>

          <div className=" bg-black sm:mt-0 mt-7 justify-center sm:justify-end rounded-lg items-center p-3 w-[250px] sm:w-1/5 flex gap-4">
            <Image src="/plus.svg" alt="plus" width={30} height={30} />
            <h1 className="text-white">New Assignment</h1>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center mt-10">
          <Image src="/assigments.svg" alt="QandA" width={300} height={300} />
          <h1 className="text-2xl font-bold mt-6 mb-4">No results</h1>
          <h1 className="text-gray-500">Try a different filter </h1>
        </div>
      </div>
    ),
    Announcements: (
      <div className="items-center justify-center ">
        <div className="flex flex-col items-center justify-center mt-20">
          <Image src="/QandA.svg" alt="QandA" width={300} height={300} />
          <h1 className="text-2xl font-bold mt-6 mb-4">No announcements yet</h1>
          <h1 className="text-gray-500 max-md:text-[15px] ">
            Here is where you send your students a few email
          </h1>
          <h1 className="text-gray-500  max-md:text-[15px]">
            announcements every month. Use educational
          </h1>
          <h1 className="text-gray-500  max-md:text-[15px]">
            emails to support your students learning.
          </h1>
        </div>
      </div>
    ),
  };

  const content = subOptionsContent[slug as string];

  if (!content) {
    return <div>Sub-option not found</div>;
  }

  return (
    <div className="pt-5 max-md:pl-6">
      <TutorNav />
      <h1 className="text-3xl font-bold sm:mt-6 sm:pt-0 pt-20 sm:ml-8 sm:mb-5">
        {slug}
      </h1>
      {content}
    </div>
  );
};

export default CommunicationsPage;
