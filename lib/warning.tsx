import React, { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

interface WarningProps {
  testId: number;
  isFirstAttempt: boolean;
  isLastAttempt: boolean;
  onClose: () => void;
  onStartTest: () => void;
  MAX_ATTEMPTS: number;
}

const WarningModal: React.FC<WarningProps> = ({
  testId,
  isFirstAttempt,
  isLastAttempt,
  onClose,
  onStartTest,
  MAX_ATTEMPTS,
}) => {
  const [show, setShow] = useState(true);
  const searchParams = useSearchParams();
  const topicId = searchParams.get("topicId");
  const handleClose = () => {
    setShow(false);
    onClose();
  };

  const handleStartTest = () => {
    onStartTest();
    setShow(false);
  };

  return (
    show && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-6 rounded-lg w-[90%] max-w-md">
          <div className="flex justify-between items-center mb-4 ">
            <h2 className="text-lg font-semibold text-red-500">WARNING</h2>
          </div>
          <div className="mb-4">
            {isFirstAttempt
              ? `There is a maximum number of ${MAX_ATTEMPTS} attempts for this test. Please be aware that if you reach the limit, you won't be able to reattempt.`
              : isLastAttempt
              ? `This is your last attempt for this test.`
              : null}
          </div>
          <div className="flex justify-between p-2">
            <button onClick={handleClose} className="bg-gray-300 px-5 rounded">
              Close
            </button>
            <Link
              href={`/dashboard/quizreview?topicId=${topicId}&testId=${testId}`}
            >
              <button
                onClick={handleStartTest}
                className="bg-gray-300 px-4 py-1 rounded"
              >
                Continue
              </button>
            </Link>
          </div>
        </div>
      </div>
    )
  );
};

export default WarningModal;
