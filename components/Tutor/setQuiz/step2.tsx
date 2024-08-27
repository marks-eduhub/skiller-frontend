import React from "react";

const step2 = () => {
  return (
    <div className="rouded-lg bg-gray-100 border border-gray-100 py-6 px-2">
      <div className="border-b border-gray-300 flex items-center justify-center">
        <h1 className="mb-2">Title: Quiz One</h1>
      </div>
      <div className="flex flex-col items-center justify-center w-full ">
        <div className="mt-5">
          <label htmlFor="duration" className="font-medium">
            Select duration for this quiz
          </label>
          <select className="mt-2 text-gray-600 block bg-white rounded-lg px-4 py-3 border border-gray-200 mb-6 outline-none w-96">
            <option>15 minutes</option>
            <option>30 minutes</option>
          </select>
        </div>
        <div className="mt-3">
          <label htmlFor="topic" className="font-medium">
            Select topic for this quiz
          </label>
          <select className="mt-2 text-gray-600 block bg-white rounded-lg px-4 py-3 border border-gray-200 mb-6 outline-none w-96">
            <option>Topic One: Introduction to....</option>
            <option>Topic Two: UI/UX ....</option>
          </select>
        </div>
        <div className="mt-3 mr-[200px]">
          <input type="radio" className="mr-2" />
          <label htmlFor="quiz" className="font-medium">
            Enable randomisation
          </label>
        </div>
      </div>
    </div>
  );
};

export default step2;
