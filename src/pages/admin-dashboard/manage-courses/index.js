"use client";

import ManageCourses from "@/container/admin-dashboard/ManageCourses";
import StudentDashboardLayout from "@/layouts/student-dashboard/StudentDashboardLayout";
import React from "react";

export default function index() {
  return (
    <StudentDashboardLayout>
      <ManageCourses />
    </StudentDashboardLayout>
  );
}
