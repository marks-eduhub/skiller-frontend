"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation"; // Correct import from next/navigation

const CommunicationsPage = ({ params }: { params: { slug: string } }) => {
  const router = useRouter();
  const { slug } = params;

  // Define content for each sub-option
  const subOptionsContent: { [key: string]: JSX.Element } = {
    QA: (
      <div className="items-center justify-center">
        <div className="flex flex-col items-center justify-center mt-7">
          <Image src="/QandA.svg" alt="QandA" width={300} height={300} />
          <h1 className="text-2xl font-bold mt-6 mb-4">No questions yet</h1>
          <h1 className="text-gray-500">
            Q&A is a form where your students can ask
          </h1>
          <h1 className="text-gray-500">
            questions, hear your responses and respond to one
          </h1>
          <h1 className="text-gray-500">
            another. Here is where you will see your coursess Q&A threads
          </h1>
        </div>
      </div>
    ),

    Messages: (
      <div className="items-center justify-center">
        <div className="flex flex-col items-center justify-center mt-7">
          <Image src="/QandA.svg" alt="QandA" width={300} height={300} />
          <h1 className="text-2xl font-bold mt-6 mb-4">No new messages</h1>
          <h1 className="text-gray-500">
            Direct messages are for you to communicate with
          </h1>
          <h1 className="text-gray-500">
            your students or other instructors privately. Heres
          </h1>
          <h1 className="text-gray-500">where you will learn to use them.</h1>
        </div>
      </div>
    ),
    Assignments: (
      <div className="items-center justify-center">
        <div className="flex ">
            <div className="flex gap-1 ml-8 ">
            <input type="checkbox"  />
        
            <label className="font-semibold">Unread(0)</label>
            </div>
            <div className="ml-10">
                <h1>Sortby: Newest First</h1>
            </div>
        </div>
        <div className="flex flex-col items-center justify-center mt-7">
          <Image src="/assigments.svg" alt="QandA" width={300} height={300} />
          <h1 className="text-2xl font-bold mt-6 mb-4">No results</h1>
          <h1 className="text-gray-500">Try a different filter </h1>
        </div>
      </div>
    ),
    Announcements: (
      <div className="items-center justify-center">
        <div className="flex flex-col items-center justify-center mt-7">
          <Image src="/QandA.svg" alt="QandA" width={300} height={300} />
          <h1 className="text-2xl font-bold mt-6 mb-4">No announcements yet</h1>
          <h1 className="text-gray-500">
            Here is where you send your students a few email
          </h1>
          <h1 className="text-gray-500">
            announcements every month. Use educational
          </h1>
          <h1 className="text-gray-500">
            emails to support your students learning.
          </h1>
        </div>
      </div>
    ),
  };

  // Check if the selected sub-option exists in subOptionsContent
  const content = subOptionsContent[slug as string];

  if (!content) {
    return <div>Sub-option not found</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mt-6 ml-8 mb-10">{slug}</h1>
      {content}
    </div>
  );
};

export default CommunicationsPage;
