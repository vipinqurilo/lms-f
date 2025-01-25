"use client";

import React from "react";
import { useForm } from "react-hook-form";

export default function ContactusForm() {
  const inputBox = [
    {
      label: "Name",
      name: "name",
      placeHolder: "Enter Your Name",
      validation: { required: "Name is required" },
    },
    {
      label: "Phone no.",
      name: "phone",
      placeHolder: "Enter Your Phone no",
      validation: {
        required: "Phone number is required",
        pattern: {
          value: /^[0-9]{10}$/,
          message: "Invalid phone number. Enter 10 digits.",
        },
      },
    },
    {
      label: "E-mail",
      name: "email",
      placeHolder: "Enter Your E-mail",
      validation: {
        required: "Email is required",
        pattern: {
          value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
          message: "Invalid email address",
        },
      },
    },
    {
      label: "Message",
      name: "message",
      placeHolder: "Enter Your Message",
      validation: { required: "Message is required" },
    },
  ];

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full h-full px-2 flex flex-col justify-between gap-5"
    >
      <div className="flex flex-col lg:grid lg:grid-cols-2 gap-5">
        {inputBox.map((item, index) => (
          <div
            key={index}
            className={`w-full flex flex-col gap-1 ${
              (item.label === "Message" || item?.name === "email") &&
              "col-span-2"
            }`}
          >
            <label className="block text-sm text-light">{item.label}</label>
            {item.label === "Message" ? (
              <textarea
                placeholder={item.placeHolder}
                className={`focus:outline-none border border-gray-300 rounded-md w-full p-2 h-40 resize-none ${
                  errors[item.name] ? "border-red-500" : ""
                }`}
                {...register(item.name, item.validation)}
              ></textarea>
            ) : (
              <input
                type="text"
                placeholder={item.placeHolder}
                className={`focus:outline-none border border-gray-300 rounded-md w-full p-2 px-4 ${
                  errors[item.name] ? "border-red-500" : ""
                }`}
                {...register(item.name, item.validation)}
              />
            )}
            {errors[item.name] && (
              <span className="text-red-500 text-xs">
                {errors[item.name].message}
              </span>
            )}
          </div>
        ))}
      </div>
      <button
        type="submit"
        className="bg-secondary text-white p-2 rounded-md hover:bg-black transition-custom lg:w-fit lg:self-start md:px-4"
      >
        Submit
      </button>
    </form>
  );
}
