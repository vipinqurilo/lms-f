import TitleComp from "@/components/instructor/TitleComp";
import BookingsDashboard from "@/container/instructor/bookings/BookingsDashboard";
import StudentDashboardLayout from "@/layouts/student-dashboard/StudentDashboardLayout";
import React from "react";

export default function BookingsPage() {
  return (
    <StudentDashboardLayout>
      {/* <main className="dashboard-container"> */}
        {/* <TitleComp
          heading={"Bookings"}
          des={
            "View and manage student bookings, schedules, and session details."
          }
        /> */}
        <BookingsDashboard />
      {/* </main> */}
    </StudentDashboardLayout>
  );
}
