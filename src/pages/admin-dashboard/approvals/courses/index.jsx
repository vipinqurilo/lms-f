import React, { useEffect } from "react";
import StudentDashboardLayout from "@/layouts/student-dashboard/StudentDashboardLayout";
import Course from "@/components/admin-dashboard/approvals/courses/Course";
import TitleComp from "@/components/instructor/TitleComp";
import { useDispatch } from "react-redux";
import { getAllAdminCourses } from "@/store/slices/admin-dashboard/courseSlice";
import { useSelector } from "react-redux";

export default function index() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllAdminCourses());
  }, []);

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
