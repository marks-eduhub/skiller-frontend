import React from 'react'
import { RxAvatar } from 'react-icons/rx'

const Discussion = () => {
  return (
<div className="pl-4 py-3 bg-gray-100">
            <span className="text-black ml-4 font-semibold">
              1,056 comments
            </span>
            <div className="flex ml-4 mt-4 items-center mb-4">
              <RxAvatar className="mr-3 text-5xl" />
              <h2 className="border-b border-gray-500 ">Add Comment...</h2>
            </div>
            <div
              className="bg-gray-300 mx-auto ml-4 mr-8 flex justify-center items-center pr-6"
              style={{ height: 600 }}
            >
              <h2 className="font-bold text-black">COMMENTS SECTION</h2>
            </div>
          </div>  )
}

export default Discussion