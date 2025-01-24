import React from "react";

const SubmitButton = ({ text }) => {
  return (
    <button className="w-full py-3 bg-secondary hover:bg-black transition-custom rounded text-lg text-white">
      {text}
    </button>
  );
};

export default SubmitButton;
