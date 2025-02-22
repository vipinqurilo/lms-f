import Categories from "@/components/admin-dashboard/managesubjects/categories";
import StudentDashboardLayout from "@/layouts/student-dashboard/StudentDashboardLayout";
import React from "react";

const index = () => {
  return (
    <StudentDashboardLayout>
      {" "}
      <Categories />
    </StudentDashboardLayout>
  );
};

export default index;
