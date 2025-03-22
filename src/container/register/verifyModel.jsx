"use client";

import React, { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { verifyEmailAsync } from "@/store/slices/userSlice";

const VerifyModel = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token"); // Get token from query params
  const router = useRouter();
  const dispatch = useDispatch();

  const { isLoading, successMessage, error } = useSelector((state) => state?.user);
  console.log("Token received:", token);

  useEffect(() => {
    if (token) {
      dispatch(verifyEmailAsync(token))
        .unwrap()
        .then(() => {
          router.push("/login"); // Redirect to login after successful verification
        })
        .catch((error) => {
          console.error("Verification error:", error);
        });
    }
  }, [dispatch, token, router]); // This should only run once when token is available

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 mt-12">
      <div className="bg-white p-8 rounded-2xl shadow-lg lg:w-5/12 text-center">
        <img
          src="/images/PHOTO-2025-01-23-10-17-50__1_-removebg-preview 1.svg"
          alt="Logo"
          className="mx-auto w-auto"
        />
        {isLoading?.["verifyEmailAsync"] ? (
          <p className="text-gray-600 mt-5">Verifying email...</p>
        ) : error?.["verifyEmailAsync"] ? (
          <p className="text-red-600 mt-5">{error?.["verifyEmailAsync"] || "Verification failed"}</p>
        ) : (
          <p className="text-gray-600 text-base px-8 mt-5">{successMessage}</p>
        )}
        <button
          className="w-full bg-primary text-white py-3 rounded-lg mt-6 font-semibold hover:bg-black transition"
          onClick={() => router.push("/login")}
         >
          Login
        </button>
      </div>
    </div>
  );
};

export default VerifyModel;
