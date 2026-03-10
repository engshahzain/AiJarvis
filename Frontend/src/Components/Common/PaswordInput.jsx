import React, { useState } from "react";
import { BiShow } from "react-icons/bi";
import { GrHide } from "react-icons/gr";
const PaswordInput = ({
  name,
  placeholder = "",
  className = "",
  inputClass = "",
  autoComplete,
  errorName,
  errorMessage,
  ...rest
}) => {
  const [showpassword, setshowPassword] = useState(false);
  return (
    <div className={`flex gap-2 flex-col mb-4 ${className}`}>
      <label htmlFor={name} className="mb-1 font-semibold ">
        {name} <span className="text-red-500">*</span>
      </label>
      <div className="w-full relative">
        <input
          id={name}
          autoComplete={autoComplete}
          name={name}
          type={showpassword ? "text" : "password"}
          placeholder={placeholder}
          className={`border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 ${inputClass}`}
          {...rest}
        />{" "}
        <span
          onClick={() => setshowPassword(!showpassword)}
          className="absolute top-3 cursor-pointer right-5 text-black"
        >
          {showpassword ? <GrHide /> : <BiShow />}
        </span>
        {errorName && <p style={{ color: "red" }}>{errorMessage}</p>}
      </div>
    </div>
  );
};

export default PaswordInput;
