import React, { useState, useEffect } from "react";

interface QualificationsDropdownProps {
  value: string;
  onChange: (value: string) => void;
  options?: string[];
  label?: string;
  required?: boolean;
  className?: string;
}

const DEFAULT_OPTIONS = [
  "Bachelors",
  "Masters",
  "Business",
  "PhD",
  "Diploma",
  "Certificate",
  "Associate",
  "High School",
  "Other",
];

const QualificationsDropdown: React.FC<QualificationsDropdownProps> = ({
  value,
  onChange,
  options = DEFAULT_OPTIONS,
  label = "Qualifications",
  required = false,
  className = "",
}) => {
  const [selected, setSelected] = useState<string>(value);
  const [customValue, setCustomValue] = useState<string>(
    value && !options.includes(value) ? value : ""
  );

  useEffect(() => {
    if (options.includes(value)) {
      setSelected(value);
      setCustomValue("");
    } else if (value) {
      setSelected("Other");
      setCustomValue(value);
    }
  }, [value, options]);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    setSelected(val);
    if (val === "Other") {
      setCustomValue("");
      onChange(""); 
    } else {
      setCustomValue("");
      onChange(val);
    }
  };

  const handleCustomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomValue(e.target.value);
    onChange(e.target.value);
  };

  return (
    <div className={`flex items-center gap-4 ${className}`}>
      {label && (
        <label className="block text-sm mb-1 font-medium">
          {label}
          {required }
        </label>
      )}
      <select
        className="border ml-4 border-black rounded-lg bg-[#F9F9F9] px-3 py-2 outline-none"
        value={selected}
        onChange={handleSelectChange}
        required={required}
      >
        <option value="" disabled>
          Select qualification
        </option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
      {selected === "Other" && (
        <input
          type="text"
          className=" border border-black rounded-lg bg-[#F9F9F9] px-3 py-2 outline-none"
          placeholder="Please specify"
          value={customValue}
          onChange={handleCustomChange}
          required={required}
        />
      )}
    </div>
  );
};

export default QualificationsDropdown;