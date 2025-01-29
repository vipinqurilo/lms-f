import React from "react";

export default function Heading({
  heading,
  desc,
  position,
  descWidth,
  paddingX,
}) {
  return (
    <div className={`${position}`}>
      <h2 className="md:text-4xl text-[28px] leading-8 font-extrabold ">
        {heading}
      </h2>
      <p
        className={`mt-4 ${descWidth} ${paddingX} text-[15px] md:text-base font-semibold text-gray-500`}
      >
        {desc}
      </p>
    </div>
  );
}
