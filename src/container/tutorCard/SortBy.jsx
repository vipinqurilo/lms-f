import React, { useEffect, useState } from "react";
import { GoCheck } from "react-icons/go";

const SortBy = ({ setSortBy, sortBy }) => {
 

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
      }}
      className="absolute bottom-0 left-3 translate-y-[100%] z-[1000]"
    >
      <div className="w-[240px] p-3 h-[142px] flex flex-col justify-between bg-white rounded-lg relative mt-[12.8px]">
        <div className="w-0 h-0 absolute top-0 left-5 -translate-y-[96%] border-l-[15px] border-l-transparent border-r-[15px] border-r-transparent border-b-[13px] border-b-white"></div>

        {/* Days of the Week */}
        <div
          onClick={() => setSortBy("By popularity")}
          className={`flex justify-between px-3 items-center  ${
            sortBy === "By popularity" ? "text-black" : "text-[#b3b3b3]"
          }`}
        >
          By popularity <GoCheck />
        </div>
        <hr />
        <div
          onClick={() => setSortBy("By price low to high")}
          className={`flex justify-between px-3 items-center  ${
            sortBy === "By price low to high" ? "text-black" : "text-[#b3b3b3]"
          }`}
        >
          By price low to high <GoCheck />
        </div>
        <hr />
        <div
          onClick={() => setSortBy("By price high to low")}
          className={`flex justify-between px-3 items-center  ${
            sortBy === "By price high to low" ? "text-black" : "text-[#b3b3b3]"
          }`}
        >
          By price high to low <GoCheck />
        </div>
      </div>
    </div>
  );
};

export default SortBy;
