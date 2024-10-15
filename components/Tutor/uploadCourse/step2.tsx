import React, { useState } from "react";
import Image from "next/image";
import TopicForm from "./topicForm";
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
    <div className="sm:p-4">
      {topics.map((topic, index) => (
        <TopicForm
          key={index}
          name={topic}
          deleteTopic={() => deleteTopic(index)}
        />
      ))}
        <div className="border border-gray w-full mt-6 p-3">
          <div
            className="w-full bg-gray-200 sm:h-[90px] h-[70px] cursor-pointer flex items-center justify-center gap-2"
            onClick={addTopic}
          >
            <Image src="/pluss.svg" alt="pluss" width={20} height={20} />
            <p >Add your topics</p>
          </div>
        </div>
      </div>
  );
};

export default Step2;
