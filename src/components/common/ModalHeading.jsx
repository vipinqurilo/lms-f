import React from "react";
import { IoClose } from "react-icons/io5";

const ModalHeading = ({ onClose, title, PaddingAdd=false }) => {
  return (
    <div className={`w-full flex items-center justify-between py-4 px-10 ${PaddingAdd && "!p-0"}`}>
      <h2 className="text-xl font-semibold font-nunito ">{title}</h2>
      <button onClick={onClose} className="text-gray-500 border border-black/10 rounded-full p-1 hover:bg-background hover:text-white transition-custom ">
        <IoClose size={20} />
      </button>
    </div>
  );
};

export default ModalHeading;
