import React from "react";

export default function SearchBar() {
  return (    
      <div>
        <div className=" flex items-center justify-center">
  
        <input className="py-1.5 pr-5 flex justify-center items-center rounded-full w-1/2 mr-7 border-2 border-black placeholder-top-2" 
       placeholder= "Search for classes or tutors"
       type="text" />

       
        <button className=" mr-5 flex justify-center items-center rounded-full border-2 border-black w-1/8 px-4 py-1.5 p-8">
          Premium
        </button>
        <div className=" ">
        <button className=" bg-black text-white flex justify-center items-center rounded-full border-2 border-black w-1/8 px-4 py-1.5 p-8">
          <div>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" id="profile"><g data-name="Layer 2"><circle cx="16" cy="6.96" r="6"></circle><path d="M30.86,26.84a15.07,15.07,0,0,0-4.11-7.47A12.47,12.47,0,0,0,25.13,18,15,15,0,0,0,16,15,15.24,15.24,0,0,0,5.24,19.37a15.07,15.07,0,0,0-4.11,7.47,3.42,3.42,0,0,0,.69,2.88A3.52,3.52,0,0,0,4.58,31H27.42a3.52,3.52,0,0,0,2.75-1.32A3.42,3.42,0,0,0,30.86,26.84Z"></path></g></svg>
          </div>
          <div className=" pr-1.5">
          Norah
          </div>
          <div>
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.13523 6.15803C3.3241 5.95657 3.64052 5.94637 3.84197 6.13523L7.5 9.56464L11.158 6.13523C11.3595 5.94637 11.6759 5.95657 11.8648 6.15803C12.0536 6.35949 12.0434 6.67591 11.842 6.86477L7.84197 10.6148C7.64964 10.7951 7.35036 10.7951 7.15803 10.6148L3.15803 6.86477C2.95657 6.67591 2.94637 6.35949 3.13523 6.15803Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
          </div>
        </button>
        </div>
        
        </div> 
      </div>     
  );
}