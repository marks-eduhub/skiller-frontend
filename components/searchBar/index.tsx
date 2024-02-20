import React from "react";

export default function SearchBar() {
  return (    
      <div>
        <div className=" flex items-center justify-center">
       <input className=" py-1.5 pr-5 flex justify-center items-center rounded-full w-1/2 mr-7 border-2 border-black placeholder-top-2" 
        placeholder ="&#xF002; Search for classes or tutors"
        type="text" />
        <button className=" mr-5 flex justify-center items-center rounded-full border-2 border-black w-1/8 px-4 py-1.5 p-8">
          Premium
        </button>
        <button className=" bg-black text-white flex justify-center items-center rounded-full border-2 border-black w-1/8 px-4 py-1.5 p-8">
          Norah
        </button>
       
        </div>
        
      </div>     
  );
}