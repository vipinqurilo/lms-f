import InstructorMyCourses from "@/container/instructor/dashboard/InstructorMyCourses";
import StudentDashboardLayout from "@/layouts/student-dashboard/StudentDashboardLayout";
import React from "react";

export default function MyCoursesPage() {
  return (
    <StudentDashboardLayout>
      <InstructorMyCourses />
    </StudentDashboardLayout>
  );
}
