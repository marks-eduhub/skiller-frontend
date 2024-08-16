import React from "react";
import ReactQuill from "react-quill";
import Image from "next/image";
import CustomModal from "./modal";
const Step3 = () => {
  return (
    <div className="flex flex-col">
      <div className="mb-10">
        <label className="block text-sm font-medium mb-6 mt-6">
          Add instructions on how to use the resources
        </label>
        <ReactQuill
          placeholder="Write content here"
          // value={courseDescription}
          // onChange={setCourseDescription}
          className="bg-white h-40 mb-10"
        />
      </div>
      <div className="w-full h-[100px]  bg-gray-300  cursor-pointer">
        <div className="flex items-center  justify-center gap-1 p-9">
          <Image src="/pluss.svg" alt="plus" width={20} height={20} />
          <h1 className="font-semibold text-[18px]">Add resources</h1>
        </div>
      </div>
    </div>
  );
};

export default Step3;
