import React from "react";
import Image from "next/image";
import data from "./data.json"

const CourseOverview = () => {
  const content = data.content;
  return (
    <div className="">
      <div className="flex flex-col gap-2">
        <h1 className="text-xl mt-10 font-semibold">Brief Introduction</h1>
        <p>
          Condimentum cras tincidunt odio non. Sed dolor justo urna nibh sit
          enim ac. Mattis cras mauris interdum lacus morbi. Velit leo non at
          enim in. Eu duis a arcu cras sagittis adipiscing sit feugiat
          facilisis. Arcu ridiculus et in quam vulputate. Nulla gravida est
          tincidunt quam nec in fusce eros. Orci habitant sed leo amet sit. Urna
          vitae sed mattis malesuada nunc et.
        </p>
      </div>
      <div className="flex flex-col gap-2">
        <h1 className="text-xl mt-10 font-semibold">What you&apos;ll learn</h1>

        <div className="flex">
          <Image src="/tick1.svg" width={20} height={20} alt="tick" />
          <p className="ml-2">
            Lorem ipsum dolor sit amet consectetur. Magna malesuada a diam
            sapien urna turpis enim. Dignissim curabitur tincidunt facilisi
            egestas sem metus lacinia a.
          </p>
        </div>
        <div className="flex">
          <Image src="/tick1.svg" width={20} height={20} alt="tick" />
          <p className="ml-2">
            Enim enim ipsum amet amet erat. Imperdiet blandit cursus et mauris
            mi fames in. Facilisis in mauris fringilla netus
          </p>
        </div>
        <div className="flex">
          <Image src="/tick1.svg" width={20} height={20} alt="tick" />
          <p className="ml-2">
            Erat mauris commodo leo ac ac id. Faucibus fringilla lectus nec ac
            phasellus.
          </p>
        </div>
        <div className="flex">
          <Image src="/tick1.svg" width={20} height={20} alt="tick" />
          <p className="ml-2">
            Lorem ipsum dolor sit amet consectetur. Magna malesuada a diam
            sapien urna turpis enim. Dignissim curabitur tincidunt facilisi
            egestas sem metus lacinia a.
          </p>
        </div>
        <h1 className="text-xl mt-10 font-semibold">Requirements</h1>
        <p>A well functioning computer, a notepad and an art book. </p>
      </div>
      <h1 className="text-xl mt-10 font-semibold mb-4">Course Content</h1>
      <div className="w-full h-auto border border-black">
        <div className="flex justify-between bg-gray-300 p-6 m-3">
          <h1 className="font-semibold">Course Topics</h1>
          <h1 className="font-semibold">Duration</h1>
        </div>

        <div className="divide-y divide-gray-300">
          {content.map((item, index) => (
            <div
              key={index}
              className="flex items-center w-full justify-between p-6"
            >
              <h1 className="font-semibold">{item.title}</h1>
              <h1 className="font-semibold">{item.duration}</h1>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default CourseOverview;
