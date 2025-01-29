import React from "react";

export default function Heading({
  heading,
  desc,
  position,
  descWidth,
  paddingX,
}) {
  return (
    <div className={`  text-${position ? position : "center"} `}>
      <h2 className="md:text-4xl text-[28px] leading-8 font-extrabold ">
        {heading}
      </h2>
      <p
        className={`mt-4 md:w-${descWidth ? descWidth : "full"} md:px-[${
          paddingX ? paddingX : "4"
        }]  text-[15px] md:text-base font-semibold text-gray-500`}
      >
        {desc}
      </p>
    </div>
  );
}
