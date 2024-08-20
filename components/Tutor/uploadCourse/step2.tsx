"use client";
import React, { useState } from "react";
import Image from "next/image";

import Step from "./step";

const Step2 = () => {
  const [topics, setTopics] = useState<string[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  

  const addTopic = () => {
    setIsAdding(true);
    setShowForm(true);
    setTopics([...topics, `Topic ${topics.length + 1}`]);
  };
  const deleteTopic = (indexToDelete: number) => {
    setTopics(topics.filter((topic, index) => index !== indexToDelete));
  };

  return (
    <div className="p-4">
     {topics.length === 0 && !isAdding && (
        <p className="font-bold items-center justify-center flex text-[20px] mt-10">
          No topics! Create one.
        </p>
      )}

      {topics.map((topic, index) => (
        <Step
          key={index}
          name={topic}
          deleteTopic={() => deleteTopic(index)}
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

export default Step2;
