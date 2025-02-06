import TitleComp from "@/components/instructor/TitleComp";
import EarningContainer from "@/container/instructor/earning/EarningContainer";
import StudentDashboardLayout from "@/layouts/student-dashboard/StudentDashboardLayout";
import React from "react";

const index = () => {
  return (
    <StudentDashboardLayout>
      <main className="dashboard-container">
        <TitleComp
          heading={"Earnings"}
          des={
            "Track your income, view breakdowns, and monitor financial progress."
          }
        />
        <EarningContainer />
      </main>
    </StudentDashboardLayout>
  );
};

export default index;
