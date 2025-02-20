import React from "react";
import { FaCircleInfo } from "react-icons/fa6";

const RejectReasonPopup = ({ data }) => {
  return (
    <div className="group relative">
      <FaCircleInfo
        size={16}
        className="cursor-pointer text-gray-500 group-hover:text-gray-700"
      />
      {/* Tooltip */}
      <div className="absolute -left-1/2 -translate-x-1/2 mt-4 top-full w-40 p-2 bg-gray-800 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-all duration-200 scale-0 group-hover:scale-100">
        {data || "No reason provided"}
      </div>
    </div>
  );
};

export default RejectReasonPopup;
