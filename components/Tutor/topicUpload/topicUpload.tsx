"use client";
import React, { useState } from "react";
import Image from "next/image";
import TutorNav from "../dashboard/tutor-nav";
import Step2 from "../uploadCourse/step2";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useRouter } from "next/navigation";
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
  const router = useRouter();
  const [isTopicUploaded, setIsTopicUploaded] = useState(false);

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
      prev.map((topic, i) =>
        i === index ? { ...topic, ...updatedFields } : topic
      )
    );
  };
  const handleBack = () => {
    router.back();
  };
  return (
    <div className="p-4">
      <div className="w-full sm:mt-2 flex items-center justify-between">
        <div className="flex sm:gap-4 gap-6 sm:mt-4 mt-0 ">
          <IoMdArrowRoundBack
            className="text-[30px] sm:mt-2 mt-2 cursor-pointer"
            onClick={handleBack}
          />

          <h1 className="font-semibold mt-2 text-[20px] sm:flex hidden">
            Upload Topic
          </h1>
        </div>
        <div className="justify-end">
          <TutorNav />
        </div>
      </div>

      <div className="flex sm:gap-10 gap-6 sm:mt-4 mt-12 mb-10 sm:hidden ">
          <IoMdArrowRoundBack
            className="text-[30px] sm:mt-2 mt-2 cursor-pointer"
            onClick={handleBack}
          />
        <h1 className="font-semibold mt-2 text-[20px] ">Upload Topic</h1>
      </div>

      <div className="flex flex-col sm:ml-2 sm:mt-10">
        <h1 className="font-semibold">Topics</h1>
        <div className="flex gap-2 items-center">
          <Image src="/bulb.svg" alt="light" width={15} height={15} />
          <p>Tip: courses are made of topics</p>
        </div>
      </div>

      <Step2
        topics={topics}
        setTopics={setTopics}
        addTopic={addTopic}
        updateTopic={updateTopic}
        setIsTopicUploaded={setIsTopicUploaded} 

      />
    </div>
  );
};

export default TopicUpload;
