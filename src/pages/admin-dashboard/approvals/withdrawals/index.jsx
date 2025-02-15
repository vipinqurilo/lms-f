import React from "react";
import TitleComp from "@/components/instructor/TitleComp";
import WithdrawalContainer from "@/container/instructor/withdrawal/WithdrawalContainer";
import StudentDashboardLayout from "@/layouts/student-dashboard/StudentDashboardLayout";

const index = () => {
  return (
    // update this code
    <StudentDashboardLayout>
    <main className="dashboard-container">
      <TitleComp
        heading={"Withdrawals"}
        des={
          "Manage your withdrawal requests and track transaction status effortlessly."
        }
      />
      <WithdrawalContainer/>
    </main>
  </StudentDashboardLayout>
  );
};

export default index;
