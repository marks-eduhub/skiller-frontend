import Image from "next/image";
import data from "./data.json";
import { useState } from "react";
import Profile from "./profile";
import Splash from "../splash";
import withAuth from "@/components/AuthProvider/Auth";

interface MyComponentProps {
  data2: {
    currentIndex: number;
  };
  updateForm(newData: any): void;
  updatePreferences(newData: any): void;
}

interface MyOptionsProps {
  updatePreferences(newData: any): void;
}
const Options: React.FC<MyOptionsProps> = ({ updatePreferences }) => {
  const options = data.preference_options || {};
  const [selected, setSelected] = useState<string[]>([]);

  const handleOptionClick = (option: string) => {
    let newSelected;
    if (selected.includes(option)) {
      newSelected = selected.filter((item) => item !== option);
    } else {
      newSelected = [...selected, option];
    }
    setSelected(newSelected);
    updatePreferences(newSelected);
  };

  return (
    <div className="flex flex-wrap">
      {options.map((option, index) => (
        <div
          key={index}
          className={`rounded-[7px] border-2 border-gray-500 m-2 p-2 ${
            selected.includes(option)
              ? "bg-black text-white"
              : "bg-white text-black"
          }`}
          onClick={() => handleOptionClick(option)}
        >
          {option}
        </div>
      ))}
    </div>
  );
};

const Content: React.FC<MyComponentProps> = ({
  data2,
  updateForm,
  updatePreferences,
}) => {
  return (
    <>
      <div className="col-span-1 row-span-2"></div>
      <div className="col-span-2  row-span-2 ">
        {data2.currentIndex === 0 && <Profile updateForm={updateForm} />}
        {data2.currentIndex === 1 && (
          <Options updatePreferences={updatePreferences} />
        )}
        {data2.currentIndex === 2 && <Splash />}
      </div>
      <div className="col-span-1  row-span-2"></div>
    </>
  );
};

export default withAuth(Content);
