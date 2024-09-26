import React, { useState, useCallback, useMemo } from "react";
import Image from "next/image";
import FileModal from "./filemodal";
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const Step3 = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploadFile, setUploadFile] = useState<string | null>(null);

  const [tab, setTab] = useState("RESOURCES");
  const handleTab = (tabName: string) => {
    setTab(tabName);
  };

  const handleFileChange = (file: File | null) => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadFile(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleTextChange = (text: string) => {
    console.log("Received text input:", text);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const imageHandler = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: "1" }, { header: "2" }, { font: [] }],
          [{ size: [] }],
          ["bold", "italic", "underline", "strike", "blockquote"],
          [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
          ],
          ["link", "image"],
          ["clean"],
        ],
        handlers: {
          image: imageHandler,
        },
      },
    }),
    [imageHandler]
  );

  return (
    <div className="relative flex flex-col">
      <div className="mb-10">
        <div className="flex items-center justify-center mt-3 mb-5 w-full sm:gap-72 gap-20">
          <div
            className={`${
              tab === "RESOURCES"
                ? "border-b-2 sm:w-56 w-36 border-black  flex justify-center"
                : "text-gray-400"
            } cursor-pointer`}
            onClick={() => handleTab("RESOURCES")}
          >
            <h1 className="text-center">RESOURCES</h1>
          </div>
          <div
            className={`${
              tab === "QUIZZES"
                ? "border-b-2 sm:w-56 w-36 border-black flex justify-center"
                : "text-gray-400"
            } cursor-pointer`}
            onClick={() => handleTab("QUIZZES")}
          >
            <h1 className="text-center">QUIZZES</h1>
          </div>
        </div>

        {tab === "RESOURCES" && (
          <div>
            <label className="block sm:text-sm font-medium mb-6 sm:mt-6">
              Add instructions on how to use the resources
            </label>
            <ReactQuill
              modules={modules}
              formats={[
                "header",
                "font",
                "size",
                "bold",
                "italic",
                "underline",
                "strike",
                "blockquote",
                "list",
                "bullet",
                "indent",
                "link",
                "image",
              ]}
              className="bg-white h-40 mb-10"
            />

            <div className="w-full sm:h-[100px] h-[90px] sm:mt-20 mt-36 bg-gray-300 cursor-pointer">
              <div className="flex items-center justify-center gap-1 p-9">
                <Image src="/pluss.svg" alt="plus" width={20} height={20} />
                <h1 className="font-semibold text-[18px]">Add resources</h1>
              </div>
            </div>
          </div>
        )}

        {tab === "QUIZZES" && (
          <div className="w-full sm:h-[100px] h-[90px] mt-10 bg-gray-300 cursor-pointer">
            <div className="flex items-center justify-center gap-1 p-9">
              <Image src="/pluss.svg" alt="plus" width={20} height={20} />
              <h1 className="font-semibold text-[18px]">Add a quiz</h1>
            </div>
          </div>
        )}
        {isModalOpen && (
          <FileModal
            closeModal={handleModalClose}
            handleFileChange={handleFileChange}
            handleTextChange={handleTextChange}
            isModalOpen={isModalOpen}
          />
        )}
      </div>
    </div>
  );
};

export default Step3;
