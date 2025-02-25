import React, { useEffect, useRef, useState } from "react";
import Heading from "./Heading";
import { BiPlayCircle } from "react-icons/bi";
import Link from "next/link";

const LecturesOverview = ({ data }) => {
  // Convert "HH:MM" to total minutes
  const getMinutes = (time) => {
    const [hours, minutes] = time.split(":").map(Number);
    return hours * 60 + minutes;
  };

  // Reduce to get total minutes
  const totalMinutes = data && data?.reduce((acc, module) => {
    return (
      acc +
      module.lessons.reduce((lessonAcc, lesson) => {
        return lessonAcc + getMinutes(lesson.duration);
      }, 0)
    );
  }, 0);

  // Convert total minutes back to HH:MM format
  const totalHours = Math.floor(totalMinutes / 60);
  const remainingMinutes = totalMinutes % 60;
  const formattedDuration = `${String(totalHours).padStart(2, "0")}:${String(
    remainingMinutes
  ).padStart(2, "0")}`;

  const details = [
    {
      name: "Total Lectures",
      value: data?.reduce(
        (acc, item) => acc + (item?.lessons?.length || 0),
        0
      ),
    },
    {
      name: "Duratin",
      value: formattedDuration,
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  const [height, setHeight] = useState(0);
  const contentRef = useRef(null);

  const toggleSection = (index) => {
    if (activeIndex === index) {
      setActiveIndex(null);
      setHeight(0);
    } else {
      setActiveIndex(index);
      setHeight(contentRef.current.scrollHeight);
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
              ref={contentRef}
            >
              {section?.lessons?.map((lecture, i) => (
                <div
                  key={i}
                  className="w-full md:flex md:items-center md:justify-between px-2 py-2 md:py-4"
                >
                  <h6 className="flex items-start gap-1">
                    <BiPlayCircle className="text-secondary text-lg" />
                    <Link href={lecture?.video} target="_blank" className="-mt-[2px] font-medium hover:text-secondary transition-custom">
                      Lecture{index + 1}.{i + 1} {lecture?.lessonTitle}
                    </Link>
                  </h6>
                  <p className="font-medium text-light text-sm">
                    {lecture?.duration}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LecturesOverview;
