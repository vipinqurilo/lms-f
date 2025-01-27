import React from "react";

const Heading = ({ data }) => {
  return (
    <div className="flex items-center justify-between gap-2">
      <h3 className="text-xl font-semibold text-dark">{data}</h3>
      {/* <div className="flex flex-col items-start gap-1">
        <div className="w-10 h-[2px] bg-primary rounded"></div>
        <div className="w-16 h-[2px] bg-dark rounded"></div>
      </div> */}
    </div>
  );
};

export default Heading;
