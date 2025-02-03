import TitleComp from "@/components/instructor/TitleComp";
import WithdrawalContainer from "@/container/instructor/withdrawal/WithdrawalContainer";
import StudentDashboardLayout from "@/layouts/student-dashboard/StudentDashboardLayout";
import React from "react";

export default function WithdrawalsPage() {
  return (
    <StudentDashboardLayout>
      <main className="dashboard-container">
        <TitleComp
          heading={"Withdrawals"}
          des={
            "Manage your withdrawal requests and track transaction status effortlessly."
          }
        />
        <WithdrawalContainer />
      </main>
    </StudentDashboardLayout>
  );
}
