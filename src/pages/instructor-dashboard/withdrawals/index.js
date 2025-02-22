import WithdrawalContainer from "@/container/instructor/withdrawal/WithdrawalContainer";
import StudentDashboardLayout from "@/layouts/student-dashboard/StudentDashboardLayout";
import React from "react";

export default function WithdrawalsPage() {
  return (
    <StudentDashboardLayout>
      <WithdrawalContainer />
    </StudentDashboardLayout>
  );
}
