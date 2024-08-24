import React, { useState } from "react";

interface FileModalProps {
  isModalOpen: boolean;
  closeModal: () => void;
  handleFileChange: (file: File | null) => void;
  handleTextChange: (text: string) => void;
}

const FileModal = ({
  handleFileChange,
  handleTextChange,
  isModalOpen,
  closeModal,
}: FileModalProps) => {
  const [selectedFileType, setSelectedFileType] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [text, setText] = useState<string>("");

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
  };

  const handleContinue = () => {
    if (selectedFileType === "link") {
      handleTextChange(text);
    } else {
      handleFileChange(file);
    }
    closeModal(); 
  };


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-5 rounded-lg shadow-lg w-[90%] max-w-md">
        <h2 className="text-xl font-semibold mb-4">Select File Type</h2>

        <div>
          <input
            type="radio"
            name="fileType"
            id="link"
            value="link"
            className="mr-2"
            onChange={() => setSelectedFileType("link")}
          />
          <label htmlFor="link">Link</label>
          <br />
          <input
            type="radio"
            name="fileType"
            id="powerpoint"
            className="mr-2"
            onChange={() => setSelectedFileType("powerpoint")}
          />
          <label htmlFor="powerpoint">PowerPoint Presentation</label>
          <br />
          <input
            type="radio"
            name="fileType"
            id="doc"
            className="mr-2"
            onChange={() => setSelectedFileType("doc")}
          />
          <label htmlFor="doc">Document (PDF)</label>
          <br />
        </div>

        {selectedFileType === "link" && (
          <div className="mt-4">
            <input
              type="text"
              placeholder="Enter URL"
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="mt-2 w-full p-2 border rounded"
            />
          </div>
        )}

        {selectedFileType !== "link" && selectedFileType && (
          <div className="mt-4">
            <input
              type="file"
              onChange={handleFileInputChange}
              accept={
                selectedFileType === "doc"
                  ? "application/pdf"
                  : selectedFileType === "powerpoint"
                  ? "application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation"
                  : undefined
              }
              className="mt-2"
            />
          </div>
        )}

        <div className="flex justify-center items-center mt-4">
          <button
            onClick={handleContinue}
            className="px-4 py-2 bg-black text-white rounded"
          >
            Continue
          </button>
          <button
            onClick={closeModal}
            className="px-4 py-2 bg-gray-300 text-black rounded ml-2"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default FileModal;
