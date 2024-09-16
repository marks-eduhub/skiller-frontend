"use client";
import { useRouter } from "next/navigation";
import React from "react";

const QuizPreview = () => {
    const router = useRouter()
const handlePreviousStep = () => {
  router.back();
}

  return (
    <div className="sm:p-6  mb-5 w-full">
      <div className="flex max-md:flex-col sm:mt-6 mt-4 sm:justify-between w-full sm:gap-0 gap-4  sm:items-center">
        <button
          className="bg-white text-black border border-gray-600 py-2 px-8 rounded-md  w-[100px]  flex justify-start "
          onClick={handlePreviousStep}
        >
          Back
        </button>
        <h1 className="sm:text-xl mb-4">Typescript fundamentals in 20days Quiz One</h1>

        <button className="bg-black w-[300px] sm:w-[150px]  text-white py-2 px-6 rounded-md">
          Submit Quiz
        </button>
      </div>
      <div className="bg-gray-100 border mt-10 rounded-lg p-4 border-gray-100  w-full h-auto">
        <div className="flex flex-col  ">
          <h1 className="underline">Question1:</h1>
          <div className="sm:ml-5  mt-4 bg-white p-6">
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
          
          </div>
        </div>
        <div className="flex flex-col py-10 ">
          <h1 className="underline ">Question2:</h1>
          <div className="sm:ml-5 mt-4 bg-white p-6">
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
         
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizPreview;
