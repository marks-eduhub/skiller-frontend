"use client";
import React, { useState } from "react";
import { BsFillShareFill } from "react-icons/bs";
import { BsBookmarkCheck } from "react-icons/bs";
import { BiSolidDownArrow } from "react-icons/bi";
import { RxAvatar } from "react-icons/rx";

const Tabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState("Description");
  const resources = ["Resource 1", "Resource 2", "Resource 3", "Resource 4"];

  const handleTabClick = (tabName: string) => {
    setActiveTab(tabName);
  };

  return (
    <>
      <div className="font-bold flex mt-6 mb-6 justify-start gap-10">
        <div
          className={`cursor-pointer ml-6 first-tab ${activeTab === "Description" ? "text-blue-600" : ""}`}
          onClick={() => handleTabClick("Description")}
        >
          <h2 className={`${activeTab === "Description" ? "active-tab" : ""}`}>Description</h2>
        </div>
        <div
          className={`cursor-pointer ${activeTab === "Reviews" ? "text-blue-600" : ""}`}
          onClick={() => handleTabClick("Reviews")}
        >
          <h2 className={`${activeTab === "Reviews" ? "active-tab" : ""}`}>Reviews</h2>
        </div>
        <div
          className={`cursor-pointer ${activeTab === "Discussions" ? "text-blue-600" : ""}`}
          onClick={() => handleTabClick("Discussions")}
        >
          <h2 className={`${activeTab === "Discussions" ? "active-tab" : ""}`}>Discussions</h2>
        </div>
        <div
          className={`cursor-pointer ${activeTab === "Resources" ? "text-blue-600" : ""}`}
          onClick={() => handleTabClick("Resources")}
        >
          <h2 className={`${activeTab === "Resources" ? "active-tab" : ""}`}>Resources</h2>
        </div>
        <div
          className={`cursor-pointer ${activeTab === "Tests and Assignment" ? "text-blue-600" : ""}`}
          onClick={() => handleTabClick("Tests and Assignment")}
        >
          <h2 className={`${activeTab === "Tests and Assignment" ? "active-tab" : ""}`}>Tests and Assignment</h2>
        </div>
      </div>
      <div className="bg-gray-300 pt-12 pb-12">
      {activeTab === "Description" && (
        <div className="flex gap-9">
          <div className="card mb-6 ml-9 mt-3">
            {/* Content for first card */}
          </div>
          <div className="flex flex-col mr-15">
            <div className="flex items-center gap-12">
              <button className="rounded-t-md rounded-b-md bg-white px-20 py-2 hover:bg-gray-600 focus:outline-none flex items-center">
                <BsBookmarkCheck className="text-lg" />
                <span className="ml-2">Save</span>
              </button>
              <button className="rounded-t-md rounded-b-md bg-white px-20 py-2 hover:bg-gray-600 focus:outline-none flex items-center">
                <BsFillShareFill className="text-lg " />
                <span className="ml-2">Share</span>
              </button>
            </div>
            <div className="card2 flex flex-col justify-center items-center mt-7">
              {/* Content for second card */}
              <h2 className="font-bold">Screenshots go here</h2>
            </div>
          </div>
        </div>
      )}
      {activeTab === "Resources" && (
        <div className="w-full ml-6 mr-6">
          <div className="h-60 color mt-3"></div>
          {resources.map((resource, index) => (
            <div
              key={index}
              className="h-20 mt-10 color2 text-white flex items-center justify-between"
            >
              <h2 className="ml-6">{resource}</h2>
              <BiSolidDownArrow className="text-white mr-6" />
            </div>
          ))}
        </div>
      )}
      {activeTab === "Discussions" && (
        <div className="">
          <span className="text-black ml-4 font-semibold font-medium">
            1,056 comments
          </span>
          <div className="flex ml-4 mt-4 items-center mb-4">
            <RxAvatar className="mr-3 text-5xl" />
            <h2 className="border-b border-gray-500 w-full ">Add Comment...</h2>
          </div>
          <div className="w-full color2 length ml-4 mr-4 flex justify-center items-center">
            <h2 className="font-bold text-white">COMMENTS SECTION</h2>
          </div>
        </div>
      )}
              </div>

    </>
  );
};

export default Tabs;
