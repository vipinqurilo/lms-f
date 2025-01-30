import React from "react";
import { TbLoader } from "react-icons/tb";

const Loader = ({ text, color }) => {
  return (
    <div className="flex justify-center items-center">
      <div className="flex items-center gap-2">
        <TbLoader size={20} className={`animate-spin ${color}`} />
        {text}
      </div>
    </div>
  );
};

export default Loader;
