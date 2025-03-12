import { setGender } from "@/store/slices/tutorsSlice";
import React, { useEffect, useState } from "react";
import { GoCheck } from "react-icons/go";
import { useSelector, useDispatch } from "react-redux";

const GenderSelector = () => {
  const {gender}=useSelector((state)=>state.tutors);
  const dispatch=useDispatch();
  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
      }}
      className="absolute bottom-0 left-3 translate-y-[100%] z-[1000]"
    >
      <div className="w-[240px] p-3 h-[142px] flex flex-col justify-between bg-white rounded-lg relative mt-[12.8px]">
        <div className="w-0 h-0 absolute top-0 left-5 -translate-y-[96%] border-l-[15px] border-l-transparent border-r-[15px] border-r-transparent border-b-[13px] border-b-white"></div>
        {/* Gender Options */}

        <div
          onClick={() => dispatch(setGender("Any"))}
          className={`flex justify-between px-3 items-center  ${
            gender === "Any" ? "text-black" : "text-[#b3b3b3]"
          }`}
        >
          Any <GoCheck />
        </div>
        <hr />
        <div
          onClick={() => dispatch(setGender("Male"))}
          className={`flex justify-between px-3 items-center  ${
            gender === "Male" ? "text-black" : "text-[#b3b3b3]"
          }`}
        >
          Male <GoCheck />
        </div>
        <hr />
        <div
          onClick={() => dispatch(setGender("Female"))}
          className={`flex justify-between px-3 items-center  ${
            gender === "Female" ? "text-black" : "text-[#b3b3b3]"
          }`}
        >
          Female <GoCheck />
        </div>
      </div>
    </div>
  );
};

export default GenderSelector;
