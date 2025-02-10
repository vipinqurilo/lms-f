import React, { useEffect } from "react";
import StudentDashboardLayout from "@/layouts/student-dashboard/StudentDashboardLayout";
import Course from "@/components/admin-dashboard/approvals/courses/Course";
import TitleComp from "@/components/instructor/TitleComp";
import { useDispatch } from "react-redux";
import { getAllAdminTeacher } from "@/store/slices/admin-dashboard/teacherSlice";
import Teacher from "@/components/admin-dashboard/approvals/teachers/Teacher";

export default function index() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllAdminTeacher());
  }, [dispatch]);

  return (
    <StudentDashboardLayout>
      <main className="dashboard-container  mt-4">
        <TitleComp
          heading={"Courses Approval Requests"}
          des={"following are the approval requests for all the courses."}
        />
        <Teacher/>
      </main>
    </StudentDashboardLayout>
  );
}
