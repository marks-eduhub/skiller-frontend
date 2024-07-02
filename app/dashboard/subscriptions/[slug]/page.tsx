"use client";
import React from "react";
import Image from "next/image";
import MichaelKizito from "@/components/Student/TutorInformation/michael";
import DraguleSwaib from "@/components/Student/TutorInformation/swaib";

const SubscriptionPage = ({ params }: { params: { slug: string } }) => {
  const { slug } = params;

  const subOptionsContent: { [key: string]: JSX.Element } = {
    michaelkizito: (
      <div className="flex ">
      <MichaelKizito/>

      </div>
      
    ),

    draguleswaib: (
      <div className="items-center flex justify-center">
        <DraguleSwaib/>
      </div>
    ),
  };

  // Check if the selected sub-option exists in subOptionsContent
  const content = subOptionsContent[slug as string];

  if (!content) {
    return <div>Sub-option not found</div>;
  }

  return (
    <div className="pt-5 ">
      
      {content}
    </div>
  );
};

export default SubscriptionPage;
