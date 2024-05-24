"use client";
import React, { useState } from "react";
import { BsFillShareFill } from "react-icons/bs";
import { BsBookmarkCheck } from "react-icons/bs";
import { BiSolidDownArrow } from "react-icons/bi";
import { RxAvatar } from "react-icons/rx";

const Tabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState("Description");
  const resources = ["Resource 1", "Resource 2", "Resource 3", "Resource 4"];

  
  const tests = [
    { Test: 'Test 1:Fundamentals', topic: 'Topics 1-5' },
    { Test: 'Test 2:Varibales and Types', topic: 'Topics 6-10' },
    { Test: 'Test 3:Operators and User function', topic: 'Topics 11-15' },
    { Test: 'Test 4:Control Flow', topic: 'Topics 16-20' },
  ];

  const handleTabClick = (tabName: string) => {
    setActiveTab(tabName);
  };

  return (
    <>
      <div className="font-bold flex mt-6 mb-6 ml-3 overflow-x-auto justify-start gap-10">
        <div
          className={`cursor-pointer ml-6 first-tab ${
            activeTab === "Description" ? "text-blue-600" : ""
          }`}
          onClick={() => handleTabClick("Description")}
        >
          <h2 className={`${activeTab === "Description" ? "active-tab" : ""}`}>
            Description
          </h2>
        </div>
        <div
          className={`cursor-pointer ${
            activeTab === "Reviews" ? "text-blue-600" : ""
          }`}
          onClick={() => handleTabClick("Reviews")}
        >
          <h2 className={`${activeTab === "Reviews" ? "active-tab" : ""}`}>
            Reviews
          </h2>
        </div>
        <div
          className={`cursor-pointer ${
            activeTab === "Discussions" ? "text-blue-600" : ""
          }`}
          onClick={() => handleTabClick("Discussions")}
        >
          <h2 className={`${activeTab === "Discussions" ? "active-tab" : ""}`}>
            Discussions
          </h2>
        </div>
        <div
          className={`cursor-pointer ${
            activeTab === "Resources" ? "text-blue-600" : ""
          }`}
          onClick={() => handleTabClick("Resources")}
        >
          <h2 className={`${activeTab === "Resources" ? "active-tab" : ""}`}>
            Resources
          </h2>
        </div>
        <div
          className={`cursor-pointer ${
            activeTab === "Tests and Assignment" ? "text-blue-600" : ""
          }`}
          onClick={() => handleTabClick("Tests and Assignment")}
        >
          <h2
            className={`${
              activeTab === "Tests and Assignment" ? "active-tab" : ""
            }`}
          >
            Tests and Assignment
          </h2>
        </div>
        <div
          className={`cursor-pointer ${
            activeTab === "Knowledge Check" ? "text-blue-600" : ""
          }`}
          onClick={() => handleTabClick("Knowledge Check")}
        >
          <h2
            className={`${activeTab === "Knowledge Check" ? "active-tab" : ""}`}
          >
            Knowledge Check
          </h2>
        </div>
      </div>
      <div className="bg-gray-300 pb-20 ">
        {activeTab === "Description" && (
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
        )}
        {activeTab === "Resources" && (
          <div className="ml-6 mr-6 pt-9 ">
            <div className="h-60 bg-[#a8a8a8] mt-3 font-bold text-black flex flex-row items-center justify-center">
              <h2 className="">Instructions on how to use resouces</h2>
            </div>
            <div className="overflow-x-auto">
              {resources.map((resource, index) => (
                <div
                  key={index}
                  className="h-20 mt-10 bg-[#424242] text-white flex items-center justify-between"
                >
                  <h2 className="ml-6">{resource}</h2>
                  <BiSolidDownArrow className="text-white mr-6" />
                </div>
              ))}
            </div>
          </div>
        )}
        {activeTab === "Discussions" && (
          <div className="pl-4 pt-3">
            <span className="text-black ml-4 font-semibold">
              1,056 comments
            </span>
            <div className="flex ml-4 mt-4 items-center mb-4">
              <RxAvatar className="mr-3 text-5xl" />
              <h2 className="border-b border-gray-500 ">Add Comment...</h2>
            </div>
            <div
              className="bg-[#424242] mx-auto ml-4 mr-8 flex justify-center items-center pr-6"
              style={{ height: 600 }}
            >
              <h2 className="font-bold text-white">COMMENTS SECTION</h2>
            </div>
          </div>
        )}
        {activeTab === "Knowledge Check" && (
          <div className="flex flex-col">
            <div className="flex w-full border-b-2 border-black mb-4 ">
            <div className="bg-[#a8a8a8] justify-center items-center flex w-1/2 h-full ">
              <h1 className="p-4 font-bold text-[20px] justify-center items-center">Tests</h1>
            </div>
            <div className="bg-black justify-center items-center w-1/2 h-full ">
              <h1 className="p-4 text-white font-bold text-[20px]">Quizzes</h1>
            </div>
          </div>

          <div className=" rounded-3xl w-full p-6 flex">
            <div className="bg-white  w-1/3">
              <h1 className="font-bold  text-[15px] p-6">Test 1:Fundamentals</h1>
              </div>
              <div className="bg-black w-1/4">
                <h1 className="text-white font-bold  text-[15px] p-6">Topics 1-5</h1>
                </div>
                <div className="bg-white w-1/4">
                <h1 className="font-bold  text-[15px] p-6">Take Test Again</h1>
                </div>
                <div className="bg-black w-1/6">
                <h1 className="text-white font-bold  text-[15px] p-6">100%</h1>
                </div>
                <div className="bg-white w-1/6">
                <h1 className="font-bold  text-[15px] p-6">Pass</h1>
                </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Tabs;
