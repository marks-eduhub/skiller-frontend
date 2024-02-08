import React from 'react';

const Profile: React.FC = () => {
  return (
    <div className="flex flex-wrap">
      <div className="w-full sm:w-1/2">
        <div className="flex flex-col items-start">
          <div className="font-[400] text-[14px] sm:text-[22px]">Email</div>
          <input
            placeholder="black@gmail.com"
            type="text"
            className="fieldBoxShadow bg-[#F9F9F9] rounded-[14px] px-3 py-[0.7rem] sm:py-[1.3rem] w-full sm:w-[20rem]"
          />
        </div>
      </div>
      <div className="w-full sm:w-1/2">
        <div className="flex flex-col items-start">
          <div className="font-[400] text-[14px] sm:text-[22px]">Email</div>
          <input
            placeholder="black@gmail.com"
            type="text"
            className="fieldBoxShadow bg-[#F9F9F9] rounded-[14px] px-3 py-[0.7rem] sm:py-[1.3rem] w-full sm:w-[20rem]"
          />
        </div>
      </div>
      <div className="w-full sm:w-1/2">
        <div className="flex flex-col items-start">
          <div className="font-[400] text-[14px] sm:text-[22px]">Email</div>
          <input
            placeholder="black@gmail.com"
            type="text"
            className="fieldBoxShadow bg-[#F9F9F9] rounded-[14px] px-3 py-[0.7rem] sm:py-[1.3rem] w-full sm:w-[20rem]"
          />
        </div>
      </div>
      <div className="w-full sm:w-1/2">
        <div className="flex flex-col items-start">
          <div className="font-[400] text-[14px] sm:text-[22px]">Email</div>
          <input
            placeholder="black@gmail.com"
            type="text"
            className="fieldBoxShadow bg-[#F9F9F9] rounded-[14px] px-3 py-[0.7rem] sm:py-[1.3rem] w-full sm:w-[20rem]"
          />
        </div>
      </div>
    </div>
  );
};

export default Profile;