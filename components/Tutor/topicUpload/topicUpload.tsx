"use client";
import React, { useState } from "react";
import Image from "next/image";
import TutorNav from "../dashboard/tutor-nav";
import TopicForm from "./topicform";


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
  const [selectedTopicIndex, setSelectedTopicIndex] = useState<number | null>(
    null
  );

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

    setTopics((prev) => {
      const newTopics = [...prev, newTopic];
      setSelectedTopicIndex(newTopics.length - 1);
      return newTopics;
    });
  };

  const handleFieldChange = (
    index: number,
    field: keyof Topic,
    value: string | File | null
  ) => {
    const updatedTopics = [...topics];
    updatedTopics[index] = {
      ...updatedTopics[index],
      [field]: value,
    };
    setTopics(updatedTopics);

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

      {topics.map((topic, index) => (
        <TopicForm
          key={index}
          topic={topic}
          onFieldChange={(field, value) =>
            handleFieldChange(index, field, value)
          }
        />
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

export default TopicUpload;
