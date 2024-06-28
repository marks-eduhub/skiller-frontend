import React from "react";
import Image from "next/image";
import ProductContainer from "../courseCards/cardContainer";
import { courses } from "../HomePage/dummyData.json";

const DraguleSwaib = () => {
  const SwaibCourses = courses.filter(
    (course) => course.instructor === "Dragule Swaib"
  );
  const images = [
    { src: "/twitter.svg", alt: "sms" },
    { src: "/linkedln.svg", alt: "sms" },
    { src: "/facebook.svg", alt: "sms" },
    { src: "/tweet.svg", alt: "sms" },
  ];

  return (
    <div className="pl-10 sm:pl-0">
      <div className="flex mb-5 flex-col sm:w-full w-[345px] rounded-lg sm:px-4 p-2 sm:py-6 border border-black sm:h-[400px] h-auto relative">
        <div className="flex flex-col sm:flex-row items-start sm:gap-7 gap-3 mt-5">
          <Image
            src="/swaib.svg"
            alt="dragule"
            width={150}
            height={150}
            className="flex-shrink-0"
          />
          <div className="flex flex-col sm:mt-6 mt-3">
            <h1 className="font-semibold text-[20px] mb-3">Dragule Swaib</h1>
            <h2 className="text-gray-600 sm:mb-3 flex flex-wrap items-center space-x-2">
              Connect with Dragule Swaib:
              {images.map((image, index) => (
                <Image
                  key={index}
                  src={image.src}
                  alt={image.alt}
                  width={20}
                  height={20}
                  className="mx-1 sm:mx-3 sm:my-0 my-1"
                />
              ))}
            </h2>
            <h2 className="mt-3 sm:mt-0">
              <span className="underline">Qualifications:</span>
              <span className="text-gray-600 sm:ml-2">
                Masters&apos; Degree in Science, PHD in Physiology
              </span>
            </h2>
          </div>
        </div>
        <div className="mt-5 sm:mt-10">
          <p className="mb-5">
            Lorem ipsum dolor sit amet consectetur. Orci faucibus proin interdum
            eleifend condimentum tellus. Purus ut rutrum ultrices malesuada
            purus tempor massa sagittis. Vulputate at ut vitae vitae vel odio.
            osuere tellus suspendisse.
          </p>
          <p className="mt-5">
            A quisque metus maecenas diam viverra facilisis ultricies. Massa
            enim faucibus eu iaculis integer eget. Turpis ultricies faucibus
            elementum aliquet viverra eget enim scelerisque. Rhoncus diam amet
            et at ut tincidunt varius viverra.
          </p>
        </div>
      </div>
      <div className="mt-8">
        <h1 className="mb-6">Courses by Dragule Swaib</h1>
        <ProductContainer courses={SwaibCourses} />
      </div>
    </div>
  );
};

export default DraguleSwaib;
