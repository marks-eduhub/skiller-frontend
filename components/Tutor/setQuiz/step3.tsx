import React, { useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const Step3 = ({
  quizData,
  setQuizData,
}: {
  quizData: any[];
  setQuizData: Function;
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const questionsPerPage = 4;

  const indexOfLastQuestion = currentPage * questionsPerPage;
  const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;

  const currentQuestions = quizData.slice(
    indexOfFirstQuestion,
    indexOfLastQuestion
  );

  const handleQuestionChange = (index: number, value: string) => {
    if (index < 0 || index >= quizData.length) {
     
      return;
    }

    const updatedQuizData = [...quizData];
    updatedQuizData[index].question = value;

    setQuizData(updatedQuizData);
  };

  const handleOptionChange = (
    qIndex: number,
    oIndex: number,
    value: string
  ) => {
    if (
      qIndex < 0 ||
      qIndex >= quizData.length ||
      oIndex < 0 ||
      oIndex >= quizData[qIndex].options.length
    ) {
      return;
    }

    const updatedQuizData = [...quizData];
    updatedQuizData[qIndex].options[oIndex] = value;

    setQuizData(updatedQuizData);
  };
  const handleCorrectAnswerChange = (id: number, value: string) => {
  
    const updatedQuizData = quizData.map((q) =>
      q.questionId
        ? q.questionId === id
          ? { ...q, answers: value }
          : q
        : quizData.indexOf(q) === id
        ? { ...q, answers: value }
        : q
    );

    setQuizData(updatedQuizData);
  };

  const addOption = (qIndex: number) => {
    const realIndex = indexOfFirstQuestion + qIndex;

    if (realIndex < 0 || realIndex >= quizData.length) {
      return;
    }

    const updatedQuizData = [...quizData];

    if (!updatedQuizData[realIndex].options) {
      updatedQuizData[realIndex].options = [];
    }

    updatedQuizData[realIndex].options.push("");

    setQuizData(updatedQuizData);
  };

  const removeOption = (qIndex: number, oIndex: number) => {
    const realIndex = indexOfFirstQuestion + qIndex;

    if (realIndex < 0 || realIndex >= quizData.length) {
      return;
    }

    const updatedQuizData = [...quizData];

    if (
      !updatedQuizData[realIndex].options ||
      updatedQuizData[realIndex].options.length === 0
    ) {
      return;
    }

    const removedOption = updatedQuizData[realIndex].options[oIndex];

    updatedQuizData[realIndex].options.splice(oIndex, 1);

    if (updatedQuizData[realIndex].answers === removedOption) {
      updatedQuizData[realIndex].answers = "";
    }

    setQuizData(updatedQuizData);
  };

  const addQuestion = () => {
    setQuizData([
      ...(quizData || []),
      { id: Date.now(), question: "", options: ["", ""], answers: "" },
    ]);
  };

  const removeQuestion = (id: number) => {
    setQuizData(quizData.filter((q) => q.id !== id));
  };

  return (
    <div className="rounded-lg border mb-5 w-full border-gray-100 sm:p-6 p-4 bg-gray-100">
      <h1>Add Questions and Answers to Your Quiz</h1>

      {currentQuestions.map((q, qIndex) => (
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

          <div className="sm:mb-4 mt-2">
            <ReactQuill
              placeholder="Type your question here.."
              value={q.question}
              onChange={(value) => handleQuestionChange(qIndex, value)}
              className="bg-white h-auto sm:w-1/2"
            />
          </div>

          {q.options.map((option: string, oIndex: number) => (
            <div key={oIndex} className="flex items-center gap-3 my-2">
              <input
                type="text"
                className="sm:w-1/2 w-full outline-none p-2 border border-gray-300 rounded-md"
                placeholder={`Option ${oIndex + 1}`}
                value={option}
                onChange={(e) =>
                  handleOptionChange(qIndex, oIndex, e.target.value)
                }
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
              value={
                q.questionId
                  ? quizData.find((qItem) => qItem.questionId === q.questionId)
                      ?.answers || ""
                  : q.answers
              }
              onChange={(e) =>
                handleCorrectAnswerChange(
                  q.questionId ? q.questionId : indexOfFirstQuestion + qIndex,
                  e.target.value
                )
              }
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

      <div className="flex justify-center items-center mt-4 gap-4">
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded-lg text-white font-medium ${
            currentPage === 1
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-gray-600 hover:bg-gray-700"
          }`}
        >
          Previous
        </button>

        <p className="text-gray-700 font-medium ">
          Page {currentPage} of
          <span className="ml-1">
            {Math.ceil(quizData.length / questionsPerPage)}
          </span>
        </p>

        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage * questionsPerPage >= quizData.length}
          className={`px-4 py-2 rounded-lg text-white font-medium ${
            currentPage * questionsPerPage >= quizData.length
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-zinc-500 hover:bg-zinc-700"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Step3;
