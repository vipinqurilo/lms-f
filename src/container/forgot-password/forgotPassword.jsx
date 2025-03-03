"use client";
import { forgotPasswordAsync } from "@/store/slices/userSlice";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
 
const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const  { successMessage, error, isLoading}  = useSelector(
    (state) => state.user  );

  const handleForgotPassword = () => {
    if (!email) return alert("Please enter a valid email");
    dispatch(forgotPasswordAsync(email));
  }; 

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 mt-12">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-5/12 text-center">
        <img
          src="/images/PHOTO-2025-01-23-10-17-50__1_-removebg-preview 1.svg"
          alt="Logo"
          className="mx-auto w-auto"
        />

        <h2 className="text-2xl text-black font-semibold mt-4">
          Forgot password
        </h2>
        <p className="text-gray-600 text-base px-8 mt-5">
          Enter your email for the verification process, we will send a link to
          your email.
        </p>
        <div className="text-left mt-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mt-4 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter Your E-mail"
          />
        </div>
        {successMessage && (
          <p className="text-green-500 mt-3">{successMessage}</p>
        )}
        {error && <p className="text-red-500 mt-3">{error?.["forgotPasswordAsync"]}</p>}
        <button
          className="w-full bg-primary text-white py-3 rounded-lg mt-6 font-semibold hover:bg-black transition"
          onClick={handleForgotPassword}
          disabled={isLoading["forgotPasswordAsync"]}
        >
          {isLoading["forgotPasswordAsync"] ? "Sending..." : "CONTINUE"}
        </button>
      </div>
    </div>
  );
};

export default ForgotPassword;
