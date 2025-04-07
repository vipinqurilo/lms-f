import React, { useEffect } from "react";

const BackgroundModal = ({ PropComponent }) => {
  useEffect(() => {
    // Disable scrolling when modal is mounted
    document.body.style.overflow = 'hidden';
    
    // Re-enable scrolling when modal is unmounted
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div className="w-full h-screen flex items-center justify-center bg-black/25 !z-[20] !fixed !top-0 !left-0 backdrop-blur-sm">
      {typeof PropComponent === "function" ? <PropComponent /> : PropComponent}
    </div>
  );
};

export default BackgroundModal;
