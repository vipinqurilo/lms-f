import React from "react";
import { TbLoader } from "react-icons/tb";
import { CgSpinner } from "react-icons/cg";

const Loader = ({ text, color, isBig=false }) => {
  return (
    <div className="flex justify-center items-center">
      {isBig ? (

        <CgSpinner size={50} className={`animate-spin ${color}`} />

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
