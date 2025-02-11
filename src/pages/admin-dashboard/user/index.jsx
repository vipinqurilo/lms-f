import UsersHistory from "@/components/admin-dashboard/user/user";
 import StudentDashboardLayout from "@/layouts/student-dashboard/StudentDashboardLayout";
import React from "react";

const index = () => {
  return (
    <StudentDashboardLayout>
      <UsersHistory />
    </StudentDashboardLayout>
  );
};

export default index;