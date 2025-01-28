import React, { useEffect, useRef, useState } from "react";
import Heading from "./Heading";
import { BiPlayCircle } from "react-icons/bi";

const LecturesOverview = ({ data }) => {
  const details = [
    {
      name: "Total Lectures",
      value: data?.totals,
    },
    {
      name: "Duratin",
      value: data?.totalDuration,
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
    <div data-aos="zoom-out" className="course-sub-container">
      <Heading data={"Course Content "} />
      <div className="flex items-center justify-between text-sm">
        {details?.map((item, index) => (
          <p key={index}>
            {item?.name}: <span className="font-bold">{item?.value}</span>
          </p>
        ))}
      </div>
      <div className="w-full space-y-4">
        {data?.sections?.map((section, index) => (
          <div className="w-full">
            <button
              onClick={() => toggleSection(index)}
              className="flex justify-between items-center w-full font-medium text-lg text-left bg-secondary/5 p-2 px-4 rounded border border-black/10"
            >
              <span className="font-[700] text-base">
                {index + 1}. {section?.title}
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
              {section?.lectures?.map((lecture, i) => (
                <div key={i} className="w-full md:flex md:items-center md:justify-between px-2 py-2 md:py-4">
                  <h6 className="flex items-start gap-1">
                    <BiPlayCircle className="text-secondary text-lg" />
                    <span className="-mt-[2px] font-medium">
                      Lecture{index + 1}.{i + 1} {lecture?.title}
                    </span>
                  </h6>
                  <p className="font-medium text-light text-sm">{lecture?.duration}</p>
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
