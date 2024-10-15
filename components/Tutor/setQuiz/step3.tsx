import React from "react";
import Image from "next/image";
import TextEditor from "@/lib/quill";

const Step3 = () => {
  return (
    <div className="rounded-lg border mb-5 w-full border-gray-100 sm:p-6 p-4 bg-gray-100">
      <h1>Add questions and answers to your quiz</h1>

      <div className="rounded-lg border w-full flex sm:flex-row flex-col h-auto border-gray-900 bg-white mt-5 ">
        <div className="flex flex-col p-4">
          <div className="flex sm:flex-row flex-col sm:items-center gap-3">
            <h1>Question: </h1>
            <input 
              type="text"
              className="sm:w-1/2  w-full outline-none p-2 sm:my-4  my-1 border border-gray-300 rounded-md"
              placeholder="Type your question here..."
            />
          </div>
          <div className="flex items-center my-3 gap-3">
            <input type="radio" name="options" value="option1" id="option1" />
            <label
              htmlFor="option1"
              className="text-sm font-medium text-gray-900"
            >
              Option 1
            </label>
          </div>

          <div className="flex items-center mb-3 gap-3">
            <input type="radio" name="options" value="option2" id="option2" />

            <label
              htmlFor="option2"
              className="text-sm font-medium text-gray-900"
            >
              Option 2
            </label>
          </div>
          <div className="flex items-center mb-3 gap-3">
            <input type="radio" name="options" id="option3" value="option3" />

            <label
              htmlFor="option3"
              className="text-sm font-medium text-gray-900 "
            >
              Option 3
            </label>
          </div>
          <div className="flex sm:flex-row flex-col gap-3 mt-6">
            <h1 className="mt-1">Select the right answer:</h1>
            <select className=" text-gray-600 block  sm:w-28 w-36 bg-white rounded-md px-3 py-2 border border-gray-300 mb-6 outline-none ">
              <option>Option 1</option>
              <option>Option 2</option>
              <option>Option 3</option>
            </select>
          </div>
          <div className=" mt-3 hidden md:flex ">
            <TextEditor />
          </div>
        </div>
      </div>
      <div className="gap-2 cursor-pointer my-10 rounded-md items-center justify-center w-[200px] py-3 px-4 flex border border-gray-600 ">
        <Image src="/pluss.svg" alt="plus" width={20} height={20} />
        <h1>Add a question</h1>
      </div>
    </div>
  );
};

export default Step3;
