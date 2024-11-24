import React, { useState, useCallback, useMemo } from "react";
import Image from "next/image";
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";
import Link from "next/link";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const Step3 = () => {
  return (
    <div className="relative flex flex-col">
      <div className="mb-10">
        <div className="flex items-center justify-center mt-3 mb-5 w-full sm:gap-72 gap-20">
          <div
            className={
              "sm:w-56 w-36flex justify-center,text-gray-400, cursor-pointer"
            }
          >
            <h1 className="text-center">QUIZZES</h1>
          </div>
        </div>

        <div className="w-full sm:h-[100px] h-[90px] mt-10 bg-gray-300 cursor-pointer">
          <div className="flex items-center justify-center gap-1 p-9">
            <Image src="/pluss.svg" alt="plus" width={20} height={20} />
            <Link href="/tutor/dashboard/setQuiz">
              <h1 className="font-semibold text-[18px]">Add a quiz</h1>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step3;
