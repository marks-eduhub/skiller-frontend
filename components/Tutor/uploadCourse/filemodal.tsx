import React, { useState } from "react";

interface FileModalProps {
  isModalOpen: boolean;
  closeModal: () => void;
  confirmType: (fileType: string) => void;
}

const FileModal = ({
  isModalOpen,
  closeModal,
  confirmType,
}: FileModalProps) => {
  const [selectedFileType, setSelectedFileType] = useState<string>("");

  const handleFileTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFileType(e.target.value);
  };

  const handleConfirm = () => {
    confirmType(selectedFileType);
    closeModal();
  };

  if (!isModalOpen) return null;

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
            onChange={handleFileTypeChange}
            className="mr-2"
          />
          <label htmlFor="link">Link</label>
          <br />
          <input
            type="radio"
            name="fileType"
            id="powerpoint"
            value="application/vnd.openxmlformats-officedocument.presentationml.presentation"
            onChange={handleFileTypeChange}
            className="mr-2"
          />
          <label htmlFor="powerpoint">PowerPoint Presentation</label>
          <br />
          <input
            type="radio"
            name="fileType"
            id="doc"
            value="application/pdf"
            onChange={handleFileTypeChange}
            className="mr-2"
          />
          <label htmlFor="doc">Document (PDF)</label>
          <br />
        </div>

        <div className="flex justify-center items-center mt-4">
          <button
            onClick={handleConfirm}
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
