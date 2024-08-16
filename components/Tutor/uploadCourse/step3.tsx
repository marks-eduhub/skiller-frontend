import React, { useState, useCallback, useMemo } from "react";
import ReactQuill from "react-quill";
import Image from "next/image";
import FileModal from "./filemodal";
import "react-quill/dist/quill.snow.css";

const Step3 = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  //useCallback ensures that this function is not recreated on every render, which helps prevent unnecessary re-renders.
  const imageHandler = useCallback(() => {
    setIsModalOpen(true); 
  }, []);

  //Memoizes the modules object to ensure it doesn't get recreated on every render. It only updates if imageHandler changes, which helps maintain stable references and prevents unnecessary re-renders of ReactQuill.
  const modules = useMemo(() => ({
    toolbar: {
      container: [
        [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
        [{ 'size': [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
        ['link', 'image'], 
        ['clean'],
      ],
      handlers: {
        image: imageHandler
      }
    }
  }), [imageHandler]);

  return (
    <div className="relative flex flex-col">
      <div className="mb-10">
        <label className="block text-sm font-medium mb-6 mt-6">
          Add instructions on how to use the resources
        </label>
        <ReactQuill
          modules={modules}
          formats={[
            'header', 'font', 'size', 'bold', 'italic', 'underline', 'strike', 
            'blockquote', 'list', 'bullet', 'indent', 'link', 'image'
          ]}
          className="bg-white h-40 mb-10"
        />
      </div>
      <div className="w-full h-[100px] bg-gray-300 cursor-pointer">
        <div className="flex items-center justify-center gap-1 p-9">
          <Image src="/pluss.svg" alt="plus" width={20} height={20} />
          <h1 className="font-semibold text-[18px]">Add resources</h1>
        </div>
      </div>
      {isModalOpen && (
        <FileModal
          closeModal={handleModalClose}
          confirmType={handleModalClose}
          isModalOpen={isModalOpen}
        />
      )}
    </div>
  );
};

export default Step3;
