import React, { useState, useEffect } from "react";
import { message } from "antd";
import { courseRating } from "@/hooks/useSubmit";
import { useMutation } from "@tanstack/react-query";
import { useAuthContext } from "@/Context/AuthContext";
import { useParams } from "next/navigation";

interface RatingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (rating: number) => void;
 
}

const RatingModal: React.FC<RatingModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
 
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
