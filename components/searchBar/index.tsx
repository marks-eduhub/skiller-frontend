import React from "react";

export default function SearchBar() {
  return (    
      <div>
        searchBar
        <input className=" flex justify-center items-center rounded-full w-1/2 border-2 border-black placeholder-top-2" 
        placeholder ="Search for classes or tutors"
        type="text" />
      </div>     
  );
}