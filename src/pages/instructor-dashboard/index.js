import InstructorDashboard from "@/container/instructor/dashboard/InstructorDashboard";
import StudentDashboardLayout from "@/layouts/student-dashboard/StudentDashboardLayout";
import React from "react";

export default function index() {
  return (
    <StudentDashboardLayout>
      <InstructorDashboard />
    </StudentDashboardLayout>
  );
}
