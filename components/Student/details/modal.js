import React from 'react';

const CustomModal = ({ isOpen, onClose, onConfirm}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 sm:pr-0 pr-6">
      <div className="bg-white p-5 rounded-lg shadow-lg sm:w-[90%] max-w-[350px]">
        <h2 className="text-xl font-semibold mb-4">Confirm Submitting</h2>
        <p className="mb-6">Once you submit you cant change your answers</p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-900 text-white rounded hover:bg-red-900"
          >
            Confirm
          </button>
        </div>
      </div>
      
    </div>
  );
};

export default CustomModal;
