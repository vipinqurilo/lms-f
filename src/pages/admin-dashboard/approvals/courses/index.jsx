"use client";

import Course from "@/components/admin-dashboard/approvals/courses/Course";
import TitleComp from "@/components/instructor/TitleComp";
import ManageCourses from "@/container/admin-dashboard/ManageCourses";
import StudentDashboardLayout from "@/layouts/student-dashboard/StudentDashboardLayout";
import React from "react";

export default function index() {
  return (
    <StudentDashboardLayout>
      <main className="  p-10">
        <div className="dashboard-container">
        <TitleComp
          heading={"Courses Approval Requests"}
          des={"following are the approval requests for all the courses."}
        />
        <Course />
        </div>
   
      </main>
    </StudentDashboardLayout>
  );
}
