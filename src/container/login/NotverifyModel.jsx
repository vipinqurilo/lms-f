"use client";

import React, { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { verifyEmailAsync } from "@/store/slices/userSlice";

const Notverifymodel = () => {
  const router = useRouter();
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 mt-12">
      <div className="bg-white p-8 rounded-2xl shadow-lg lg:w-5/12 text-center">
        <img
          src="/images/PHOTO-2025-01-23-10-17-50__1_-removebg-preview 1.svg"
          alt="Logo"
          className="mx-auto w-auto"
        />

        <p className="text-gray-600 mt-5">
          Your verification email has been sent again successfully. Please check
          your inbox .
        </p>

        <button
          className="w-full bg-primary text-white py-3 rounded-lg mt-6 font-semibold hover:bg-black transition"
          onClick={() => router.push("/login")}
        >
          Ok
        </button>
      </div>
    </div>
  );
};

export default Notverifymodel;
