import React from 'react'
import { BiSolidDownArrow } from 'react-icons/bi'

const Resources = () => {
    const resources = ["Resource 1", "Resource 2", "Resource 3", "Resource 4"];

  return (

    <div className="ml-6 mr-6 pt-9 ">
    <div className="h-60 bg-gray-300 mt-3 font-bold text-black flex flex-row items-center justify-center">
      <h2 className="">Instructions on how to use resouces</h2>
    </div>
    <div className="overflow-x-auto">
      {resources.map((resource, index) => (
        <div
          key={index}
          className="h-20 mt-10 bg-gray-700 text-white flex items-center justify-between"
        >
          <h2 className="ml-6">{resource}</h2>
          <BiSolidDownArrow className="text-white mr-6" />
        </div>
      ))}
    </div>
  </div>  )
}

export default Resources