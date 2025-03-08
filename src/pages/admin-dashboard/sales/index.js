import EarningContainer from "@/container/instructor/earning/EarningContainer";
import StudentDashboardLayout from "@/layouts/student-dashboard/StudentDashboardLayout";
import React from "react";

const EarningPage = () => {
  return (
    <StudentDashboardLayout>
      <EarningContainer />
    </StudentDashboardLayout>
  );
};

export default EarningPage;
