"use client";

import React from "react";
import { FaCheck } from "react-icons/fa";
import { useSelector } from "react-redux";

const steps = [
  {
    id: 1,
    title: "PERSONAL INFO",
    active: false,
    completed: true,
  },
  {
    id: 2,
    title: "Indentity",
    active: false,
    completed: true,
  },
  {
    id: 3,
    title: "Subject and Language",
    active: false,
    completed: true,
  },
  {
    id: 4,
    title: "Experience",
    active: true,
    completed: false,
  },
  {
    id: 5,
    title: "CONFIRMATION",
    active: false,
    completed: false,
  },
];

const TeacherRegistrationProcess = () => {
  const { processStep: step } = useSelector((state) => state.tutors);

  return (
    <div className="flex items-center lg:grid lg:grid-cols-1 lg:w-[20%] gap-0 lg:gap-0 h-fit w-fit mx-auto">
      {steps?.map((item, index) => (
        <div key={index} className="flex lg:flex-col lg:items-start items-center gap-0 lg:gap-0 text-nowrap">
          <p
            className={`${step > item?.id && "text-green-500 font-bold"} ${
              step >= item?.id
                ? "text-background font-bold"
                : "text-gray-600 font-medium"
            } flex items-center gap-2`}
          >
            <span
              className={`w-9 h-9 rounded-full flex items-center justify-center ${
                step > item?.id
                  ? "text-green-500 bg-green-100"
                  : step === item?.id
                  ? "bg-secondary/40 text-white"
                  : "text-gray-500 bg-gray-100"
              }`}
            >
              <span
                className={`w-6 h-6 rounded-full flex items-center justify-center ${
                  step > item?.id
                    ? "text-green-500 bg-green-300"
                    : step === item?.id
                    ? "bg-secondary text-white"
                    : "text-gray-500 bg-gray-300"
                }`}
              >
                {step > item?.id ? (
                  <FaCheck />
                ) : step === item?.id ? (
                  step
                ) : (
                  item?.id
                )}
              </span>
            </span>
            <span className="lg:block hidden">{item?.title}</span>
          </p>
          {index !== steps?.length - 1 && (
            <>
              <div
                className={`w-8 lg:h-20 lg:ml-[17px] lg:w-0 border-[1.5px] rounded-l-lg ${
                  step > item?.id && "border-green-500 border-dashed "
                } ${
                  step === item?.id
                    ? "border-background"
                    : "border-gray-300 border-dashed"
                } transition-custom`}
              ></div>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default TeacherRegistrationProcess;
