import React from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const Step1 = ({
  testname,
  setTestname,
  description,
  setDescription,
}: {
  testname: string;
  setTestname: React.Dispatch<React.SetStateAction<string>>;
  description: string;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <div className="flex flex-col w-full rounded-md border border-gray bg-gray-100 p-5">
      <div className="flex flex-col w-full md:flex-row md:space-x-10">
        <div className="flex-1">
          <label htmlFor="name" className="font-medium">
            Assignment Name
          </label>
          <input
            type="text"
            id="name"
            placeholder="Enter the assignment name"
            value={testname}
            onChange={(e) => setTestname(e.target.value)}
            className="mt-1 sm:w-1/2 w-full rounded-lg block px-3 py-2 border border-gray-200 mb-6 outline-none"
          />
        </div>
      </div>
      <h1 className="font-medium">Description</h1>
      <div className="w-full mt-3">
        <ReactQuill
          value={description}
          placeholder="Enter the description here..."
          onChange={(value) => {
            setDescription(value);
          }}
        />
      </div>
    </div>
  );
};

export default Step1;
