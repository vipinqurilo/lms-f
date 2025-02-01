import React from 'react';
import StudentDashboardLayout from '@/layouts/student-dashboard/StudentDashboardLayout';
import Course from '@/components/admin-dashboard/approvals/courses/Course';
import TitleComp from '@/components/instructor/TitleComp';

export default function index() {
  return (
    <StudentDashboardLayout>
      <main className="dashboard-container  mt-4">
      <TitleComp
          heading={"Add New Course"}
          des={"Fill in the details to create a new course."}
        />
       <Course/>    
      </main>
    </StudentDashboardLayout>
  )
}