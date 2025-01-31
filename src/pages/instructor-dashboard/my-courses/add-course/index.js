import CommonButton from "@/components/common/CommonButton";
import TitleComp from "@/components/instructor/TitleComp";
import AddCourseProcessContainer from "@/container/instructor/addcourse/AddCourseProcessContainer";
import StudentDashboardLayout from "@/layouts/student-dashboard/StudentDashboardLayout";
import { useRouter } from "next/navigation";
import React from "react";
import { IoIosArrowBack } from "react-icons/io";

export default function AddCoursePage() {
  const router = useRouter();
  return (
    <StudentDashboardLayout>
      <div className="mb-4">
        <CommonButton
          label={"Back"}
          //   label={<IoIosArrowBack />}
          onClick={() => router.back()}
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
