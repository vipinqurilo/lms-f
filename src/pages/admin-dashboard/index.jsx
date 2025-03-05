"use client";

import React from "react";
import StatesCard from "@/components/admin-dashboard/dashboard/StatesCard";
import StudentDashboardLayout from "@/layouts/student-dashboard/StudentDashboardLayout";
import EarningSummary from "@/components/admin-dashboard/dashboard/EarningSummary";
import BookingTable from "@/components/admin-dashboard/dashboard/SalesTable";
import TotalEarning from "@/components/admin-dashboard/dashboard/TotalEarning";
import { useEffect } from "react";
import RecentTicket from "@/components/admin-dashboard/dashboard/RecentTicket";
import { useDispatch, useSelector } from "react-redux";
import { getAdminTickets } from "@/store/slices/supportSlice";
import TicketsContainer from "@/container/instructor/dashboard/TicketsContainer";

const index = () => {
  const dispatch = useDispatch();
  const { tickets } = useSelector((state) => state.support);

  useEffect(() => {
    dispatch(getAdminTickets({}));
  }, []);

  return (
    <StudentDashboardLayout>
      <div className="flex gap-4 p-10">
        <div className="w-[80%]">
          <StatesCard />
          <EarningSummary />
          <BookingTable />
        </div>
        <div className="w-[30%] sticky top-0 z-[0] space-y-5">
          <TotalEarning />
          {/* <RecentTicket  /> */}
          <TicketsContainer tickets={tickets} link={"/admin-dashboard/support"} />
        </div>
      </div>
    </StudentDashboardLayout>
  );
};

export default index;
