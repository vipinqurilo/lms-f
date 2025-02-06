import WithdrawalHistory from "@/components/admin-dashboard/user/user";
import StudentDashboardLayout from "@/layouts/student-dashboard/StudentDashboardLayout";
import React from "react";

const index = () => {
  return (
    <StudentDashboardLayout>
      <WithdrawalHistory />
    </StudentDashboardLayout>
  );
};

export default index;