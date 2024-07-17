import React from "react";
import data from "./data.json";
import Image from "next/image";

const Community = () => {
  const { members, categories } = data.data;

  return (
    <div className="flex gap-10 mt-10 w-full">
      <div className="w-[80%]">
        {members.map((member, index) => (
          <div
            key={index}
            className="flex flex-col border mb-5 rounded-lg py-6 border-black h-auto"
          >
            <div className="flex flex-col pl-3 border-b pb-2 border-gray-400">
              <h1 className="font-semibold">
                Question: <span className="font-normal">{member.Question}</span>
              </h1>
              <p className="text-gray-500">{member.name}</p>
            </div>
            <div className="flex mt-5 relative items-center pl-3">
              <Image
                src={member.image}
                alt={member.name}
                width={70}
                height={70}
                className="rounded-full"
              />
              <p className="pl-3">{member.name2}</p>
            </div>
            <h1 className="mt-5 pl-3">{member.answer}</h1>
            <p className="text-gray-400 pl-3 underline">{member.other}</p>
          </div>
        ))}
      </div>
      <div className="w-[20%] h-[500px] border border-black">
        <div className="flex flex-col">
          <h1 className="bg-gray-300 p-3">Course Categories</h1>
          <div className="p-2">
            {categories.map((category, index) => (
              <p key={index} className="p-2">
                {category}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;
