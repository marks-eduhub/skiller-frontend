import React, { useState, useCallback, useMemo } from "react";
import Image from "next/image";
import FileModal from "./filemodal";
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const Step3 = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fileInputAccept, setFileInputAccept] = useState("");

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleFileTypeSelection = (fileType: string) => {
    setFileInputAccept(fileType);
    setIsModalOpen(false);
    document.getElementById("fileInput")?.click();
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
          [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
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

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    // if (file) {
    //   // Handle file upload logic here
    //   console.log("Selected file:", file);
    // }
  };

  return (
    <div className="relative flex flex-col">
      <div className="mb-10">
        <label className="block text-sm font-medium mb-6 mt-6">
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
      </div>
      <div className="w-full h-[100px] bg-gray-300 cursor-pointer">
        <div
          className="flex items-center justify-center gap-1 p-9"
          onClick={() => setIsModalOpen(true)}
        >
          <Image src="/pluss.svg" alt="plus" width={20} height={20} />
          <h1 className="font-semibold text-[18px]">Add resources</h1>
        </div>
      </div>
      <input
        type="file"
        id="fileInput"
        accept={fileInputAccept}
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
      {isModalOpen && (
        <FileModal
          closeModal={handleModalClose}
          confirmType={handleFileTypeSelection}
          isModalOpen={isModalOpen}
        />
      )}
    </div>
  );
};

export default Step3;
