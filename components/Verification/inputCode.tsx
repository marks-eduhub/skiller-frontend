import React, { useState, useRef } from "react";

const InputCode = ({ length, loading, onComplete }:any) => {
  const [code, setCode] = useState([...Array(length)].map(() => ""));
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const inputs = useRef<(HTMLInputElement | null)[]>([]);

  const processInput = (e:any, slot:number) => {
    const num = e.target.value;
    if (/[^0-9]/.test(num)) return;
    const newCode = [...code];
    newCode[slot] = num;
    setCode(newCode);
    if (slot !== length - 1) {
      inputs.current[slot + 1]?.focus();
    }
    if (newCode.every(num => num !== "")) {
      onComplete(newCode.join(""));
    }
  };

  const onKeyUp = (e:any, slot:number) => {
    if (e.keyCode === 8 && !code[slot] && slot !== 0) {
      const newCode = [...code];
      newCode[slot - 1] = "";
      setCode(newCode);
      inputs.current[slot - 1]?.focus();
    }
  };

  const handleFocus = (index:number) => {
    setFocusedIndex(index);
  };

  const handleBlur = () => {
    setFocusedIndex(null);
  };

  return (
    <div className="flex items-center flex-row gap-6 justify-start">
      {code.map((num, idx) => (
        <div key={idx} className="relative ">
          <input
            type="text"
            inputMode="numeric"
            className="w-[4rem] h-[4rem] text-center text-xl border flex items-center rounded-md fieldBoxShadow"
            maxLength={1}
            value={num}
            autoFocus={!code[0].length && idx === 0}
            readOnly={loading}
            onChange={(e) => processInput(e, idx)}
            onKeyUp={(e) => onKeyUp(e, idx)}
            onFocus={() => handleFocus(idx)}
            onBlur={handleBlur}
            ref={(ref) => {
              inputs.current[idx] = ref;
            }}
          />
          {focusedIndex !== idx && !num && (
            <div className="absolute bottom-3 border-b-[3px] left-[40%] border-[#808080] w-3"/>
          )}
        </div>
      ))}
    </div>
  );
};

export default InputCode;
