import React, { useState } from "react";
import Image from "next/image";
import { GrCloudUpload } from "react-icons/gr";
import { RxSwitch } from "react-icons/rx";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import CustomModal from "./modal";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

interface TopicProps {
  name: string;
  deleteTopic: () => void;
}

const Topic: React.FC<TopicProps> = ({ name, deleteTopic }) => {
  const [expanded, setExpanded] = useState(false);
  const [uploadImage, setUploadImage] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const confirmDelete = () => {
    deleteTopic();
    closeModal();
  };

  return (
    <div className="flex flex-col mt-5 mb-5 cursor-pointer">
      <h1 className="font-semibold mb-1 text-[20px]">{name}</h1>
      <div className="w-full h-[100px] bg-[#E9E9E9] mt-3">
        <div
          onClick={toggleExpanded}
          className="flex items-center justify-between p-9 relative"
        >
          <h1 className="font-bold text-[20px]">Get Started</h1>
          <div
            className={`transition-transform duration-200 transform ${
              expanded ? "rotate-90" : ""
            }`}
          >
            <Image src="/closedarrow.svg" alt="arrow" width={10} height={10} />
          </div>
        </div>
      </div>
      {expanded && (
        <div className="p-4 w-full h-auto bg-[#E9E9E9]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label htmlFor="title" className="text-sm font-medium mb-3 block">
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
              <label htmlFor="topic-goal" className="text-sm font-medium mb-3">
                Topic Goal
              </label>
              <input
                type="text"
                id="topic-goal"
                placeholder="understand baking basics"
                className="rounded-lg px-3 py-2 border border-black h-[60px] focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="video" className="text-sm font-medium mb-3 block">
                Course Video
              </label>
              <div className="w-full px-3 py-6 bg-white h-[140px] rounded-md text-center cursor-pointer hover:border-blue-500">
                <div className="flex flex-col items-center justify-center border border-dashed border-black p-3 relative">
                  <GrCloudUpload className="text-blue-800 w-10 h-10" />
                  <span className="text-gray-500">
                    Drag & drop files or
                    <span className="text-blue-500 ml-1 cursor-pointer">
                      Browse
                    </span>
                  </span>
                  <input
                    type="file"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    onChange={handleImageChange}
                  />
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
          <div>
            <h1 className="font-semibold mt-3">Content</h1>
            <div className="w-full bg-white rounded-lg mt-3">
              <ReactQuill
                placeholder="Write content here"
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
            <button
              onClick={openModal}
              className="px-6 py-2 bg-black text-white rounded-lg mt-5"
            >
              Delete Topic
            </button>
          </div>
        </div>
      )}
      <CustomModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={confirmDelete}
      />
    </div>
  );
};

export default Topic;
