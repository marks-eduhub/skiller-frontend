import React from "react";
interface StepTrackerProps {
    currentStep: number;
  }
const StepTracker: React.FC<StepTrackerProps> = ({ currentStep }) => {
    const steps = [
        { number: 1, label: 'Step 1' },
        { number: 2, label: 'Step 2' },
        { number: 3, label: 'Step 3' },
      ];
      return (
        <div className="flex justify-between items-center mb-8">
          {steps.map((step, index) => (
            <div key={index} className="flex-1 flex items-center">
              <div
                className={`w-10 h-10 flex items-center justify-center rounded-full ${
                  currentStep >= step.number
                    ? 'bg-black text-white'
                    : 'bg-gray-300 text-gray-600'
                }`}
              >
                {step.number}
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`flex-1 h-1 ${
                    currentStep > step.number ? 'bg-black' : 'bg-gray-300'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      );
  };
  export default StepTracker;      