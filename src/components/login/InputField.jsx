import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";

const InputField = ({ register, name, label, placeHolder, errors, type }) => {
  const [showPassword, setshowPassword] = useState(false);
  const togglePassword = () => setshowPassword(!showPassword);

  const getIconCss = () => {
    return "text-xl text-gray-300 absolute top-[50%] right-2 translate-y-[-50%] cursor-pointer";
  };

  const toggleType = () => (showPassword ? "text" : "password");

  const validationRules = {
    required: `*${name} is required`,
    ...(type === "email" && {
      pattern: {
        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
        message: "*Invalid email format",
      },
    }),
  };

  return (
    <div className="">
      <label htmlFor={name} className="text-light mb-2 block font-medium">
        {label}
      </label>
      <div className="relative">
        <input
          type={type === "password" ? toggleType() : type}
          id={name}
          {...register(name, validationRules)}
          className="w-full border border-black/10 p-3 rounded px-4 focus:outline-secondary transition-custom"
          placeholder={placeHolder}
        />
        {type === "password" && (
          <>
            {showPassword ? (
              <FaEye className={`${getIconCss()}`} onClick={togglePassword} />
            ) : (
              <FaEyeSlash
                className={`${getIconCss()}`}
                onClick={togglePassword}
              />
            )}
          </>
        )}
      </div>
      {errors[name] && (
        <span className="text-xs text-red-500">{errors[name].message}</span>
      )}
    </div>
  );
};

export default InputField;
