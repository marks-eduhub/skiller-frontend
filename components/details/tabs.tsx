import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import { BsFillShareFill } from "react-icons/bs";
import React from 'react';

const Tabs: React.FC = () => {
  return (
<>
<div className="font-bold flex mt-6 mb-6 justify-start gap-10">
        
        <div className="">
          {/* Content for Tab 1 */}
          <h2 className="ml-6 first-tab">Description</h2>
        </div>
        <div className="">
          {/* Content for Tab 2 */}
          <h2>Reviews</h2>
        </div>
        <div className="">
          {/* Content for Tab 3 */}
          <h2>Discussions</h2>
        </div>
        <div className="">
          {/* Content for Tab 4 */}
          <h2>Resources</h2>
        </div>
        <div>
          {/* Content for Tab 5 */}
          <h2>Tests and Assignment</h2>
        </div>
      </div>

      <div className="flex gap-9">
        {/* <div className="flex-1"> */}
          <div className="card mb-6 ml-6 mt-3">
            {/* Content for first card */}
          </div>
        {/* </div> */}
        
        <div className="flex flex-col mr-15">  {/* Wrap icons and card in a flex column */}
          <div className="flex items-center"> {/* Align icons horizontally */}
            <div className="rounded-full bg-gray-200 p-2 mr-2">
              <FontAwesomeIcon icon={faSave} className="text-lg cursor-pointer" />
            </div>
            <span className="mr-4">Save</span>
            
            <div className="rounded-full bg-gray-200 p-2 mr-2">
              <BsFillShareFill className="text-lg cursor-pointer" />
            </div>
            <span>Share</span>
          </div>
          
          <div className="card2 flex flex-col justify-center items-center mt-6"> {/* Add margin-top for spacing */}
            {/* Content for second card */}
            <h2 className="font-bold text-center">Screenshots go here</h2>
          </div>
        </div>
         </div>
         </>  

  );
};

export default Tabs;
