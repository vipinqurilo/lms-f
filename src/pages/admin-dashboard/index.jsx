import React from "react";
import StatesCard from "@/components/admin-dashboard/dashboard/StatesCard";
import StudentDashboardLayout from "@/layouts/student-dashboard/StudentDashboardLayout";
import EarningSummary from "@/components/admin-dashboard/dashboard/EarningSummary";
import BookingTable from "@/components/admin-dashboard/dashboard/SalesTable";

const index = () => {
  return (
    <StudentDashboardLayout>
      <div>
        <StatesCard />
        <EarningSummary />
        <BookingTable/>
      </div>
    </StudentDashboardLayout>
  );
};

export default index;
