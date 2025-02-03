import React, { useEffect } from "react";
import StudentDashboardLayout from "@/layouts/student-dashboard/StudentDashboardLayout";
import Course from "@/components/admin-dashboard/approvals/courses/Course";
import TitleComp from "@/components/instructor/TitleComp";
import { useDispatch } from "react-redux";
import { getAllAdminCourses } from "@/store/slices/admin-dashboard/courseSlice";

export default function index() {
  const dispatch = useDispatch();
  // const loading = useSelector(state => state...getAllAdminCourses)

  useEffect(() => {
    dispatch(getAllAdminCourses());
  }, []);

  return (
    <StudentDashboardLayout>
      <main className="dashboard-container  mt-4">
        <TitleComp
          heading={"Courses Approval Requests"}
          des={"following are the approval requests for all the courses."}
        />
        <Course />
      </main>
    </StudentDashboardLayout>
  );
}
