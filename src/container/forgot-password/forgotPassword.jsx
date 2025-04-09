"use client";
import { forgotPasswordAsync } from "@/store/slices/userSlice";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [timer, setTimer] = useState(0);
  const [emailError, setEmailError] = useState("");

  const dispatch = useDispatch();
  const { successMessage, error, isLoading } = useSelector((state) => state.user);
  
  const isSubmitting = isLoading?.["forgotPasswordAsync"] || false;
  
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

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      setEmailError("Email is required");
      return false;
    } else if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address");
      return false;
    }
    setEmailError("");
    return true;
  };

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    if (emailError) validateEmail(newEmail);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateEmail(email)) return;
    
    dispatch(forgotPasswordAsync(email));
  };

  // Set timer only when success message is received
  useEffect(() => {
    if (successMessage) {
      const newTime = 120; // 2-minute timer
      setTimer(newTime);
      
      if (typeof window !== "undefined") {
        localStorage.setItem("forgotPasswordTimer", newTime);
        localStorage.setItem("forgotPasswordStartTime", Date.now());
      }
    }
  }, [successMessage]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 mt-12">
      <div className="bg-white p-8 rounded-2xl shadow-lg lg:w-5/12 text-center">
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
        <form onSubmit={handleSubmit} className="mt-3">
          <div className="text-left">
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              onBlur={() => validateEmail(email)}
              className={`w-full mt-4 p-3 border-none ring-1  outline-none rounded-lg focus:ring-secondary ring-gray-600 ${
                emailError ? "border-red-500" : ""
              }`}
              placeholder="Enter Your E-mail"
              disabled={timer > 0 || isSubmitting}
            />
            {emailError && (
              <p className="text-red-500 text-sm mt-1">{emailError}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-secondary text-white py-3 rounded-lg mt-6 font-semibold hover:bg-black transition relative"
            disabled={isSubmitting || timer > 0 || !email.trim()}
          >
            {isSubmitting ? (
              <>
                <span className="opacity-0">CONTINUE</span>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                </div>
              </>
            ) : (
              "CONTINUE"
            )}
          </button>
          {timer > 0 && (
            <p className="text-gray-600 mt-2">Try again in {formatTime(timer)}</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
