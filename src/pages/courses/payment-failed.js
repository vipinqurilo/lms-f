import PaymentStatus from '@/components/courses/PaymentStatus'
import React from 'react'

export default function PaymentFailed() {
  return (
    <PaymentStatus status={"failure"} />
  )
}
