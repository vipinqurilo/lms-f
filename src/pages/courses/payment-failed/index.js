import PaymentStatus from '@/components/courses/PaymentStatus'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useSearchParams } from 'next/navigation'
import { clearPaymentError } from '@/store/slices/paymentSlice'

export default function PaymentFailed() {
  const dispatch = useDispatch()
  const searchParams = useSearchParams()
  const sessionId = searchParams.get("session_id")
  
  useEffect(() => {
    // Clear any payment errors
    dispatch(clearPaymentError())
  }, [dispatch])

  return (
    <PaymentStatus status={"failure"} />
  )
}
