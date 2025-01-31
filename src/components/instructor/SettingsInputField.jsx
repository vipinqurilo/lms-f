import React from "react";
import Select from "react-select";
import { Controller } from "react-hook-form";

const SettingsInputField = ({
  label,
  name,
  placeholder,
  register,
  errors,
  isSelect = false,
  options,
  control,
}) => {
  return (
    <div className="space-y-2">
      <label
        htmlFor={label}
        className="block text-sm font-medium text-gray-700"
      >
        {label}
      </label>
      <div className="">
        {isSelect ? (
          <Controller
            name={name}
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                options={options}
                styles={{
                  control: (baseStyles, state) => ({
                    ...baseStyles,
                    borderColor: state.isFocused ? "#e36760" : "grey",
                  }),
                }}
              />
            )}
          />
        ) : (
          <input
            id={label}
            className="mt-1 block px-4 py-2  w-full rounded-md border-gray-300 shadow-sm focus:border-primary    focus:ring-[1px] focus:ring-primary ring-[1px] ring-gray-200 outline-none"
            {...register(name, { required: `${name} is required` })}
            placeholder={placeholder}
          />
        )}
        {errors[name] && (
          <span className="text-sm text-red-500">*{errors[name]?.message}</span>
        )}
      </div>
    </div>
  );
};

export default SettingsInputField;
