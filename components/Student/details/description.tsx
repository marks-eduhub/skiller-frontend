import React from "react";
import { BsBookmarkCheck, BsFillShareFill } from "react-icons/bs";

const Description = () => {
  return (
    <div className="bg-[#F5F5F5] ">
      <div className="flex flex-col md:flex-row gap-9 pt-9 ">
        <div className="mb-2 ml-3  bg-[#FFF] max-md:w-[320px] w-[800px] h-[600px] max-md:ml-5">
          <div className="ml-5 mt-8 mr-3">
            <h1 className="">
              Lorem ipsum dolor sit amet consectetur. Orci faucibus proin
              interdum eleifend condimentum tellus. Purus ut rutrum ultrices
              malesuada purus tempor massa sagittis. Vulputate at ut vitae vitae
              vel odio.osuere tellus suspendisse. </h1>
              
              <h1 className="mt-8">A quisque metus maecenas diam
              viverra facilisis ultricies. Massa enim faucibus eu iaculis
              integer eget. Turpis ultricies faucibus elementum aliquet viverra
              eget enim scelerisque. Rhoncus diam amet et at ut tincidunt varius
              viverra.</h1>
              
              <h1 className="mt-8"> Etiam molestie enim netus proin. Faucibus dignissim
              faucibus morbi nunc cursus dui netus maecenas. Sed mauris quis
              auctor quisque consequat eget vehicula ut. Fermentum tincidunt
              integer a aliquet amet vulputate nulla. Dignissim risus mi
              adipiscing amet. Quam ligula consectetur non ut libero et massa.
              Nisi ullamcorper mauris ut nec. Et donec nullam pellentesque
              fringilla semper volutpat augue.
            </h1>
          </div>
        </div>
        <div className="flex flex-col mr-8 pb-10">
          <div className="flex items-center justify-between gap-8 sm:mt-0 mt-20">
            <button className="rounded-t-md  rounded-b-md border border-black bg-white px-8 py-2 ml-5   md:p-20 md:py-2 md:ml-0 hover:bg-gray-600 focus:outline-none flex items-center">
              <BsBookmarkCheck className="text-lg" />
              <span className="ml-2">Save</span>
            </button>
            <button className="rounded-t-md rounded-b-md border border-black bg-white px-8 py-2 md:p-20 md:py-2  hover:bg-gray-600 focus:outline-none flex items-center">
              <BsFillShareFill className="text-lg " />
              <span className="ml-2">Share</span>
            </button>
          </div>
          <div className="bg-[#ffffff8e] flex flex-col justify-center md:w-570 h-[500px] items-center mt-7 max-md:w-[320px] max-md:ml-5">
            <h2 className="font-bold">Screenshots go here</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Description;
