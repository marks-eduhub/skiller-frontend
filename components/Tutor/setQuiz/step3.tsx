import React, { useState } from "react";
import Image from "next/image";

const Step3 = ({
  quizData,
  setQuizData,
}: {
  quizData: any[];
  setQuizData: Function;
}) => {
  const handleQuestionChange = (index: number, value: string) => {
    const updatedQuizData = [...quizData];
    updatedQuizData[index].question = value;
    setQuizData(updatedQuizData);
  };

  const handleOptionChange = (qIndex: number, oIndex: number, value: string) => {
    const updatedQuizData = [...quizData];
    updatedQuizData[qIndex].options[oIndex] = value;
    setQuizData(updatedQuizData);
  };

  const handleCorrectAnswerChange = (index: number, value: string) => {
    const updatedQuizData = [...quizData];
    updatedQuizData[index].answers = value;
    setQuizData(updatedQuizData);
  };

  const addOption = (qIndex: number) => {
    const updatedQuizData = [...quizData];
    updatedQuizData[qIndex].options.push("");
    setQuizData(updatedQuizData);
  };

  const removeOption = (qIndex: number, oIndex: number) => {
    const updatedQuizData = [...quizData];
    updatedQuizData[qIndex].options.splice(oIndex, 1);
    setQuizData(updatedQuizData);

    if (updatedQuizData[qIndex].answers === updatedQuizData[qIndex].options[oIndex]) {
      updatedQuizData[qIndex].answers = "";
    }
    setQuizData(updatedQuizData);
  };

  const addQuestion = () => {
    setQuizData([...quizData, { question: "", options: ["", ""], answers: "" }]);
  };

  const removeQuestion = (index: number) => {
    setQuizData(quizData.filter((_, qIndex) => qIndex !== index));
  };

  return (
    <div className="rounded-lg border mb-5 w-full border-gray-100 sm:p-6 p-4 bg-gray-100">
      <h1>Add Questions and Answers to Your Quiz</h1>

      {quizData.map((q, qIndex) => (
        <div
          key={qIndex}
          className="rounded-lg border w-full flex flex-col h-auto border-gray-900 bg-white mt-5 p-4"
        >
          <div className="flex justify-between items-center w-full sm:mb-0 mb-3">
            <h2>Question {qIndex + 1}</h2>
            <button
              onClick={() => removeQuestion(qIndex)}
              className="text-red-500 text-sm border border-black p-2 rounded-md"
            >
              Remove Question
            </button>
          </div>

          <input
            type="text"
            className="sm:w-full outline-none p-2 sm:my-4 my-1 border border-gray-300 rounded-md"
            placeholder="Type your question here..."
            value={q.question}
            onChange={(e) => handleQuestionChange(qIndex, e.target.value)}
          />

          {q.options.map((option: string, oIndex: number) => (
            <div key={oIndex} className="flex items-center gap-3 my-2">
              <input
                type="text"
                className="sm:w-1/2 w-full outline-none p-2 border border-gray-300 rounded-md"
                placeholder={`Option ${oIndex + 1}`}
                value={option}
                onChange={(e) => handleOptionChange(qIndex, oIndex, e.target.value)}
              />
              <button
                onClick={() => removeOption(qIndex, oIndex)}
                className="text-red-500 text-sm border border-black px-2 py-1 rounded-md"
              >
                Remove Option
              </button>
            </div>
          ))}

          <button
            onClick={() => addOption(qIndex)}
            className="text-blue-500 mt-2 border border-black rounded-md p-2 w-[250px]"
          >
            Add Option
          </button>

          <div className="flex sm:flex-row flex-col gap-3 mt-6">
            <h3 className="mt-1">Select the Right Answer:</h3>
            <select
              className="text-gray-900 block sm:w-40 w-full bg-white rounded-md px-3 py-2 border border-gray-300 outline-none"
              value={q.answers}
              onChange={(e) => handleCorrectAnswerChange(qIndex, e.target.value)}
            >
              <option value="" disabled>
                Select Answer
              </option>
              {q.options.map((option: string, oIndex: number) => (
                <option key={oIndex} value={option}>
                  {option || `Option ${oIndex + 1}`}
                </option>
              ))}
            </select>
          </div>
        </div>
      ))}

      <div
        className="gap-2 cursor-pointer my-10 rounded-md items-center justify-center w-[200px] py-3 px-4 flex border border-gray-600"
        onClick={addQuestion}
      >
        <Image src="/pluss.svg" alt="plus" width={20} height={20} />
        <h1>Add a Question</h1>
      </div>
    </div>
  );
};

export default Step3;
