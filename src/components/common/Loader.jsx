import React from "react";
import { TbLoader } from "react-icons/tb";
import { ImSpinner10 } from "react-icons/im";

const Loader = ({ text, color, isBig=false }) => {
  return (
    <div className="flex justify-center items-center">
      {isBig ? (
        <ImSpinner10 size={40} className={`animate-spin ${color}`} />
      ) : (
        <div className="flex items-center gap-2">
          <TbLoader size={20} className={`animate-spin ${color}`} />
          {text}
        </div>
      )}
    </div>
  );
};

export default Loader;
