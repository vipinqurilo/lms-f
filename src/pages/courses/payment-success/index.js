"use client";

import PaymentStatus from "@/components/courses/PaymentStatus";
import { createOrder } from "@/store/slices/coursesSlice";
import { verifyPayfastPayment } from "@/store/slices/paymentSlice";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function PaymentSuccess() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const dispatch = useDispatch();
  const [isVerifying, setIsVerifying] = useState(false);
  const paymentLoading = useSelector((state) => state.payment.isLoading.verifyPayfastPayment);

  useEffect(() => {
    if (sessionId) {
      // Check if it's a PayFast payment (starts with "course_")
      if (sessionId.startsWith("course_")) {
        setIsVerifying(true);
        dispatch(verifyPayfastPayment(sessionId))
          .unwrap()
          .then((response) => {
            console.log("Payment verification response:", response);
            if (response.success && response.data?.status === "succeeded") {
              dispatch(createOrder({ sessionId: sessionId }));
            }
          })
          .finally(() => {
            setIsVerifying(false);
          });
      } else {
        // Handle Stripe or other payment providers
        dispatch(createOrder({ sessionId: sessionId }));
      }
    }
  }, [sessionId, dispatch]);
  
  const isLoading = isVerifying || paymentLoading;

  return <PaymentStatus status={"success"} isLoading={isLoading} />;
}
