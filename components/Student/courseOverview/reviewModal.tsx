import React, { useState } from "react";

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (rating: number, comment: string) => void;
  setComment: React.Dispatch<React.SetStateAction<string>>;
  setRating: React.Dispatch<React.SetStateAction<number>>;
  isPosting: boolean;
  userId: number;
  courseId: number;
  rating: number;
  comment: string;
}

const ReviewModal: React.FC<ReviewModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  setComment,
  setRating,
  isPosting,
  rating,
  comment,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-lg sm:w-96 w-72">
        <h2 className="text-lg font-bold mb-4">
          Leave a Review and rating of the course
        </h2>

        <div className="mb-4">
          <div className="flex mb-2">
            <div className="flex space-x-2">
              {Array.from({ length: 5 }, (_, index) => (
                <span
                  key={index}
                  className={`text-2xl cursor-pointer ${
                    index < rating ? "text-yellow-400" : "text-gray-300"
                  }`}
                  onClick={() => setRating(index + 1)}
                >
                  ★
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mb-4">
          <textarea
            placeholder="Write your review here..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg"
            rows={4}
          />
        </div>

        <div className="flex justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-red-700 rounded-md text-white"
          >
            Cancel
          </button>
          <button
            onClick={() => onSubmit(rating, comment)}
            className="px-4 py-2 bg-gray-700 text-white rounded-md"
            disabled={isPosting}
          >
            {isPosting ? "Posting..." : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewModal;
