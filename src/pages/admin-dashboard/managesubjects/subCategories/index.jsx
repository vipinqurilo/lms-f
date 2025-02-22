import SubCategories from "@/components/admin-dashboard/managesubjects/subcategories";
import TitleComp from "@/components/instructor/TitleComp";
import StudentDashboardLayout from "@/layouts/student-dashboard/StudentDashboardLayout";
import React from "react";

const index = () => {
  return (
    <StudentDashboardLayout>
      {" "}
      <SubCategories />
    </StudentDashboardLayout>
  );
};

export default index;
