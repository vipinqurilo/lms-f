"use client";

import DashboardProfileSettingsContainer from "@/container/common/DashboardProfileSettingsContainer";
import StudentDashboardLayout from "@/layouts/student-dashboard/StudentDashboardLayout";

export default function ProfileSettingsPage() {
  return (
    <StudentDashboardLayout className="space-y-8">
      <DashboardProfileSettingsContainer />
    </StudentDashboardLayout>
  );
}
