import React from "react";
import { HiOutlineChartBar } from "react-icons/hi2";

const Analytics = () => {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-gray-300 bg-[#E7E8EA] px-6 py-16 text-center sm:py-20">
      <HiOutlineChartBar className="h-8 w-8 text-gray-500" />
      <p className="text-base font-semibold text-gray-800 sm:text-lg">
        Analytics coming soon
      </p>
      <p className="max-w-sm text-sm text-gray-600">
        Insights into learner progress and engagement for this course will show up here.
      </p>
    </div>
  );
};

export default Analytics;
