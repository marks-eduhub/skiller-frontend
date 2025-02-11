"use client";
import React, { useState } from "react";
import Image from "next/image";
import TutorNav from "../dashboard/tutor-nav";
import Step2 from "../uploadCourse/step2";

interface Topic {
  id: number | null;
  topicname: string;
  topicdescription: string;
  resourceInstructions: string;
  topicExpectations: string;
  duration: string;
  topicResources: any;
  topicVideo: any;
  topicresource: string;
  topicexpectation: string;
  topicduration: string;
  instructions: string;
  videoFile: File | null;
  resourceFile: File | null;
}

const TopicUpload = () => {
  const [topics, setTopics] = useState<Topic[]>([]);

  const addTopic = () => {
    const newTopic: Topic = {
      id: null,
      topicname: `Topic ${topics.length + 1}`,
      topicdescription: "",
      resourceInstructions: "",
      topicExpectations: "",
      duration: "",
      topicResources: null,
      topicVideo: null,
      topicresource: "",
      topicexpectation: "",
      topicduration: "",
      instructions: "",
      videoFile: null,
      resourceFile: null,
    };

    setTopics([...topics, newTopic]);
  };

  const updateTopic = (index: number, updatedFields: Partial<Topic>) => {
    setTopics((prev) =>
      prev.map((topic, i) => (i === index ? { ...topic, ...updatedFields } : topic))
    );
  };

  return (
    <div className="p-4">
      <div className="w-full sm:mt-2 flex items-center justify-between">
        <h1 className="font-semibold text-[20px] sm:flex hidden">
          Upload Course
        </h1>
        <div className="justify-end">
          <TutorNav />
        </div>
      </div>

      <div className="flex sm:mt-7 mt-20 mb-5 sm:justify-end justify-between">
        <h1 className="font-semibold text-[20px] sm:hidden">Upload Course</h1>
      </div>

      <div className="flex flex-col">
        <h1 className="font-semibold">Topics</h1>
        <div className="flex gap-2 items-center">
          <Image src="/bulb.svg" alt="light" width={15} height={15} />
          <p>Tip: courses are made of topics</p>
        </div>
      </div>

      <Step2 topics={topics} setTopics={setTopics} addTopic={addTopic} updateTopic={updateTopic} />

    </div>
  );
};

export default TopicUpload;
