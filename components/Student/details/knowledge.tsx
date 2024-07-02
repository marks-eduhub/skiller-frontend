import React, { useState } from "react";
import Image from "next/image";
import { tests, quizzes } from "../../../components/Student/details/tabs.json";

const Knowledge = () => {
  const [selectedTab, setselectedTab] = useState("Tests");
  const handleselectedClick = (tabName: string) => {
    setselectedTab(tabName);
  };

  return (
    <div className="flex flex-col rounded-lg ">
      <div className="flex w-full  mb-4 cursor-pointer">
        <div
          className={`bg-gray-300 justify-center items-center flex w-1/2 h-full${
            selectedTab === "Tests"
              ? " text-black transition-all duration-300 ease-in-out border-b-2 border-black"
              : "text-gray-400"
          }`}
          onClick={() => handleselectedClick("Tests")}
        >
          <h2
            className={`${
              selectedTab === "Tests"
                ? "p-4 font-bold text-[20px]"
                : "p-4 text-[20px]"
            }`}
          >
            Tests
          </h2>
        </div>

        <div
          className={`bg-gray-300 justify-center items-center flex w-1/2 h-full ${
            selectedTab === "Quizzes"
              ? " text-black transition-all duration-100 ease-in-out border-b-2 border-black"
              : "text-gray-400"
          }`}
          onClick={() => handleselectedClick("Quizzes")}
        >
          <h2
            className={`${
              selectedTab === "Quizzes"
                ? "p-4 font-bold text-[20px]"
                : "p-4 text-[20px]"
            }`}
          >
            Quizzes
          </h2>
        </div>
      </div>

      {selectedTab === "Tests" &&
        tests.map((test, index) => (
          <div key={index} className="w-full py-6 ">
            <div className="flex rounded-lg">
              <div className="bg-gray-200 w-1/3">
                <h1 className="font-bold text-[15px] p-6">{test.Test}</h1>
              </div>
              <div className="bg-gray-700 w-1/4">
                <h1 className="text-white font-bold text-[15px] p-6">
                  {test.topic}
                </h1>
              </div>
              <div className="bg-gray-200 w-1/4">
                <h1 className="font-bold text-[15px] p-6">{test.actionText}</h1>
              </div>
              <div className="bg-gray-700 w-1/6">
                <h1 className="text-white font-bold text-[15px] p-6">
                  {test.score}
                </h1>
              </div>
              <div className="bg-gray-200 w-1/6 flex flex-col items-center justify-center py-3">
                <h1 className="font-bold text-[15px] p-6">{test.status}</h1>
                {test.status === "Passed" ? (
                  <Image src="/tick.svg" alt="tick" width={20} height={20} />
                ) : (
                  <Image src="/fail.svg" alt="fail" width={20} height={20} />
                )}
              </div>
            </div>
          </div>
        ))}

      {selectedTab === "Quizzes" &&
        quizzes.map((quiz, index) => (
          <div key={index} className="w-full py-6 rounded-lg">
            <div className="flex rounded-lg">
              <div className="bg-gray-200 w-1/3">
                <h1 className="font-bold text-[15px] p-6">{quiz.Quizz}</h1>
              </div>
              <div className="bg-gray-700 w-1/4">
                <h1 className="text-white font-bold text-[15px] p-6">
                  {quiz.topic}
                </h1>
              </div>
              <div className="bg-gray-200 w-1/4">
                <h1 className="font-bold text-[15px] p-6">{quiz.actionText}</h1>
              </div>
              <div className="bg-gray-700 w-1/6">
                <h1 className="text-white font-bold text-[15px] p-6">
                  {quiz.score}
                </h1>
              </div>
              <div className="bg-gray-200 w-1/6 flex flex-col items-center justify-center py-3">
                <h1 className="font-bold text-[15px] p-6">{quiz.status}</h1>
                {quiz.status === "Passed" ? (
                  <Image src="/tick.svg" alt="tick" width={20} height={20} />
                ) : (
                  <Image src="/fail.svg" alt="fail" width={20} height={20} />
                )}
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Knowledge;
