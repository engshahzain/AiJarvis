import React from "react";
import { BiShow } from "react-icons/bi";
const RequiredInput = ({
  name,
  type = "text",

  placeholder = "",
  className = "",
  inputClass = "",
  autoComplete,
  errorName,
  errorMessage,
  ...rest
}) => {
  return (
    <div className={`flex gap-2 flex-col mb-4 ${className}`}>
      {name && (
        <label htmlFor={name} className="mb-1 font-semibold capitalize">
          {name} <span className="text-red-500">*</span>
        </label>
      )}

      <input
        id={name}
        name={name}
        type={type}
        autoComplete={autoComplete}
        placeholder={placeholder}
        className={`border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${inputClass}`}
        {...rest}
      />
      {errorName && <p style={{ color: "red" }}>{errorMessage}</p>}
    </div>
  );
};

export default RequiredInput;
