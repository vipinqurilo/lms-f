"use client";

import DashboardSettingsContainer from "@/container/common/DashboardSettingsContainer";
import StudentDashboardLayout from "@/layouts/student-dashboard/StudentDashboardLayout";

export default function SettingsPage() {
  return (
    <StudentDashboardLayout className="space-y-8">
      <DashboardSettingsContainer />
    </StudentDashboardLayout>
  );
}
