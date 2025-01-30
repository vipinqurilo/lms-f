import TitleComp from "@/components/instructor/TitleComp";
import InstructorMyCourses from "@/container/instructor/dashboard/InstructorMyCourses";
import StudentDashboardLayout from "@/layouts/student-dashboard/StudentDashboardLayout";
import React from "react";

export default function MyCoursesPage() {
  return (
    <StudentDashboardLayout>
      <main className="dashboard-container">
        <TitleComp
          heading={"My Courses"}
          des={"Manage your courses and its updates"}
        />
        <InstructorMyCourses />
      </main>
    </StudentDashboardLayout>
  );
}
