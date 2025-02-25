import React from "react";
import Loader from "../common/Loader";

const SubmitButton = ({ text, loading }) => {
  return (
    <button className={`w-full py-3 bg-secondary hover:bg-black transition-custom rounded text-lg text-white ${text === "Submit Review" && "!border !border-secondary !bg-transparent !text-black hover:!bg-black hover:!text-white disabled:!cursor-not-allowed disabled:hover:bg-secondary disabled:opacity-60"}`}
    disabled={loading}
    >
      {loading ? <Loader /> : text} 
    </button>
  );
};

export default SubmitButton;
