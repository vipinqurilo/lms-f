"use client";

import React from "react";
import { IoIosArrowBack } from "react-icons/io";
import { useSelector } from "react-redux";

const stepsData = [
  {
    id: 1,
    title: "Basic Information",
    icon: "📄",
  },
  {
    id: 2,
    title: "Course Media",
    icon: "🎥",
  },
  {
    id: 3,
    title: "Curriculum",
    icon: "📚",
  },
  {
    id: 4,
    title: "Pricing & Access",
    icon: "💰",
  },
];

const AddCourseProcess = () => {
  const { step } = useSelector((state) => state.instructor.course);

  return (
    <div className="w-full grid grid-cols-4 px-10 py-5 gap-1">
      {stepsData?.map((item, index) => (
        <div key={index} className="flex items-center gap-1 text-nowrap">
          <p className={`${
                  step === item?.id ? "text-background font-bold" : "text-gray-600 font-medium"
                }`}>
            {item?.icon} {item?.title}
          </p>
          {index !== stepsData?.length - 1 && (
            <>
              <div
                className={`w-full h-[2px] rounded-l-lg ${
                  step === item?.id ? "bg-background" : "bg-gray-300"
                } transition-custom`}
              ></div>
              <span>
                <IoIosArrowBack className={`rotate-180 -ml-[15px] text-lg ${
                  step === item?.id ? "text-background" : "text-gray-300"
                }`} />
              </span>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default AddCourseProcess;
