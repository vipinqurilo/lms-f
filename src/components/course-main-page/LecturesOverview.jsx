"use client";

import React, { useEffect, useRef, useState } from "react";
import Heading from "./Heading";
import { BiPlayCircle, BiSolidLockAlt } from "react-icons/bi";
import Link from "next/link";
import { useSelector } from "react-redux";
import { formatDuration } from "@/utils/TimeFormat";
import LectureItem from "./LectureItem";

const LecturesOverview = ({ data, id }) => {
  const { enrolledCourses } = useSelector((state) => state.courses);
  // const totalSeconds = data?.reduce((total, module) => {
  //   return (
  //     total +
  //     module.lessons.reduce((sum, lesson) => {
  //       return sum + parseInt(lesson?.duration);
  //     }, 0)
  //   );
  // }, 0);

  const details = [
    {
      name: "Total Lectures",
      value: data?.reduce((acc, item) => acc + (item?.lessons?.length || 0), 0),
    },
    {
      name: "Attachments",
      value: data?.reduce(
        (acc, module) =>
          acc +
          (module.lessons?.reduce(
            (lessonAcc, lesson) =>
              lessonAcc + (lesson.attachements?.length || 0),
            0
          ) || 0),
        0
      ),
    },
    // {
    //   name: "Duration",
    //   value: formatDuration(totalSeconds),
    // },
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  const [height, setHeight] = useState(0);
  const contentRefs = useRef([]);

  const toggleSection = (index) => {
    if (activeIndex === index) {
      setActiveIndex(null);
      setHeight(0);
    } else {
      setActiveIndex(index);
      setTimeout(() => {
        if (contentRefs.current[index]) {
          setHeight(contentRefs.current[index].scrollHeight);
        }
      }, 50);
    }
  };

  useEffect(() => {
    toggleSection(0);
  }, []);

  return (
    <div className="course-sub-container">
      <Heading data={"Course Content "} />
      <div className="flex items-center justify-between text-sm">
        {details?.map((item, index) => (
          <p key={index}>
            {item?.name}: <span className="font-bold">{item?.value}</span>
          </p>
        ))}
      </div>
      <div className="w-full space-y-4">
        {data?.map((section, index) => (
          <div className="w-full">
            <button
              onClick={() => toggleSection(index)}
              className="flex justify-between items-center w-full font-medium text-lg text-left bg-secondary/5 p-2 px-4 rounded border border-black/10"
            >
              <span className="font-[700] text-base">
                {index + 1}. {section?.moduleTitle}
              </span>
              <svg
                className={`transition-transform ${
                  activeIndex === index ? "-rotate-0" : "-rotate-90"
                }`}
                fill="none"
                height={24}
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
                width={24}
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>
            <div
              className="transition-all ease-in-out duration-500 overflow-hidden"
              style={{
                maxHeight: activeIndex === index ? `${height}px` : "0px",
              }}
              ref={(el) => (contentRefs.current[index] = el)}
            >
              {section?.lessons?.map((lecture, i) => {
                const isAccessible =
                  enrolledCourses?.some((item) => item === id) ||
                  (i === 0 && index === 0);

                return (
                  <div
                    key={i}
                    className="w-full md:flex md:items-center md:justify-between px-2 py-2 md:py-4"
                  >
                    <LectureItem
                      i={i}
                      index={index}
                      isAccessible={isAccessible}
                      lecture={lecture}
                    />
                    {/* <p
                      className={`font-medium ${
                        isAccessible ? "text-light" : "text-light/60"
                      } text-sm`}
                    >
                      {formatDuration(lecture?.duration)}
                    </p> */}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LecturesOverview;
