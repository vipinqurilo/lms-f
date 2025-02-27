"use client";

import Link from "next/link";
import React from "react";
import {
  IoCheckmarkCircleOutline,
  IoCloseCircleOutline,
} from "react-icons/io5";
import { useSelector } from "react-redux";
import CommonButton from "../common/CommonButton";

export default function PaymentStatus({ status }) {
  const { perchasedCourse, error } = useSelector((state) => state.courses);
  const loading = useSelector((state) => state.courses?.isLoading?.createOrder);
  
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
                ⏳ Creating your order... Please wait!
              </p>
            ) : (
              <p className="text-gray-600">
                Your Orer has been Created successfully.
              </p>
            )}

            {perchasedCourse && (
              <div className=" border border-gray-200 rounded-lg p-4 flex flex-col gap-2 text-left">
                <p>
                  <strong>Course:</strong>{" "}
                  {perchasedCourse?.course?.courseTitle}
                </p>
                <p>
                  <strong>Price:</strong> {perchasedCourse?.course?.coursePrice}
                </p>
                <p>
                  {/* note:change it later */}
                  <strong>Transaction ID:</strong>{" "}
                  {perchasedCourse?.transactionId}
                  {/* {perchasedCourse?.transactionId} */}
                </p>
                <p>
                  {/* note:change it later */}
                  <strong>Order ID:</strong>{" "}
                  {perchasedCourse?.orderId}
                  {/* {perchasedCourse?.transactionId} */}
                </p>
              </div>
            )}

            <Link href={"/student-dashboard/enrolled-courses"}>
              <CommonButton
                label={"See All Enrolled Courses"}
                loading={loading}
              />
            </Link>
          </>
        )}

        {status === "failure" && (
          <>
            <IoCloseCircleOutline className="text-red-500 text-6xl" />
            <h1 className="text-2xl font-bold text-red-600">Payment Failed!</h1>
            <p className="text-gray-600">
              Something went wrong with your payment.
            </p>
            {error["PaymentCourse"] && (
              <p className="text-red-500 mt-2">{error["PaymentCourse"]}</p>
            )}

            <Link href={"/courses"}>
              <CommonButton label={"Back to Courses"} />
            </Link>
          </>
        )}

        {/* Back to Courses Button */}
      </div>
    </div>
  );
}
