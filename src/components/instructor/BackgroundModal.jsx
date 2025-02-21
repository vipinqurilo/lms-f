import React from "react";

const BackgroundModal = ({ PropComponent }) => {
  return (
    <div className="w-full h-screen flex items-center justify-center bg-black/25 !z-[20] !fixed !top-0 !left-0 backdrop-blur-sm">
      {typeof PropComponent === "function" ? <PropComponent /> : PropComponent}
    </div>
  );
};

export default BackgroundModal;
