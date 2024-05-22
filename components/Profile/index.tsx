"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Navbar from "../dashboadLayout/NavBar";
const ProfilePage: React.FC = () => {
  const [selectedTab, setselectedTab] = useState("Profile Picture");

  const handleClick = (tabName: string) => {
    setselectedTab(tabName);
  };
  useEffect(() => {
    localStorage.setItem("hideNavLayout", "true");
  });
  return (
    <div className="">
    <Navbar  showGreeting={false} />

      <h2 className="font-bold text-[30px] mt-8 mb-10">Profile</h2>
      <div className="flex flex-row gap-20  mt-10 mb-10 border-b w-1/5 border-gray-500  ">
        <div
          className={`cursor-pointer ${
            selectedTab === "Profile Picture" ? "border-b-2 border-black" : "y"
          }`}
          onClick={() => handleClick("Profile Picture")}
        >
          <h2>Profile Picture</h2>
        </div>
        <div
          className={`cursor-pointer ${
            selectedTab === "Bio" ? "border-b-2 w-1/4 border-black" : ""
          }`}
          onClick={() => handleClick("Bio")}
        >
          <h2>Bio</h2>
        </div>
      </div>
      {selectedTab === "Profile Picture" && (
        <div className="">
          <div className="flex flex-col mt-10">
            <h2 className="font-bold">Image Preview</h2>
            <h5 className="mt-2">Minimum Pixels[], Maximum Pixels[]</h5>
          </div>

          <div className=" flex mb-6 mt-2 bg-[#D9D9D9] border border-black w-[700px] h-[300px] items-center justify-center flex-col">
            <Image src="/Vector.svg" alt="Profile" width={200} height={200} />
          </div>
          <div className="flex mb-6 mt-2">
            <div className=" flex items-center pl-4 bg-[#D9D9D9] border border-black w-[500px] h-[50px] mt-3 ">
              No file selected
            </div>
            <div className="  flex items-center justify-center border border-black w-[200px] h-[50px] mt-3 ">
              Upload Image
            </div>
          </div>

          <button className="border border-black p-2 font-bold bg-[#D9D9D9]">
            Save
          </button>
        </div>
      )}

      {selectedTab === "Bio" && (
        <div className="">
          <form className="space-y-4">
            <div className="flex space-x-10">
              <div className="flex-1">
                <label
                  htmlFor="first-name"
                  className="block text-sm font-medium "
                >
                  First Name
                </label>
                <input
                  type="text"
                  id="first-name"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-black mb-6 bg-inherit"
                />
              </div>
              <div className="flex-1">
                <label
                  htmlFor="last-name"
                  className="block text-sm font-medium "
                >
                  Last Name
                </label>
                <input
                  type="text"
                  id="last-name"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-black mb-6 bg-inherit"
                />
              </div>
            </div>
          </form>
          <div className="">
            <h2>Biography</h2>
          </div>
          <div className=" border-2 border-black w-[700px] h-[350px] mt-3 mb-9 ">
            <div className=" items-center border border-b-2 border-black w-[698px] h-[40px] py-2 ">
              <span className="italic font-bold ml-7 ">B</span>
              <span className=" italic font-bold ml-7">I</span>
            </div>
          </div>
          <button className="border border-black p-2 font-bold bg-[#D9D9D9]">
            Save
          </button>
        </div>
      )}
    </div>
  );
};
export default ProfilePage;
