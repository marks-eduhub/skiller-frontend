import React, { useState } from 'react'
import Image from "next/image"
import { GrCloudUpload } from 'react-icons/gr';
import ReactQuill from 'react-quill';
const Step2 = () => {
    const [expanded, setExpanded] = useState(false);
    const toggleExpanded = () => {
        setExpanded(!expanded);
      };
   
  return (
    <div >
        <div className="border border-gray-200 p-6">
        
        {expanded && (
            <div>
            <div className="mt-5 flex items-center w-full">
              <label className="flex-shrink-0">Topic name</label>
              <input
                type="text"
                // value={courseName}
                // onChange={(e) => setCourseName(e.target.value)}
                className="border ml-5 border-black w-full bg-[#F9F9F9] px-3 py-2 outline-none"
              />
            </div>
            <div className="mb-10 mt-4">
              <label className="block text-sm font-medium mb-4 mt-6">
                Enter a brief description about the topic
              </label>
              <ReactQuill
                placeholder="Write content here"
                // value={courseDescription}
                // onChange={setCourseDescription}
                className="bg-white h-40"
              />
            </div>
            <div>
            <div className="mb-6 mt-10">
              <label className="block text-sm font-medium mb-4 mt-20">
                What will the student learn?
              </label>
              <ReactQuill
                // value={courseLearning}
                // onChange={setCourseLearning}
                className="h-40"
              />
            </div>
          </div>
          <div>
           
            <div className="mt-20">
              <h1>Upload Course Image</h1>
              <div className="flex flex-col mt-5 items-center justify-center border border-dashed border-black p-3 relative h-[200px] rounded">
                <GrCloudUpload className="text-blue-800 w-10 h-10" />
                <span className="text-gray-500">
                  Drag & drop files or
                  <span className="text-blue-500 ml-1 cursor-pointer">Browse</span>
                </span>
                <input
                  type="file"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                //   onChange={handleImageChange}
                />
              </div>
            </div>
            <div className="flex justify-end mt-6">

            <button
            className="border border-black justify-end mb-4 py-2 px-4 flex items-center  rounded w-[150px] "
            // onClick={handlePreviousStep}
          >
        Save changes
          </button>
          </div>
</div>
          </div>
        )}
        <div className="w-full h-[100px] bg-gray-300  cursor-pointer" >
          <div className="flex items-center  justify-center gap-1 p-9" onClick={toggleExpanded}>
            <Image src="/pluss.svg" alt="plus" width={20} height={20} />
              <h1 className="font-semibold text-[18px]">Add your first topic</h1>
          </div>
        </div>
        </div>
    </div>
  )
}

export default Step2