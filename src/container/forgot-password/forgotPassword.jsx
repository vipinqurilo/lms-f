"use client";
import { forgotPasswordAsync } from "@/store/slices/userSlice";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [timer, setTimer] = useState(0);

  const dispatch = useDispatch();
  const { successMessage, error, isLoading } = useSelector((state) => state.user);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedTime = localStorage.getItem("forgotPasswordTimer");
      const startTime = localStorage.getItem("forgotPasswordStartTime");

      if (storedTime && startTime) {
        const elapsedTime = Math.floor((Date.now() - parseInt(startTime, 10)) / 1000);
        const remainingTime = Math.max(0, parseInt(storedTime, 10) - elapsedTime);
        
        setTimer(remainingTime);
      }
    }
  }, []);

  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTime) => {
          const newTime = prevTime - 1;
          if (newTime <= 0) {
            if (typeof window !== "undefined") {
              localStorage.removeItem("forgotPasswordTimer");
              localStorage.removeItem("forgotPasswordStartTime");
            }
            return 0;
          } else {
            if (typeof window !== "undefined") {
              localStorage.setItem("forgotPasswordTimer", newTime);
            }
            return newTime;
          }
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleForgotPassword = () => {
    if (!email) return alert("Please enter a valid email");
    dispatch(forgotPasswordAsync(email));

    const newTime = 120; // 2-minute timer
    setTimer(newTime);

    if (typeof window !== "undefined") {
      localStorage.setItem("forgotPasswordTimer", newTime);
      localStorage.setItem("forgotPasswordStartTime", Date.now());
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 mt-12">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-5/12 text-center">
        <img
          src="/images/PHOTO-2025-01-23-10-17-50__1_-removebg-preview 1.svg"
          alt="Logo"
          className="mx-auto w-auto"
        />
        <h2 className="text-2xl text-black font-semibold mt-4">Forgot password</h2>
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
            disabled={timer > 0}
          />
        </div>
        {successMessage && <p className="text-green-500 mt-3">{successMessage}</p>}
        {error && <p className="text-red-500 mt-3">{error?.["forgotPasswordAsync"]}</p>}
        <button
          className="w-full bg-primary text-white py-3 rounded-lg mt-6 font-semibold hover:bg-black transition"
          onClick={handleForgotPassword}
          disabled={isLoading["forgotPasswordAsync"] || timer > 0}
        >
          CONTINUE
        </button>
        {timer > 0 && (
          <p className="text-gray-600 mt-2">Try again in {formatTime(timer)}</p>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
