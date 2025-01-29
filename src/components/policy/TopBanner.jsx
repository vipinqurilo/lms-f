import React from "react";

const TopBanner = ({ heading }) => {
  return (
    <div
      className="w-full bg-no-repeat bg-blue-500 bg-cover"
      style={{
        backgroundImage: `url("/assets/common/privacybanner.png")`,
      }}
    >
      <div className="w-full py-20 flex items-center justify-center text-white">
        <h2 className="text-2xl lg:text-3xl font-extrabold">{heading}</h2>
      </div>
    </div>
  );
};

export default TopBanner;
