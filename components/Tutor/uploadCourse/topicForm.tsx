import React, { useState } from "react";
import Image from "next/image";
import { GrCloudUpload } from "react-icons/gr";
import { RxSwitch } from "react-icons/rx";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import CustomModal from "../topicUpload/modal";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

interface TopicProps {
  name: string;
  deleteTopic: () => void;
}
const TopicForm: React.FC<TopicProps> = ({ name, deleteTopic }) => {
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
      <div className="w-full h-[100px] bg-gray-300 mt-3 ">
        <div
          onClick={toggleExpanded}
          className="flex items-center justify-between p-9 relative"
        >
          <h1 className="font-bold text-[20px]">{name}</h1>
          <div
            className={`transition-transform duration-200 transform ${
              expanded ? "rotate-90" : ""
            }`}
          >
            {/* <Image src="/closedarrow.svg" alt="arrow" width={10} height={10} /> */}
            <Image src="/edit.svg" alt="arrow" width={20} height={20} />

          </div>
        </div>
      </div>
      {expanded && (
        <div className="p-4 w-full h-auto bg-gray-300 rounded-md overflow-hidden break-words">
          <div className="mt-5 flex items-center w-full">
            <label className="flex-shrink-0">Topic name</label>
            <input
              type="text"
              className="border ml-5 border-black w-full bg-[#F9F9F9] px-3 py-2 outline-none"
            />
          </div>
          <div className="mb-10 mt-4 ">
            <label className="block text-sm font-medium mb-4 mt-6">
              Enter a brief description about the topic
            </label>
            <div className="bg-white w-full overflow-hidden">
              <ReactQuill
                placeholder="Write content here"
                className="bg-white h-[200px]"
              />
            </div>
          </div>
          <div>
            <div className="mb-6 mt-10">
              <label className="block text-sm font-medium mb-4 mt-20">
                What will the student learn?
              </label>
              <div className="bg-white w-full overflow-hidden">
                <ReactQuill
                  placeholder="Write content here"
                  className="bg-white h-[200px]"
                />
              </div>
            </div>
          </div>
          <div>
            <div className="mt-20">
              <h1>Upload Video</h1>
              <div
                className="flex flex-col mt-5 items-center justify-center border border-dashed border-black p-3 relative h-[200px] rounded"
                onChange={handleImageChange}
              >
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
                />
              </div>
            </div>
            <div className="flex justify-between items-center my-4">
              <button
                onClick={openModal}
                className="bg-black text-white rounded-md py-2 px-4"
              >
                Delete Topic
              </button>

              <button className="border border-black justify-end mb-4 py-2 px-4 flex items-center  rounded w-[150px] ">
                Save changes
              </button>
            </div>
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

export default TopicForm;
