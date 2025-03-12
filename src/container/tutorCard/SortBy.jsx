import { setSortByRating } from "@/store/slices/tutorsSlice";
import React, { useEffect, useState } from "react";
import { GoCheck } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";

const SortBy = ({ onClose }) => {
  const { sortByRating } = useSelector((state) => state.tutors);
  const dispatch = useDispatch();
 

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
          onClick={() =>{
            dispatch(setSortByRating("relevance"))
            onClose();
          }}
          className={`flex justify-between px-3 items-center  ${
            sortByRating === "relevance" ? "text-black" : "text-[#b3b3b3]"
          }`}
        >
          Relevance <GoCheck />
        </div>
        <hr />
        <div
          onClick={() => {
            dispatch(setSortByRating("low-to-high"))
            onClose();
          }}
          className={`flex justify-between px-3 items-center  ${
            sortByRating === "low-to-high" ? "text-black" : "text-[#b3b3b3]"
          }`}
        >
          Low to High <GoCheck />
        </div>
        <hr />
        <div
          onClick={() => {
            dispatch(setSortByRating("high-to-low"))
            onClose();
          }}
          className={`flex justify-between px-3 items-center  ${
            sortByRating === "high-to-low" ? "text-black" : "text-[#b3b3b3]"
          }`}
        >
          High to Low <GoCheck />
        </div>
      </div>
    </div>
  );
};

export default SortBy;
