"use client";

import Course from "@/components/admin-dashboard/approvals/courses/Course";
import TitleComp from "@/components/instructor/TitleComp";
import ManageCourses from "@/container/admin-dashboard/ManageCourses";
import StudentDashboardLayout from "@/layouts/student-dashboard/StudentDashboardLayout";
import React from "react";

export default function index() {
  return (
    <StudentDashboardLayout>
      <main className="">
        <Course />
      </main>
    </StudentDashboardLayout>
  );
}
