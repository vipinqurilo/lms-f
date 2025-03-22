"use client";

import React from "react";
import { useRouter } from "next/navigation";
import BackgroundModal from "@/components/instructor/BackgroundModal";

const AlertContent = () => {
  const router = useRouter();
  
  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg lg:w-5/12 text-center">
      <img
        src="/images/PHOTO-2025-01-23-10-17-50__1_-removebg-preview 1.svg"
        alt="Logo"
        className="mx-auto w-auto"
      />

      <p className="text-gray-600 mt-5">We Send Verification email sent to your email.</p>

      <button
        className="w-full bg-primary text-white py-3 rounded-lg mt-6 font-semibold hover:bg-black transition"
        onClick={() => router.push("/login")}
      >
        Ok
      </button>
    </div>
  );
};

const Alertverifyemail = () => {
  return <BackgroundModal PropComponent={AlertContent} />;
};

export default Alertverifyemail;
