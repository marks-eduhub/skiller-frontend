import React from "react";
import { RiArrowDropDownLine } from "react-icons/ri";

const Profile: React.FC = () => {
  return (
    <div className="flex flex-col justify-between gap-10">
      <div className="">
        <div className="py-4 font-[400] text-[14px] sm:text-[22px]">Phone</div>
        <div className="grid grid-cols-3 gap-3">
          <div className="flex flex-cols-2 justify-between fieldBoxShadow bg-[#F9F9F9] rounded-[14px] px-3 py-3 ">
            {/* <input placeholder=" +256 " type="text" className="bg-[#F9F9F9] col-span-1" /> */}
            <div className="col-span-1">+256</div>
            <div className="col-span-1">
              {" "}
              <RiArrowDropDownLine size={30} color="grey" />
            </div>
          </div>
          <input
            placeholder="772024843"
            type="text"
            className="col-span-2 fieldBoxShadow bg-[#F9F9F9] rounded-[14px] px-3 "
          />
        </div>
      </div>
      {/* row 2 gender */}
      <div className="">
        <div className="py-4 font-[400] text-[14px] sm:text-[22px]">Gender</div>
        <div className="grid grid-cols-3 gap-3">
          <input
            placeholder="Male"
            type="text"
            className="col-span-3 fieldBoxShadow bg-[#F9F9F9] rounded-[14px] px-3 py-3"
          />
        </div>
      </div>

      {/* row 3 date of birth */}
      <div className="">
        <div className="py-4 font-[400] text-[14px] sm:text-[22px]">
          Date of birth
        </div>
        <div className="grid grid-cols-3 gap-2">
          <input
            placeholder="DD"
            type="text"
            className="fieldBoxShadow bg-[#F9F9F9] rounded-[14px] px-3 py-3"
          />
          <input
            placeholder="MM"
            type="text"
            className="fieldBoxShadow bg-[#F9F9F9] rounded-[14px] px-3"
          />
          <input
            placeholder="YYYY"
            type="text"
            className="fieldBoxShadow bg-[#F9F9F9] rounded-[14px] px-3"
          />
        </div>
      </div>
    </div>
  );
};

export default Profile;
