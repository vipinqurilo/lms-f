"use client";

import StudentDashboardLayout from "../../../layouts/student-dashboard/StudentDashboardLayout";
import SupportDashboard from "@/container/instructor/support/SupportDashboard";

export default function SupportPage() {
  return (
    <StudentDashboardLayout className="space-y-8">
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
