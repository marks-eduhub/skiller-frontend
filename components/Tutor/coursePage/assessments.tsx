import React, { useState } from "react";
import Image from "next/image";

const Assessments = () => {
  const quizzes = [
    "Quiz 1: (Quiz Title)",
    "Quiz 2: (Quiz Title)",
    "Quiz 3: (Quiz Title)",
    "Quiz 4: (Quiz Title)",
    "Quiz 5: (Quiz Title)",
    "Quiz 6: (Quiz Title)",
    "Quiz 7: (Quiz Title)",
    "Quiz 8: (Quiz Title)",
  ];
  const Challenges = [
    "Challenge 1: (Challenge Title)",
    "Challenge 2: (Challenge Title)",
    "Challenge 3: (Challenge Title)",
    "Challenge 4: (Challenge Title)",
    "Challenge 5: (Challenge Title)",
  ];
  const Tests = [
    "Test 1: (Test Title)",
    "Test 2: (Test Title)",
    "Test 3: (Test Title)",
    "Test 4: (Test Title)",
    "Test 5: (Test Title)",
  ];
  const [isDown, setIsDown] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isArrowOpen, setIsArrowOpen] = useState(false);
  const toggleArrow = () => {
    setIsArrowOpen(!isArrowOpen);
  };
  const toggleDown = () => {
    setIsDown(!isDown);
  };
  const toggleQuizList = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative w-full bg-[#E7E8EA] px-4 pt-4 pb-6 border border-gray-300">
      <div className="relative w-full ">
        <div
          className={`${
            isOpen ? "bg-gray-300" : "w-full h-[90px]  bg-gray-700"
          }`}
        >
          <div className=" flex items-center justify-between p-6">
            <h1 className={isOpen ? "text-black" : "text-white"}>
              Quizzes: {isOpen ? quizzes.length : 20}
            </h1>
            <div onClick={toggleQuizList} className="cursor-pointer">
              <Image
                src="/drop.svg"
                alt="toggle"
                width={20}
                height={20}
                className={`transition-transform duration-200 transform ${
                  isOpen ? "rotate-180 " : ""
                }`}
              />
            </div>
          </div>
        </div>
        {isOpen && (
          <div className="bg-gray-100 p-4 space-y-2">
            {quizzes.map((quiz, index) => (
              <div
                key={index}
                className="bg-gray-300 p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-2 sm:space-y-0"
              >
                <span className="text-black sm:text-base text-sm">{quiz}</span>
                <div className="flex items-center space-x-2">
                  <div className="bg-gray-700 text-white px-3 py-2 rounded flex items-center cursor-pointer sm:text-base text-sm">
                    <Image src="/plus.svg" alt="plus" width={15} height={15} />
                    <span className="ml-2 font-semibold">Add Content</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="relative w-full mt-10">
        <div className="h-[90px] bg-gray-700">
          <div className="flex items-center justify-between p-6">
            <h1 className="text-white">Tests:{isDown ? Tests.length : 15} </h1>
            <div className="flex items-center">
              {isDown && (
                <div className="flex flex-row bg-black p-4 rounded-xl mr-4 gap-2 items-center">
                  <Image src="/plus.svg" alt="plus" width={30} height={30} />
                  <h1 className="text-white">New Assignment</h1>
                </div>
              )}
              <Image
                src="/drop.svg"
                alt="plus"
                width={20}
                height={20}
                onClick={toggleDown}
                className={`transition-transform duration-200 transform cursor-pointer ${
                  isDown ? "rotate-180" : ""
                }`}
              />
            </div>
          </div>
        </div>
        {isDown && (
          <div
            className="p-4 space-y-2"
            style={{ backgroundImage: `url("/cake.svg")` }}
          >
            {Tests.map((test, index) => (
              <div
                key={index}
                className="bg-[#1a1b1ab0] p-4 flex justify-between items-center"
              >
                <span className="text-white">{test}</span>
                <div className="flex items-center space-x-2">
                  <div className="bg-white text-gray-800 px-3 py-1 rounded flex items-center cursor-pointer">
                    <Image src="/pluss.svg" alt="plus" width={10} height={10} />
                    <span className="ml-2 text-sm font-semibold">Content</span>
                  </div>
                  <Image src="/drop.svg" alt="toggle" width={15} height={15} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="relative w-full mt-10">
        <div className="relative h-[90px] bg-gray-700">
          <div className=" flex items-center justify-between p-6">
            <h1 className="text-white">
              Challenges: {isArrowOpen ? Challenges.length : 10}
            </h1>
            <Image
              src="/drop.svg"
              alt="plus"
              width={20}
              height={20}
              onClick={toggleArrow}
              className={`transition-transform duration-200 transform ${
                isArrowOpen ? "rotate-180" : ""
              }`}
            />
          </div>
        </div>
        {isArrowOpen && (
          <div className="p-4 space-y-2 bg-gray-700">
            {Challenges.map((challenge, index) => (
              <div
                key={index}
                className="bg-[#1a1b1ab0]   p-4 flex justify-between items-center"
              >
                <span className="text-white">{challenge}</span>
                <div className="flex items-center space-x-2">
                  <div className="bg-white text-gray-800 px-3 py-1 rounded flex items-center cursor-pointer">
                    <Image src="/pluss.svg" alt="plus" width={10} height={10} />
                    <span className="ml-2 text-sm font-semibold">Content</span>
                  </div>
                  <Image src="/drop.svg" alt="toggle" width={15} height={15} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="w-full h-[90px] mt-4 gap-2 bg-gray-300  flex items-center justify-center cursor-pointer">
        <Image src="/pluss.svg" alt="plus" width={20} height={20} />
        <h1 className="text-black sm:text-[20px]">
          Add a quiz, test or challenge
        </h1>
      </div>
    </div>
  );
};

export default Assessments;
