import TitleComp from "@/components/instructor/TitleComp";
import ManageCourses from "@/container/admin-dashboard/ManageCourses";
import InstructorMyCourses from "@/container/instructor/dashboard/InstructorMyCourses";
import StudentDashboardLayout from "@/layouts/student-dashboard/StudentDashboardLayout";
import { getAllAdminCourses } from "@/store/slices/admin-dashboard/courseSlice";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

export default function index() {
  const { data: courses } = useSelector(
    (state) => state.admin?.course?.courses
  ) || { data: [] };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllAdminCourses());
  }, []);

  console.log(courses, "mange kd");

  return (
    <StudentDashboardLayout>
      <main className="dashboard-container">
        <TitleComp
          heading={"Manage Courses"}
          des={"Manage your courses and its updates"}
        />
        <ManageCourses />
      </main>
    </StudentDashboardLayout>
  );
}
