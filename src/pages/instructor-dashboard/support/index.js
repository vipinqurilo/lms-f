import TitleComp from "@/components/instructor/TitleComp";
import SupportDashboard from "@/container/instructor/support/SupportDashboard";
import StudentDashboardLayout from "@/layouts/student-dashboard/StudentDashboardLayout";
import React from "react";

export default function SupportPage() {
  return (
    <StudentDashboardLayout>
      <main className="">
        {/* <TitleComp
          heading={"Support Tickets"}
          des={
            "Create, manage, and track your support tickets seamlessly. Get quick resolutions for your queries and issues."
          }
        /> */}
        <SupportDashboard />
      </main>
    </StudentDashboardLayout>
  );
}
