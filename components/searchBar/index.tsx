import React from "react";

export default function SearchBar() {
  return (    
      <div>
        searchBar
        <div className="flex">
        <input className=" pr-5 flex justify-center items-center rounded-full w-1/2 border-2 border-black placeholder-top-2" 
        placeholder ="Search for classes or tutors"
        type="text" />
        <button className="flex justify-center items-center rounded-full border-2 border-black w-1/8 px-4 py-2 p-8">
          Premium
        </button>
        </div>
        
      </div>     
  );
}