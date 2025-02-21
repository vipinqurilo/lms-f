"use client";
import CommonButton from "@/components/common/CommonButton";
import TitleComp from "@/components/instructor/TitleComp";
import AddCourseProcessContainer from "@/container/instructor/addcourse/AddCourseProcessContainer";
import StudentDashboardLayout from "@/layouts/student-dashboard/StudentDashboardLayout";
import {
  editCourseData,
  updateStep,
} from "@/store/slices/instructor/courseSlice";
import { useRouter } from "next/navigation";
import React from "react";
import { useDispatch } from "react-redux";

export default function AddCoursePage() {
  const router = useRouter();
  const dispatch = useDispatch();
  return (
    <StudentDashboardLayout>
      <main className="p-10">
        <div className="mb-4">
          <CommonButton
            label={"Back"}
            onClick={() => {
              dispatch(editCourseData({}));
              dispatch(updateStep(1));
              router.back();
            }}
            variant="primary"
          />
        </div>
        <div className="dashboard-container">
          <TitleComp
            heading={"Add New Course"}
            des={"Fill in the details to create a new course."}
          />
          <AddCourseProcessContainer />
        </div>
      </main>
    </StudentDashboardLayout>
  );
}
