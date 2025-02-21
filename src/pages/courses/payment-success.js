"use client";

import PaymentStatus from "@/components/courses/PaymentStatus";
import { createOrder } from "@/store/slices/coursesSlice";
import { useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function PaymentSuccess() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const dispatch = useDispatch()

  useEffect(() => {
    if (sessionId) {
       dispatch(createOrder({ sessionId: sessionId })) 
    }
  }, [sessionId])
  

  return <PaymentStatus status={"success"} />;
}
