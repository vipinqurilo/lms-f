import StudentsTable from '@/components/admin-dashboard/studentmanage/students'
import StudentDashboardLayout from '@/layouts/student-dashboard/StudentDashboardLayout'
import React from 'react'

const index = () => {
  return (
    <StudentDashboardLayout>
        <StudentsTable/>
    </StudentDashboardLayout>
  )
}

export default index