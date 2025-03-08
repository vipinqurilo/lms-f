"use client";

import React, { useState } from "react";
import StatesCard from "@/components/admin-dashboard/dashboard/StatesCard";
import StudentDashboardLayout from "@/layouts/student-dashboard/StudentDashboardLayout";
import EarningSummary from "@/components/admin-dashboard/dashboard/EarningSummary";
import BookingTable from "@/components/admin-dashboard/dashboard/SalesTable";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAdminTickets } from "@/store/slices/supportSlice";
import TicketsContainer from "@/container/instructor/dashboard/TicketsContainer";
import ScheduleView from "@/components/student-dashboard/ScheduleView";
import { fetchBookingsAsync } from "@/store/slices/admin-dashboard/bookingSlice";
import dateFormat from "dateformat";
import { getCardStats } from "@/store/slices/admin-dashboard/adminDashboardSlice";

const index = () => {
  const dispatch = useDispatch();
  const { tickets } = useSelector((state) => state.support);
  const { bookings, isLoading } = useSelector((state) => state.admin.booking);
  const [startDate, setstartDate] = useState(new Date());

  useEffect(() => {
    dispatch(getAdminTickets({}));
    dispatch(getCardStats())
  }, []);

  useEffect(() => {
    dispatch(
      fetchBookingsAsync({ startDate: dateFormat(startDate, "yyyy-mm-dd") })
    );
  }, [startDate]);

  return (
    <StudentDashboardLayout>
      <div className="flex gap-8 p-10">
        <div className="w-[70%]">
          <StatesCard />
          <EarningSummary />
          <BookingTable />
        </div>
        <div className="w-[30%] sticky top-0 z-[0] space-y-5">
          <ScheduleView
            bookingLoading={isLoading["fetchBookingsAsync"]}
            startDate={startDate}
            setStartDate={setstartDate}
            bookings={bookings}
            link={"/admin-dashboard/manage-booking"}
          />
          <TicketsContainer
            tickets={tickets}
            link={"/admin-dashboard/support"}
          />
        </div>
      </div>
    </StudentDashboardLayout>
  );
};

export default index;
