import WithdrawRequests from '@/components/admin-dashboard/withdrawrequests'
import StudentDashboardLayout from '@/layouts/student-dashboard/StudentDashboardLayout'
import React from 'react'

const index = () => {
  return (
    <StudentDashboardLayout> <WithdrawRequests/></StudentDashboardLayout>
  )
}

export default index