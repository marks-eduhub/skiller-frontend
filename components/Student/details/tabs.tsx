"use client";
import React, { useState } from "react";
import Description from "./description";
import Resources from "./resources";
import Discussion from "./discussion";
import Knowledge from "./knowledge";

const Tabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState("Description");
  
  const handleTabClick = (tabName: string) => {
    setActiveTab(tabName);
  };

  return (
    <>
      <div className="font-bold flex mt-6 mb-6  overflow-x-auto justify-start gap-10">
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
        {activeTab === "Description" &&(
        <Description/>

        )}
        {activeTab === "Resources" && (
        <Resources/>

        )}
        {activeTab === "Discussions" && (
        <Discussion/>  
        )}
        {activeTab === "Knowledge Check" && (
         <Knowledge/>
        )}
      </div>
    </>
  );
};

export default Tabs;
