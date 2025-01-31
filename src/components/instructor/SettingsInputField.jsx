import React from "react";

const SettingsInputField = ({ label, name, placeholder, register, errors }) => {
  return (
    <div className="space-y-2">
      <label
        htmlFor={label}
        className="block text-sm font-medium text-gray-700"
      >
        {label}
      </label>
      <div className="">
        <input
          id={label}
          className="mt-1 block px-4 py-2  w-full rounded-md border-gray-300 shadow-sm focus:border-primary    focus:ring-[1px] focus:ring-primary ring-[1px] ring-gray-200 outline-none"
          {...register(name, { required: `${name} is required` })}
          placeholder={placeholder}
        />
        {errors[name] && (
          <span className="text-sm text-red-500">*{errors[name]?.message}</span>
        )}
      </div>
    </div>
  );
};

export default SettingsInputField;
