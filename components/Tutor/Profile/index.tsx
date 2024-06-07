"use client";
import React, { useState } from "react";
import Image from "next/image";
import TutorNav from "../dashboard/tutor-nav";


const TutorProfile = () => {
  const [selectedTab, setSelectedTab] = useState("Profile Picture");
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleClick = (tabName: string) => {
    setSelectedTab(tabName);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className=" sm:pl-8 p-4 ">
      <TutorNav/>
      <h2 className="font-bold text-[30px] mt-8 mb-10 max-md:mt-0">Profile</h2>
      <div className="flex flex-row gap-20 mt-10 mb-10 border-b w-1/4 border-gray-500 max-md:w-auto">
        <div
          className={`cursor-pointer ${
            selectedTab === "Profile Picture" ? "border-b-2 border-black" : ""
          }`}
          onClick={() => handleClick("Profile Picture")}
        >
          <h2>Profile Picture</h2>
        </div>
        <div
          className={`cursor-pointer ${
            selectedTab === "Bio" ? "border-b-2 border-black" : ""
          }`}
          onClick={() => handleClick("Bio")}
        >
          <h2>Bio</h2>
        </div>
      </div>

      {selectedTab === "Profile Picture" && (
        <div>
          <div className="flex flex-col mt-10">
            <h2 className="font-bold">Image Preview</h2>
            <h5 className="mt-2">Minimum Pixels 10, Maximum Pixels 30</h5>
          </div>

          <div className="flex mb-6 mt-2 bg-[#D9D9D9] border border-black w-[700px] h-[300px] max-md:w-[350px] max-md:mt-4 items-center justify-center flex-col overflow-hidden">
            {imagePreview ? (
              <Image
                src={imagePreview}
                alt="Profile"
                width={200}
                height={200}
                className="object-cover"
              />
            ) : (
              <Image
                src="/Vector.svg"
                alt="Profile"
                width={200}
                height={200}
                className="object-cover"
              />
            )}
          </div>
          <div className="flex mb-6 mt-2">
            <div className="flex items-center pl-4 bg-[#D9D9D9] border border-black w-[500px] max-md:w-[300px] h-[50px] mt-3">
              {imagePreview ? "File selected" : "No file selected"}
            </div>
            <div className="relative flex items-center justify-center border border-black w-[200px] h-[50px] mt-3 bg-[#D9D9D9] cursor-pointer">
              <input
                type="file"
                onChange={handleImageChange}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
              <span>Upload Image</span>
            </div>
          </div>

          <button className="border border-black p-2 font-bold bg-[#D9D9D9]">
            Save
          </button>
        </div>
      )}

      {selectedTab === "Bio" && (
        <div>
          <form className="space-y-4">
            <div className="flex flex-col md:flex-row md:space-x-10">
              <div className="flex-1">
                <label
                  htmlFor="first-name"
                  className="block text-sm font-medium"
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
                  className="block text-sm font-medium"
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
            <div className="flex flex-col md:flex-row md:space-x-10">
              <div className="flex-1">
                <label
                  htmlFor="first-name"
                  className="block text-sm font-medium"
                >
                  {"Twitter/X "}
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
                  className="block text-sm font-medium"
                >
                  {" Facebook"}
                </label>
                <input
                  type="text"
                  id="last-name"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-black mb-6 bg-inherit"
                />
              </div>
            </div>
            <div className="flex flex-col md:flex-row md:space-x-10">
              <div className="flex-1">
                <label
                  htmlFor="first-name"
                  className="block text-sm font-medium"
                >
                  {"Youtube"}
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
                  className="block text-sm font-medium"
                >
                  {"Linkedln"}
                </label>
                <input
                  type="text"
                  id="last-name"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-black mb-6 bg-inherit"
                />
              </div>
            </div>

            <div className="flex flex-col md:flex-row md:space-x-10">
              <div className="flex-1">
                <label
                  htmlFor="first-name"
                  className="block text-sm font-medium"
                >
                  {"Biography"}
                </label>
                <div className="border-2 border-black sm:w-[535px] h-[100px] mt-3 mb-9">
                  <div className="items-center border border-b-2 border-black sm:w-[534px] h-[40px] py-2">
                    <span className="italic font-bold ml-7">B</span>
                    <span className="italic font-bold ml-7">I</span>
                  </div>
                </div>
              </div>
              <div className="flex-1">
                <label
                  htmlFor="last-name"
                  className="block text-sm font-medium"
                >
                  {"Headline"}
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

          
          <button className="border border-black p-2 font-bold bg-[#D9D9D9]">
            Save
          </button>
        </div>
      )}
    </div>
  );
};

export default TutorProfile;
