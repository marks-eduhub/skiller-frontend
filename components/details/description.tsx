import React from 'react'
import { BsBookmarkCheck, BsFillShareFill } from 'react-icons/bs'

const Description = () => {
  return (
<div className="bg-gray-300 ">
          <div className="flex flex-col md:flex-row gap-9 pt-9 ">
            <div className="mb-6 ml-9 mt-2 bg-[#a8a8a8] max-md:w-[320px] w-[800px] h-[600px] max-md:ml-5"></div>
            <div className="flex flex-col mr-8">
              <div className="flex items-center justify-between gap-8 ">
                <button className="rounded-t-md rounded-b-md bg-white px-8 py-2 ml-5   md:p-20 md:py-2 md:ml-0 hover:bg-gray-600 focus:outline-none flex items-center">
                  <BsBookmarkCheck className="text-lg" />
                  <span className="ml-2">Save</span>
                </button>
                <button className="rounded-t-md rounded-b-md bg-white px-8 py-2 md:p-20 md:py-2  hover:bg-gray-600 focus:outline-none flex items-center">
                  <BsFillShareFill className="text-lg " />
                  <span className="ml-2">Share</span>
                </button>
              </div>
              <div className="bg-[#a8a8a8] flex flex-col justify-center md:w-570 h-[540px] items-center mt-7 max-md:w-[320px] max-md:ml-5">
                <h2 className="font-bold">Screenshots go here</h2>
              </div>
            </div>
          </div>
        </div> 
         )
}

export default Description