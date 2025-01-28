import React from "react";

export default function Heading({ heading, desc, position, descWidth }) {
  return (
    <div className={`  text-${position ? position : "center"} `}>
      <h2 className="md:text-4xl text-[28px] font-bold ">{heading}</h2>
      <p
        className={`mt-4 md:w-${
          descWidth ? descWidth : "full"
        } text-[15px] md:text-base font-semibold text-gray-500`}
      >
        {desc}
      </p>
    </div>
  );
}
