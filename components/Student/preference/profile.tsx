import React, { useEffect, useState } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// List of country codes
const countryCodes = [
  // { code: "+1", country: "USA" },
  // { code: "+44", country: "UK" },
  // { code: "+91", country: "India" },
  { code: "+256", country: "Uganda" },
  { code: "+254", country: "Kenya" },
];
interface ProfileProps {
  updateForm(newData: any): void;
}
const Profile: React.FC<ProfileProps> = ({ updateForm }) => {
  const [selectedCode, setSelectedCode] = useState(countryCodes[0].code); // Default to +256
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState<Date | null>(null);
  const [errors, setErrors] = useState({ phone: "", gender: "", dob: "" });

  // Validate inputs before submission
  const validate = () => {
    let valid = true;
    let newErrors = { phone: "", gender: "", dob: "" };

    if (!/^\d{7,15}$/.test(phone)) {
      newErrors.phone = "Invalid phone number (7-15 digits required)";
      valid = false;
    }

    if (!gender) {
      newErrors.gender = "Please select a gender";
      valid = false;
    }

    if (!dob || dob > new Date()) {
      newErrors.dob = "Enter a valid date of birth";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  // const handleSubmit = (e: any) => {
  //   e.preventDefault();
  //   if (validate()) {
  //     // console.log("Form submitted successfully!", {
  //     //   selectedCode,
  //     //   phone,
  //     //   gender,
  //     //   dob,
  //     // });
  //     updateForm({
  //       selectedCode:selectedCode,
  //       phone:phone,
  //       gender:gender,
  //       date_birth: dob,
  //       isLoading: false,
  //     });
  //   }
  // };

  useEffect(() => {
    updateForm({
      phone: selectedCode + phone,
      gender,
      date_birth: dob,
    });
  }, [phone, gender, dob]);

  return (
    <form className="flex flex-col gap-6">
      {/* Phone Input */}
      <div>
        <label className="py-2 font-medium text-[16px] sm:text-[20px]">
          Phone
        </label>
        <div className="flex flex-col md:flex-row gap-4">
          {/* Country Code Dropdown */}
          <div className="relative flex items-center border border-gray-600 rounded-md px-3 py-3">
            <select
              value={selectedCode}
              onChange={(e) => setSelectedCode(e.target.value)}
              className="bg-transparent focus:outline-none"
            >
              {countryCodes.map((item) => (
                <option key={item.code} value={item.code}>
                  {item.code} ({item.country})
                </option>
              ))}
            </select>
          </div>

          {/* Phone Number Input */}
          <div className="flex w-full">
            <input
              type="text"
              placeholder="772024843"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full bg-inherit rounded-md border border-gray-600 px-3 py-3"
            />
          </div>
        </div>
        {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
      </div>

      {/* Gender Selection */}
      <div>
        <label className="text-[16px] sm:text-[20px]">Gender</label>
        <select
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          className="w-full bg-inherit border border-gray-600 rounded-md py-3 px-4"
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        {errors.gender && (
          <p className="text-red-500 text-sm">{errors.gender}</p>
        )}
      </div>

      {/* Date of Birth (Date Picker) */}
      <div>
        <label className="py-2 font-medium text-[16px] sm:text-[20px] w-full">
          Date of Birth
        </label>
        <div className="relative w-full   bg-inherit border rounded-md   border-gray-600">
          <DatePicker
            selected={dob}
            onChange={(date: any) => setDob(date)}
            dateFormat="dd/MM/yyyy"
            showYearDropdown
            scrollableYearDropdown
            yearDropdownItemNumber={100}
            maxDate={new Date()} // Restricts future dates
            placeholderText="Select your date of birth"
            className="w-full focus:outline-none py-3 px-4 bg-inherit"
          />
        </div>
        {errors.dob && <p className="text-red-500 text-sm">{errors.dob}</p>}
      </div>

      {/* Submit Button */}
    </form>
  );
};

export default Profile;
