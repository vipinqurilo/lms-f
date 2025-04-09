"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import {
  IoCheckmarkCircleOutline,
  IoCloseCircleOutline,
} from "react-icons/io5";
import { useSelector } from "react-redux";
import CommonButton from "../common/CommonButton";
import { useRouter } from "next/navigation";

export default function PaymentStatus({ status, isLoading }) {
  const router = useRouter();
  const { perchasedCourse, error } = useSelector((state) => state.courses);
  const courseLoading = useSelector((state) => state.courses?.isLoading?.createOrder);
  const loading = isLoading || courseLoading;
  const [errorMessage, setErrorMessage] = useState("Payment was unsuccessful.");
  
  useEffect(() => {
    // Get error from query params after component mounts
    if (router.query?.error) {
      setErrorMessage(router.query.error);
    } else if (error["PaymentCourse"]) {
      setErrorMessage(error["PaymentCourse"]);
    }
  }, [router.query, error]);
  
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 font-nunito">
      <div className="w-full custom-margin-top max-w-md bg-white shadow-lg rounded-lg p-6 text-center flex flex-col items-center gap-4">
        {status === "success" && (
          <>
            <IoCheckmarkCircleOutline className="text-green-500 text-6xl mb-4 mx-auto" />
            <h1 className="text-2xl font-bold text-green-600">
              Payment Successful! 🎉
            </h1>
            <p className="text-gray-600">
              Your course has been successfully purchased.
            </p>

            {loading ? (
              <p className="text-red-600 text-sm font-semibold flex items-center gap-2 animate-pulse">
                ⏳ {isLoading ? "Verifying payment..." : "Creating your order..."} Please wait!
              </p>
            ) : (
              <p className="text-gray-600">
                Your Order has been created successfully.
              </p>
            )}

            {perchasedCourse && (
              <div className="border border-gray-200 rounded-lg p-4 flex flex-col gap-2 text-left">
                <p>
                  <strong>Course:</strong>{" "}
                  {perchasedCourse?.course?.courseTitle}
                </p>
                <p>
                  <strong>Price:</strong> {perchasedCourse?.course?.coursePrice} R
                </p>
                <p>
                  <strong>Transaction ID:</strong>{" "}
                  {perchasedCourse?.transactionId}
                </p>
                <p>
                  <strong>Order ID:</strong>{" "}
                  {perchasedCourse?.orderId}
                </p>
              </div>
            )}

            <a
              onClick={(e) => {
                e.preventDefault();
                window.opener.location.href = "/";
                window.close();
              }}
            >
              <CommonButton
                label={"See All Enrolled Courses"}
                loading={loading}
              />
            </a>
          </>
        )}

        {status === "failure" && (
          <>
            <IoCloseCircleOutline className="text-red-500 text-6xl" />
            <h1 className="text-4xl font-bold text-red-500 mb-4">Payment Failed</h1>
            <p className="text-lg text-gray-600">{errorMessage}</p>
            
            <div className="flex mt-6">
              
              <button 
                onClick={() => window.close()}
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded ml-4"
              >
                Close Window
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
