import React from "react";

interface QuizPreviewProps {
  handlePreviousStep: () => void;
  quizData: {
    question: string;
    options: string[];
  }[];
  handleSubmitQuiz: () => void
}

const QuizPreview: React.FC<QuizPreviewProps> = ({
  handlePreviousStep,
  quizData,
  handleSubmitQuiz
}) => {
  return (
    <div className="sm:p-6 p-4 mb-5 sm:mt-0 mt-20 w-full">
      <div className="flex mt-6 justify-between w-full sm:items-center">
        <button
          className="bg-white text-black border border-gray-600 py-2 px-8 rounded-md sm:mb-0 mb-4 w-[100px] flex justify-start"
          onClick={handlePreviousStep}
        >
          Back
        </button>
        <h1 className="text-xl hidden md:flex">Quiz Preview</h1>
        <button
          className="bg-black text-white rounded-md px-4 sm:px-6 w-[150px] sm:py-2"
          onClick={handleSubmitQuiz}
        >
          Upload Quiz
        </button>
      </div>

      <div className="p-10 mt-10">
        {quizData.map((item, index) => (
          <div key={index} className="mb-6">
            <h2 className="text-lg font-semi-bold">{`Q${index + 1}: ${
              item.question
            }`}</h2>
            <div className="pl-5 mt-4 font-normal">
              {item.options.map((option, optIndex) => (
                <label key={optIndex} className="block mb-2">
                  <input
                    type="radio"
                    name={`question-${index}`}
                    value={option}
                    disabled 
                    className="mr-2"
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuizPreview;
