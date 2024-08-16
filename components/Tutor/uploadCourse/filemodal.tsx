import React from "react";
interface FileModalProps {
  isModalOpen: boolean;
  closeModal: () => void;
  confirmType: () => void;
}
const FileModal = ({
  isModalOpen,
  closeModal,
  confirmType,
}: FileModalProps) => {
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
            className="mr-2"
          />
          <label htmlFor="link">Link</label>
          <br />
          <input
            type="radio"
            name="fileType"
            id="powerpoint"
            value="powerpoint"
            className="mr-2"
          />
          <label htmlFor="powerpoint">PowerPoint Presentation</label>
          <br />
          <input
            type="radio"
            name="fileType"
            id="doc"
            value="doc"
            className="mr-2"
          />
          <label htmlFor="doc">Document (PDF)</label>
          <br />
        </div>

        <div className="flex justify-center items-center mt-4">
          <button
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
