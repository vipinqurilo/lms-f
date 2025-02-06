"use client";

import React from "react";
import { FaCheck } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";
import { IoDocumentText, IoVideocam, IoBook, IoCash } from "react-icons/io5";
import { useSelector } from "react-redux";

const stepsData = [
  {
    id: 1,
    title: "Basic Information",
    icon: IoDocumentText,
    color: "text-blue-500",
  },
  { id: 2, title: "Course Media", icon: IoVideocam, color: "text-green-500" },
  { id: 3, title: "Curriculum", icon: IoBook, color: "text-purple-500" },
  { id: 4, title: "Pricing & Access", icon: IoCash, color: "text-orange-500" },
];

const AddCourseProcess = () => {
  const { step } = useSelector((state) => state.instructor.course);

  return (
    <div className="w-full grid grid-cols-4 px-10 py-5 gap-6">
      {stepsData?.map((item, index) => (
        <div key={index} className="flex items-center gap-6 text-nowrap">
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
            {item?.title}
          </p>
          {index !== stepsData?.length - 1 && (
            <>
              <div
                className={`w-full border-[1.5px] rounded-l-lg ${
                  step > item?.id && "border-green-500 border-dashed"
                } ${
                  step === item?.id
                    ? "border-background"
                    : "border-gray-300 border-dashed"
                } transition-custom`}
              ></div>
              {/* <span>
                <IoIosArrowBack
                  className={`rotate-180 -ml-[15px] text-lg ${
                    step >= item?.id ? "text-background" : "text-gray-300"
                  }`}
                />
              </span> */}
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default AddCourseProcess;
