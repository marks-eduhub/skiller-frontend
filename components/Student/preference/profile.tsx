import React from "react";
import { RiArrowDropDownLine } from "react-icons/ri";

const Profile: React.FC = () => {
  return (
    <div className="flex flex-col justify-between gap-10">
      <div className="">
        <label className="py-4 font-[400] text-[14px] sm:text-[22px]">Phone</label>
        <div className="grid grid-cols-3 gap-3">
          <div className="flex flex-cols-2 justify-between  bg-inherit rounded-md border border-gray-600 px-3 py-3 ">
            <label className="col-span-1">+256</label>
            <div className="col-span-1">
              <RiArrowDropDownLine size={30} color="grey" />
            </div>
          </div>
          <input
            placeholder="772024843"
            type="text"
            className="col-span-2  bg-inherit rounded-md border border-gray-600 px-3 "
          />
        </div>
      </div>
      <label className=" text-[14px] sm:text-[22px]">
        Gender
      </label>
      <div className="flex items-center ">
        <select className="flex-1 bg-inherit border border-gray-600 rounded-md py-3 px-4 ">
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>

      <div className="">
        <label className="py-4 font-[400] text-[14px] sm:text-[22px]">
          Date of birth
        </label>
        <div className="grid grid-cols-3 gap-2">
          <input
            placeholder="DD"
            type="text"
            className=" bg-inherit rounded-md border border-gray-600 px-3 py-3"
          />
          <input
            placeholder="MM"
            type="text"
            className=" bg-inherit rounded-md border border-gray-600 px-3"
          />
          <input
            placeholder="YYYY"
            type="text"
            className=" bg-inherit rounded-md border border-gray-600 px-3"
          />
        </div>
      </div>
    </div>
  );
};

export default Profile;
