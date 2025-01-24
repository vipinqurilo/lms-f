import Link from "next/link";
import React from "react";
import { FaFacebookF, FaGoogle } from "react-icons/fa6";

const LoginOptions = ({ type }) => {
  return (
    <div className="w-full py-5 bg-secondary/10 flex flex-col items-center text-center space-y-4">
      <p className="text-gray-500">
        Or {type === "login" ? "Login" : "Register"} in with
      </p>
      <div className="flex flex-col items-center space-y-2">
        <button className="flex items-center space-x-2 ">
          <FaGoogle className="text-red-500" />
          <span className="font-bold">
            {type === "login" ? "Login" : "Register"} using Google
          </span>
        </button>
        <button className="flex items-center space-x-2 ">
          <FaFacebookF className="text-blue-500" />
          <span className="font-bold">
            {type === "login" ? "Login" : "Register"} using Facebook
          </span>
        </button>
      </div>
      <p className="text-gray-500">
      {type === "login" ? "New User?" : "Already Have an Account?"}{" "}
        <Link
          href={type === "login" ? "/register" : "/login"}
          className="text-red-500 hover:underline"
        >
          {type === "login" ? "Create an Account" : "Back to Login"}
        </Link>
      </p>
    </div>
  );
};

export default LoginOptions;
