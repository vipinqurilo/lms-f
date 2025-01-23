import React from "react";

const CommonHeading = ({ data }) => {
  return (
    <div className="w-full flex flex-col items-center justify-center gap-4">
      <h1 className="text-secondary text-sm font-bold">{data?.page}</h1>
      {data?.headings?.map((heading, i) => (
        <h2 key={i} className="text-2xl font-bold">{heading}</h2>
      ))}
    </div>
  );
};

export default CommonHeading;
