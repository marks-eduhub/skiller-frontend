"use client";
import React, { useState } from "react";
import Image from "next/image";
import { TriangleDownIcon } from "@radix-ui/react-icons";
import Topic from "./topic";
import TutorNav from "../dashboard/tutor-nav";

const CourseUpload = () => {
  const [topics, setTopics] = useState<string[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const addTopic = () => {
    setIsAdding(true);
    setShowForm(true);
    setTopics([...topics, `Topic ${topics.length + 1}`]);
  };

  return (
    <div className="p-4">
      <div className="w-full sm:mt-2 flex items-center justify-between">
        <h1 className="font-semibold text-[20px] sm:flex hidden">Upload Course</h1>
        <div className="justify-end">
          <TutorNav />
        </div>
      </div>

      <div className="flex sm:mt-7 mt-20 mb-5 sm:justify-end justify-between">
        <h1 className="font-semibold text-[20px] sm:hidden">Upload Course</h1>
        <div className="flex gap-2 bg-black w-[180px] h-[40px] px-4 py-2 items-center justify-center rounded-lg sm:mt-0">
          <p className="text-white">Save</p>
          <TriangleDownIcon className="w-6 h-6 text-white mr-2" />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:justify-between my-5 space-y-4 sm:space-y-0 sm:space-x-4">
        <div className="flex-1">
          <label htmlFor="name" className="block font-semibold mb-1">Name:</label>
          <input
            type="text"
            id="name"
            required
            placeholder="Baking 101"
            className="w-full rounded-lg px-3 py-2 border border-black focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="flex-1">
          <label htmlFor="description" className="block font-semibold mb-1">Description:</label>
          <input
            type="text"
            id="description"
            required
            placeholder="In this course, we will cover..."
            className="w-full rounded-lg px-3 py-2 border border-black focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      <div className="flex flex-col">
        <h1 className="font-semibold">Topics</h1>
        <div className="flex gap-2 items-center">
          <Image src="/bulb.svg" alt="light" width={15} height={15} />
          <p>Tip: courses are made of topics</p>
        </div>
      </div>

      {topics.length === 0 && !isAdding && (
        <p className="font-bold items-center justify-center flex text-[20px] mt-10">No topics! Create one.</p>
      )}

      {topics.map((topic, index) => (
        <Topic key={index} name={topic} />
      ))}

      <div className="flex mt-7 mb-5 justify-end">
        <div
          onClick={addTopic}
          className="flex gap-2 bg-black w-[180px] h-[40px] px-9 py-7 items-center justify-center rounded-lg cursor-pointer"
        >
          <Image src="/plus.svg" alt="add topic" width={20} height={20} />
          <p className="text-white">Add topic</p>
        </div>
      </div>
    </div>
  );
};

export default CourseUpload;
