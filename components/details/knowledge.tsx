import React, { useState } from "react";
import Image from "next/image";
import {tests, quizzes} from "../../components/details/tabs.json"

const Knowledge = () => {
  const [selectedTab, setselectedTab] = useState("Tests");
  const handleselectedClick = (tabName: string) => {
    setselectedTab(tabName);
  };

  return (
    <div className="flex flex-col">
      <div className="flex w-full border-b-2 border-black mb-4 cursor-pointer">
        <div
          className={`bg-[#a8a8a8] justify-center items-center flex w-1/2 h-full ${
            selectedTab === "Tests" ? "bg-black text-white" : ""
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
          className={`bg-[#a8a8a8] justify-center items-center flex w-1/2 h-full ${
            selectedTab === "Quizzes" ? "bg-black text-white" : ""
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
          <div key={index} className="w-full p-6 rounded-lg">
            <div className="flex rounded-lg">
              <div className="bg-white w-1/3">
                <h1 className="font-bold text-[15px] p-6">{test.Test}</h1>
              </div>
              <div className="bg-black w-1/4">
                <h1 className="text-white font-bold text-[15px] p-6">
                  {test.topic}
                </h1>
              </div>
              <div className="bg-white w-1/4">
                <h1 className="font-bold text-[15px] p-6">{test.actionText}</h1>
              </div>
              <div className="bg-black w-1/6">
                <h1 className="text-white font-bold text-[15px] p-6">
                  {test.score}
                </h1>
              </div>
              <div className="bg-white w-1/6 flex ">
                <h1 className="font-bold text-[15px] p-6">{test.status}</h1>
                <Image src="/tick.svg" alt="tick" width={20} height={20} />
              </div>
            </div>
          </div>
        ))}

      {selectedTab === "Quizzes" &&
        quizzes.map((quizzes, index) => (
          <div key={index} className="w-full p-6 rounded-lg">
            <div className="flex rounded-lg">
              <div className="bg-white w-1/3">
                <h1 className="font-bold text-[15px] p-6">{quizzes.Quizz}</h1>
              </div>
              <div className="bg-black w-1/4">
                <h1 className="text-white font-bold text-[15px] p-6">
                  {quizzes.topic}
                </h1>
              </div>
              <div className="bg-white w-1/4">
                <h1 className="font-bold text-[15px] p-6">{quizzes.actionText}</h1>
              </div>
              <div className="bg-black w-1/6">
                <h1 className="text-white font-bold text-[15px] p-6">
                  {quizzes.score}
                </h1>
              </div>
              <div className="bg-white w-1/6 flex ">
                <h1 className="font-bold text-[15px] p-6">{quizzes.status}</h1>
                <Image src="/tick.svg" alt="tick" width={20} height={20} />
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Knowledge;
