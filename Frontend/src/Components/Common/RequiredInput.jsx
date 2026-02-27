import React from "react";
import { BiShow } from "react-icons/bi";
const RequiredInput = ({
  name,
  type = "text",

  placeholder = "",
  className = "",
  inputClass = "",
  errorName,
  errorMessage,
  ...rest
}) => {
  return (
    <div className={`flex gap-2 flex-col mb-4 ${className}`}>
      <label htmlFor={name} className="mb-1 font-semibold ">
        {name} <span className="text-red-500">*</span>
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        className={`border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${inputClass}`}
        {...rest}
      />
      {errorName && <p style={{ color: "red" }}>{errorMessage}</p>}
    </div>
  );
};

export default RequiredInput;
