"use client";
import CommonButton from "@/components/common/CommonButton";
import TitleComp from "@/components/instructor/TitleComp";
import AddCourseProcessContainer from "@/container/instructor/addcourse/AddCourseProcessContainer";
import StudentDashboardLayout from "@/layouts/student-dashboard/StudentDashboardLayout";
import { editCourse } from "@/store/slices/instructor/courseSlice";
import { useRouter } from "next/navigation";
import React from "react";
import { useDispatch } from "react-redux";

export default function AddCoursePage() {
  const router = useRouter();
  const dispatch = useDispatch();
  return (
    <StudentDashboardLayout>
      <div className="mb-4">
        <CommonButton
          label={"Back"}
          onClick={() => {
            dispatch(editCourse({}));
            router.back();
          }}
          variant="primary"
        />
      </div>
      <main className="dashboard-container">
        <TitleComp
          heading={"Add New Course"}
          des={"Fill in the details to create a new course."}
        />
        <AddCourseProcessContainer />
      </main>
    </StudentDashboardLayout>
  );
}
