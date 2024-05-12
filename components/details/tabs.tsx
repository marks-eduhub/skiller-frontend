"use client"
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
      <div className="bg-gray-300 pt-12 pb-20">
        {activeTab === "Description" && (
          <div className="flex gap-9">
            <div
              className=" mb-6 ml-9 mt-2 bg-[#a8a8a8] "
              style={{ width: 800, height: 600 }}
            >
            </div>
            <div className="flex flex-col mr-8">
              <div className="flex items-center justify-between gap-12">
                <button className="rounded-t-md rounded-b-md bg-white px-20 py-2 hover:bg-gray-600 focus:outline-none flex items-center">
                  <BsBookmarkCheck className="text-lg" />
                  <span className="ml-2">Save</span>
                </button>
                <button className="rounded-t-md rounded-b-md bg-white px-20 py-2 hover:bg-gray-600 focus:outline-none flex items-center">
                  <BsFillShareFill className="text-lg " />
                  <span className="ml-2">Share</span>
                  </button>
              </div>
              <div
                className="bg-[#a8a8a8] flex flex-col justify-center items-center mt-7"
                style={{ width: 570, height: 540 }}
              >
                {/* Content for second card */}
                <h2 className="font-bold">Screenshots go here</h2>
              </div>
            </div>
          </div>
        )}
        {activeTab === "Resources" && (
          <div className="ml-6 mr-6">
            <div className="h-60 bg-[#a8a8a8] mt-3 font-bold text-black flex flex-row items-center justify-center">
              <h2 className="">
                Instructions on how to use resouces
              </h2>
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
      </div>
    </>
  );
};

export default Tabs;
