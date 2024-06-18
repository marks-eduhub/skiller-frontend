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
  const [isOpen, setIsOpen] = useState(false);

  const toggleQuizList = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative w-full bg-[#E7E8EA] px-8 pt-1 pb-7">
      <div className="relative w-full mt-10">
        <div
          className="relative h-[90px] bg-cover bg-center"
          style={{ backgroundImage: `url("/cake.svg")` }}
        >
          <div className="absolute inset-0 bg-[#1a1b1ab0] flex items-center justify-between px-6">
            <h1 className="text-white">Quizzes: {isOpen ? quizzes.length : 20}</h1>
            <div onClick={toggleQuizList} className="cursor-pointer">
              <Image
                src="/drop.svg"
                alt="toggle"
                width={20}
                height={20}
                className={`transition-transform duration-200 transform ${isOpen ? "rotate-180" : ""}`}
              />
            </div>
          </div>
        </div>
        {isOpen && (
          <div className="bg-gray-300 p-4 space-y-2">
            {quizzes.map((quiz, index) => (
              <div key={index} className="bg-gray-400 p-4 flex justify-between items-center">
                <span className="text-white">{quiz}</span>
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
        <div
          className="relative h-[90px] bg-cover bg-center"
          style={{ backgroundImage: `url("/cake.svg")` }}
        >
          <div className="absolute inset-0 bg-[#1a1b1ab0] flex items-center justify-between px-6">
            <h1 className="text-white">Tests: 15</h1>
            <Image src="/drop.svg" alt="plus" width={20} height={20} />
          </div>
        </div>
      </div>

      <div className="relative w-full mt-10">
        <div
          className="relative h-[90px] bg-cover bg-center"
          style={{ backgroundImage: `url("/cake.svg")` }}
        >
          <div className="absolute inset-0 bg-[#1a1b1ab0] flex items-center justify-between px-6">
            <h1 className="text-white">Challenges: 10</h1>
            <Image src="/drop.svg" alt="plus" width={20} height={20} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Assessments;
