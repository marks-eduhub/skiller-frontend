import React from "react";
import "react-quill/dist/quill.snow.css";
import TextEditor from "@/lib/quill";

const Step1 = () => {
  return (
    <div className=" flex flex-col w-full rounded-md border border-gray bg-gray-100 p-5">
      <div className="flex flex-col w-full md:flex-row md:space-x-10">
        <div className="flex-1 ">
          <label htmlFor="name" className="font-medium">
            Assignment Name
          </label>
          <input
            type="text"
            id="name"
            placeholder="name"
            className="mt-1 sm:w-1/2 w-full rounded-lg block px-3 py-2 border border-gray-200 mb-6 outline-none"
          />
        </div>
        <div className="flex-1">
          <label htmlFor="curriculum" className=" font-medium">
            Curriculum Item
          </label>
          <select className="mt-2 sm:w-1/4 w-full block  bg-white rounded-lg px-3 py-2 border border-gray-200 mb-6 outline-none">
            <option>Quiz</option>
            <option>Assignment</option>
          </select>
        </div>
      </div>
      <h1>Description</h1>
      <div className="w-full mt-3 ">
        <TextEditor />
      </div>
    </div>
  );
};

export default Step1;
