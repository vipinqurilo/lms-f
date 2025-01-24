import React from "react";

const CommonHeading = ({ data }) => {
  return (
    <div className="w-full flex flex-col items-center justify-center gap-4">
      <h1 className="text-secondary text-lg font-extrabold">{data?.page}</h1>
      <div className="space-y-1 text-center">
        {data?.headings?.map((heading, i) => (
          <h2 key={i} className="text-2xl lg:text-3xl font-bold">
            {heading}
          </h2>
        ))}
      </div>
    </div>
  );
};

export default CommonHeading;
