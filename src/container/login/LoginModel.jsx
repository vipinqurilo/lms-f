import React, { useEffect } from "react";

import LoginForm from "./LoginForm";
import SlideShow from "./SlideShow";

const LoginModel = ({ onClose }) => {
  useEffect(() => {
    // Disable scrolling when component mounts
    document.body.style.overflow = "hidden";

    // Re-enable scrolling when component unmounts
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <div className="fixed w-screen h-screen top-0 left-0 inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[1000]">
      <div
        className="absolute top-0 right-0 p-4 w-full h-full left-0 "
        onClick={onClose}
      ></div>
      <div className="h-[80%] relative z-10 bg-white  rounded-lg w-[80%] mx-auto overflow-hidden flex items-center ">
        <SlideShow />
        <LoginForm type={"model"}/>
      </div>
    </div>
  );
};

export default LoginModel;
