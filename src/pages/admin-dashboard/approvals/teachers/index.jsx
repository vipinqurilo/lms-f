  import TeacherRequests from '@/components/admin-dashboard/teacherrequests'
import StudentDashboardLayout from '@/layouts/student-dashboard/StudentDashboardLayout'
import React from 'react'

const index = () => {
  return (
    <StudentDashboardLayout><TeacherRequests/></StudentDashboardLayout>
  )
}

export default index