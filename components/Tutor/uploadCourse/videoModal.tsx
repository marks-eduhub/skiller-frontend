import React from "react";
interface VideoModalProps {
  onClose: () => void;
  onDelete: () => void;
}
const VideoModal: React.FC<VideoModalProps> = ({ onClose, onDelete }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-5 rounded-lg shadow-lg w-[90%] max-w-md">
        <h2 className="text-xl font-semibold mb-4">Confirm Action</h2>
        <p className="mb-6">To edit topic video you need to first delete existing video</p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-red-900 text-white rounded hover:bg-red-900"
            onClick={onDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoModal;
