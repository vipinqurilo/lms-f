import TeachersTable from '@/components/admin-dashboard/teachers/teachers'
import StudentDashboardLayout from '@/layouts/student-dashboard/StudentDashboardLayout'
import React from 'react'

const index = () => {
  return (
    <StudentDashboardLayout>
        <TeachersTable/>
    </StudentDashboardLayout>
  )
}

export default index
