import React from "react";

const InstructorButton = ({ tab, icon, handleClick, condition }) => {
  return (
    <button
      onClick={handleClick}
      className={`px-6 text-sm font-semibold border border-black/10 hover:text-white hover:bg-background transition-all ease-in-out duration-500 py-2 rounded-md flex items-center gap-2 ${condition}`}
    >
      {icon} {tab}
    </button>
  );
};

export default InstructorButton;
