"use client";
import TutorNav from "./tutor-nav";
import Image from "next/image";
import { TriangleDownIcon } from "@radix-ui/react-icons";
import { RxSwitch } from "react-icons/rx";
import { GrCloudUpload } from "react-icons/gr";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const CourseUpload = () => {
  const [overview, setOverview] = useState("");
  const [image, setImage] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleOverviewChange = (value: string) => {
    setOverview(value);
  };
  return (
    <div className=" p-4 ">
      <div className="w-full sm:mt-2 flex items-center justify-between">
        <h1 className="font-semibold text-[20px] sm:flex hidden ">
          Upload Course
        </h1>
        <div className="justify-end">
          <TutorNav />
        </div>
      </div>
      <div className=" flex sm:mt-7 mt-20 mb-5 sm:justify-end  justify-between">
        <h1 className="font-semibold text-[20px] sm:hidden ">Upload Course</h1>
        <div className="flex gap-2 bg-black w-[180px] h-[40px]  px-4 py-2 items-center justify-center rounded-lg  sm:mt-0 ">
          <p className="text-white">Save</p>
          <TriangleDownIcon className="w-6 h-6 text-white mr-2" />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:justify-between my-5 space-y-4 sm:space-y-0 sm:space-x-4">
        <div className="flex-1">
          <label htmlFor="name" className="block font-semibold mb-1">
            Name:
          </label>
          <input
            type="text"
            id="name"
            required
            placeholder="Baking 101"
            className="w-full rounded-lg px-3 py-2 border border-black focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="flex-1">
          <label htmlFor="description" className="block font-semibold mb-1">
            Description:
          </label>
          <input
            type="text"
            id="description"
            required
            placeholder="In this course, we will cover..."
            className="w-full rounded-lg px-3 py-2 border border-black focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>
      <div className="flex flex-col">
        <h1 className="font-semibold">Topics</h1>
        <div className="flex gap-2 items-center">
          <Image src="/bulb.svg" alt="light" width={15} height={15} />
          <p>Tip: courses are made of topics </p>
        </div>
      </div>
      <div className=" flex flex-col mt-5 mb-5">
        <h1 className="font-semibold mb-1">Topic 1</h1>
        <div className="w-full h-[100px] rounded-lg bg-[#E9E9E9] mt-3">
          <div className="flex items-center justify-between p-9">
            <h1 className="font-bold text-[20px]">Get Started</h1>
            <Image src="/closedarrow.svg" alt="arrow" width={10} height={10} />
          </div>
        </div>
      </div>
      <h1 className="font-semibold mb-1">Topic 2</h1>
      <div className="p-4 w-full h-auto bg-[#E9E9E9] rounded-lg">
        <Image
          src="/openarrow.svg"
          alt="open arrow"
          width={20}
          height={20}
          className="ml-auto"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col">
            <label htmlFor="title" className="text-sm font-medium mb-3 block ">
              Title
            </label>
            <input
              type="text"
              id="title"
              placeholder="Get Started"
              className="w-full h-[60px] mt-1 mb-6 px-3 py-2 border border-black rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="topic goal" className="text-sm font-medium mb-3">
              Topic Goal
            </label>
            <input
              type="text"
              id="topic goal"
              placeholder="understand baking basics"
              className="rounded-lg px-3  py-2 border border-black h-[60px] focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="flex flex-col ">
            <label htmlFor="video" className="text-sm font-medium mb-3 block">
              Course Video
            </label>
            <div className="w-full px-3 py-6  bg-white h-[140px] rounded-md text-center cursor-pointer hover:border-blue-500">
              <div
                className="flex flex-col items-center justify-center border border-dashed border-black p-3 "
                onChange={handleImageChange}
              >
                <GrCloudUpload className="text-blue-800 w-10 h-10 " />
                <span className="text-gray-500">
                  Drag & drop files or
                  <span className="text-blue-500 ml-1">Browse </span>
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <label htmlFor="overview" className="text-sm font-medium mb-3">
              Overview
            </label>
            <textarea
              id="overview"
              placeholder="In this topic, our focus will be..."
              className="px-3 py-2 border border-black h-[140px] rounded-lg focus:outline-none focus:border-blue-500"
              rows={4}
            />
          </div>
          <div className="items-center gap-2 flex">
            <RxSwitch className="w-10 h-10 text-[#483EA8] mr-2" />

            <h1 className="font-semibold">Enable transcription</h1>
          </div>
        </div>
        <div className="">
          <h1 className="font-semibold mt-3">Content</h1>
          <div className="w-full bg-white rounded-lg mt-3">
            <ReactQuill
              value={overview}
              onChange={handleOverviewChange}
              className="bg-white"
              theme="snow"
              modules={{
                toolbar: [
                  [{ header: "1" }, { header: "2" }, { font: [] }],
                  [{ size: [] }],
                  ["bold", "italic", "underline", "strike", "blockquote"],
                  [
                    { list: "ordered" },
                    { list: "bullet" },
                    { indent: "-1" },
                    { indent: "+1" },
                  ],
                  ["link", "image", "video"],
                  ["clean"],
                ],
              }}
            />
          </div>
        </div>
      </div>
      <div className=" flex mt-7 mb-5 justify-end">
        <div className="flex gap-2 bg-black w-[180px] h-[40px] px-9 py-7 items-center justify-center rounded-lg">
          <Image src="/plus.svg" alt="add topic" width={20} height={20} />

          <p className="text-white">Add topic</p>
        </div>
      </div>
    </div>
  );
};
export default CourseUpload;
