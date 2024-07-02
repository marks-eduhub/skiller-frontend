"use client";
import React, { useState } from "react";
import Image from "next/image";

const ProfilePage: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
  };

  return (
    <div className="max-md:p-0 max-md:pr-4 sm:pl-10 items-center sm:w-1/2">
      <h2 className="font-bold text-[30px] mb-3 max-md:mt-0">Profile</h2>
      <p>
        Add your personal details as you would like them to appear on your
        profile
      </p>

      <div className="h-[200px] border border-gray-200 rounded-lg mb-5 mt-5 items-center">
        <div className="flex items-center justify-center my-3">
          {image ? (
            <Image
              src={image}
              alt="Profile"
              width={120}
              height={120}
              className="rounded-full object-cover"
            />
          ) : (
            <Image
              src="/Ellipse 445.webp"
              alt=""
              width={120}
              height={120}
              className="rounded-full"
            />
          )}
          <div className="flex flex-col gap-5 ml-9">
            <input
              type="file"
              accept="image/*"
              id="file-upload"
              className="hidden"
              onChange={handleImageChange}
            />
            <label
              htmlFor="file-upload"
              className="bg-black text-white rounded-md px-4 py-1 cursor-pointer text-center"
            >
              Change Photo
            </label>
            <button
              onClick={handleRemoveImage}
              className="bg-white text-black border border-black rounded-md px-4 py-1"
            >
              Remove Photo
            </button>
          </div>
        </div>
        <p className="ml-4 italic mt-2 text-[14px]">
          Maximum size: 1MB. Supported formats: JPG, GIF or PNG
        </p>
      </div>

      <div className="items-center justify-center">
        <form className="space-y-4">
          <div className="flex flex-col md:flex-row md:space-x-10">
            <div className="flex-1">
              <label
                htmlFor="first-name"
                className="w-[100px] text-sm font-medium"
              >
                First Name
              </label>
              <input
                type="text"
                id="first-name"
                required
                className="mt-1 w-[300px] rounded-lg block px-3 py-2 border border-gray-200 mb-6 bg-inherit"
              />
            </div>
            <div className="flex-1">
              <label
                htmlFor="last-name"
                className="text-sm w-[100px] font-medium"
              >
                Last Name
              </label>
              <input
                type="text"
                id="last-name"
                required
                className="mt-1 w-[300px] block rounded-lg px-3 py-2 border border-gray-200 mb-6 bg-inherit"
              />
            </div>
          </div>
        </form>

        <div>
          <h2>Biography</h2>
        </div>
        <div className="border-2 border-gray-200 sm:w-[640px] rounded-lg h-[150px] mt-3 mb-9">
          <div className="items-center border border-b-2 border-gray-200 sm:w-[638px] h-[40px] py-2">
            <span className="italic font-bold ml-7">B</span>
            <span className="italic font-bold ml-7">I</span>
          </div>
        </div>
        <div className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">Social Media</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label htmlFor="email" className="text-sm font-medium mb-3">
                Email
              </label>
              <input
                type="text"
                id="email"
                placeholder="placeholder"
                className="rounded-lg px-3 py-2 border border-gray-300"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="facebook" className="text-sm font-medium mb-3">
                Facebook
              </label>
              <input
                type="text"
                id="facebook"
                placeholder="placeholder"
                className="rounded-lg px-3 py-2 border border-gray-300"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="twitter" className="text-sm font-medium mb-3">
                Twitter/X
              </label>
              <input
                type="text"
                id="twitter"
                placeholder="placeholder"
                className="rounded-lg px-3 py-2 border border-gray-300"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="linkedin" className="text-sm font-medium mb-3">
                LinkedIn
              </label>
              <input
                type="text"
                id="linkedin"
                placeholder="placeholder"
                className="rounded-lg px-3 py-2 border border-gray-300"
              />
            </div>
          </div>
        </div>
        <button className="px-4 py-2 rounded-lg w-1/2 font-bold bg-[#D9D9D9]">
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
