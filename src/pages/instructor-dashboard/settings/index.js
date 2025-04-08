"use client";

import DashboardProfileSettingsContainer from "@/container/common/DashboardProfileSettingsContainer";
import DashboardSettingsContainer from "@/container/common/DashboardSettingsContainer";
import StudentDashboardLayout from "@/layouts/student-dashboard/StudentDashboardLayout";
import { LuCreditCard } from "react-icons/lu";

export default function SettingsPage() {
  return (
    <StudentDashboardLayout className="space-y-8">
      <DashboardProfileSettingsContainer />
    </StudentDashboardLayout>
  );
}
