"use client";
import React, { useState } from "react";
import Description from "./description";
import Resources from "./resources";
import Discussion from "./discussion";
import Knowledge from "./knowledge";
import Transcript from "./transcript";

const Tabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState("Description");

  const handleTabClick = (tabName: string) => {
    setActiveTab(tabName);
  };

  return (
    <>
      <div className="font-bold flex mt-6 mb-6  overflow-x-auto justify-start gap-10">
        <div className="flex gap-10 w-full p-4">
          <div
            className={`cursor-pointer  first-tab ${
              activeTab === "Description"
                ? "inline-block p-1 text-center font-semibold text-black transition-colors duration-300 border-l-4 border-b-4 border-black shadow-md rounded-md"
                : ""
            }`}
            onClick={() => handleTabClick("Description")}
          >
            <h2>Description</h2>
          </div>
          <div
            className={`cursor-pointer ${
              activeTab === "Transcript"
                ? "inline-block p-1 text-center font-semibold text-black transition-colors duration-300 border-l-4 border-b-4 border-black shadow-md rounded-md"
                : ""
            }`}
            onClick={() => handleTabClick("Transcript")}
          >
            <h2>Transcript</h2>
          </div>
          <div
            className={`cursor-pointer ${
              activeTab === "Discussions"
                ? "inline-block p-1 text-center font-semibold text-black transition-colors duration-300 border-l-4 border-b-4 border-black shadow-md rounded-md"
                : ""
            }`}
            onClick={() => handleTabClick("Discussions")}
          >
            <h2>Discussions</h2>
          </div>
          <div
            className={`cursor-pointer ${
              activeTab === "Resources"
                ? "inline-block p-1 text-center font-semibold text-black transition-colors duration-300 border-l-4 border-b-4 border-black shadow-md rounded-md"
                : ""
            }`}
            onClick={() => handleTabClick("Resources")}
          >
            <h2>Resources</h2>
          </div>

          <div
            className={`cursor-pointer ${
              activeTab === "Tests and Assignment" ? "active-tab" : ""
            }`}
            onClick={() => handleTabClick("Tests and Assignment")}
          >
            <h2>Tests and Assignment</h2>
          </div>
          <div
            className={`cursor-pointer ${
              activeTab === "Knowledge Check" ? "active-tab" : ""
            }`}
            onClick={() => handleTabClick("Knowledge Check")}
          >
            <h2>Knowledge Check</h2>
          </div>
        </div>
      </div>

      <div className=" pb-6 ">
        {activeTab === "Description" && <Description />}
        {activeTab === "Resources" && <Resources />}
        {activeTab === "Discussions" && <Discussion />}
        {activeTab === "Knowledge Check" && <Knowledge />}
        {activeTab === "Transcript" && <Transcript />}
      </div>
    </>
  );
};

export default Tabs;
