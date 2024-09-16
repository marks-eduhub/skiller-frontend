import React from "react";
interface QuizPreviewProps{
    handlePreviousStep: () => void
}
const QuizPreview:React.FC<QuizPreviewProps> = ({ handlePreviousStep }) => {
  return (
    <div className="p-6  mb-5 w-full">
      <div className="flex mt-6  max-md:flex-col justify-between w-full  sm:items-center">
        <button
          className="bg-white text-black border border-gray-600 py-2 px-8 rounded-md sm:mb-0 mb-4 w-[100px]  flex justify-start"
          onClick={handlePreviousStep}
        >
          Back
        </button>
        <h1 className="text-xl  mb-4">Quiz Preview</h1>

        <button className="bg-black text-white py-2 px-6 sm:w-[150px]  rounded-md">
          Upload Quiz
        </button>
      </div>
      <div className="bg-gray-100 border mt-10 rounded-lg p-4 border-gray-100  w-full h-auto">
        <div className="flex flex-col  ">
          <h1 className="underline">Question1:</h1>
          <div className="ml-5">
            <h1 className="font-semibold my-3 ">
              What is the primary purpose of User Interface Design?
            </h1>
            <div className="flex items-center mb-3 gap-3">
              <input type="radio" name="options" value="option1" id="option1" />

              <label htmlFor="option1" className="  text-gray-900">
                To facilitate a user&apos;s interaction with a product or
                service.
              </label>
            </div>
            <div className="flex items-center mb-3 gap-3">
              <input type="radio" name="options" value="option2" id="option2" />

              <label htmlFor="option2" className="  text-gray-900">
                To establish a consisitent brand identity.
              </label>
            </div>
            <div className="flex items-center mb-3 gap-3">
              <input type="radio" name="options" value="option3" id="option3" />

              <label htmlFor="option3" className="  text-gray-900">
                To ensure the functionality of the backend.
              </label>
            </div>
            <div className="flex items-center mb-3 gap-3">
              <input type="radio" name="options" value="option4" id="option4" />

              <label htmlFor="option4" className="  text-gray-900">
                To create a visually appealing interface.
              </label>
            </div>
            <h1 className="mt-6">
              Correct Answer: To facilitate a user&apos;s interaction with a
              product or service.
            </h1>
          </div>
        </div>
        <div className="flex flex-col py-10 ">
          <h1 className="underline ">Question1:</h1>
          <div className="ml-5">
            <h1 className="font-semibold my-3 ">
              Which of the following is NOT a key principle of UI/UX?
            </h1>
            <div className="flex items-center mb-3 gap-3">
              <input
                type="radio"
                name="options"
                value="usability"
                id="usability"
              />

              <label htmlFor="usability" className="  text-gray-900">
                Usability
              </label>
            </div>
            <div className="flex items-center mb-3 gap-3">
              <input type="radio" name="options" value="accesss" id="access" />

              <label htmlFor="access" className="  text-gray-900">
                Accessibility
              </label>
            </div>
            <div className="flex items-center mb-3 gap-3">
              <input
                type="radio"
                name="options"
                value="aesthetic"
                id="aesthetic"
              />

              <label htmlFor="aesthetic" className="  text-gray-900">
                Asthetics
              </label>
            </div>
            <div className="flex items-center mb-3 gap-3">
              <input type="radio" name="options" value="rate" id="rate" />

              <label htmlFor="rate" className="  text-gray-900">
                Conversion rate optimization
              </label>
            </div>
            <h1 className="mt-6">
              Correct Answer: Conversion rate optimization
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizPreview;
