import React, { useState, useEffect } from "react";
import { message } from "antd";


interface RatingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (rating: number) => void;
  setComment: React.Dispatch<React.SetStateAction<string>>;
  setRating: React.Dispatch<React.SetStateAction<number>>;
  comment:string
 
}

const RatingModal: React.FC<RatingModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  setComment,
  comment
 
}) => {
  
  const[Loading, setLoading] = useState(false)
  
  const [rating, setRating] = useState(0);

  useEffect(() => {
    if (!isOpen) {
      setRating(0);
    }
  }, [isOpen]);
  const handleSubmit = () => {
        if (rating === 0) {
      message.warning("Please select a rating before submitting.");
      return;
    }

    onSubmit(rating); 
    onClose();
  };

  return (
    isOpen && (
      <div className="fixed inset-0  z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-96">
          <h2 className="text-lg font-semibold mb-4">Rate This Course 😀</h2>
          <div className="flex justify-center space-x-2 mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setRating(star)}
                className={`text-2xl ${
                  rating >= star ? "text-yellow-400" : "text-gray-300"
                }`}
              >
                ★
              </button>
            ))}
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
          <div className="flex justify-end space-x-2">
            <button className="px-4 py-2 bg-gray-300 rounded" onClick={onClose}>
              Cancel
            </button>
            <button
              className="px-4 py-2 bg-blue-900 text-white rounded"
              onClick={handleSubmit}
              disabled={Loading}
            >
              {Loading ? "Submitting..." : "Submit"}
            </button>
          </div>
        </div>
       
      </div>
    )
  );
};

export default RatingModal;
