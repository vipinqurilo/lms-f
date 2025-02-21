"use client"

import React from "react";
import StatesCard from "@/components/admin-dashboard/dashboard/StatesCard";
import StudentDashboardLayout from "@/layouts/student-dashboard/StudentDashboardLayout";
import EarningSummary from "@/components/admin-dashboard/dashboard/EarningSummary";
import BookingTable from "@/components/admin-dashboard/dashboard/SalesTable";
import TotalEarning from "@/components/admin-dashboard/dashboard/TotalEarning";
import { useEffect } from "react";
import RecentTicket from "@/components/admin-dashboard/dashboard/RecentTicket";

const index = () => {

  return (
    <StudentDashboardLayout>
      <div className="flex gap-4 p-10">
        <div className="w-[80%]">
          <StatesCard />
          <EarningSummary />
          <BookingTable />
        </div>
        <div className="w-[30%]">
          <TotalEarning />
          <RecentTicket />
        </div>
      </div>
    </StudentDashboardLayout>
  );
};

export default index;
