"use client";

import DashboardProfileSettingsContainer from "@/container/common/DashboardProfileSettingsContainer";
import DashboardSettingsContainer from "@/container/common/DashboardSettingsContainer";
import StudentDashboardLayout from "@/layouts/student-dashboard/StudentDashboardLayout";
import { LuCreditCard } from "react-icons/lu";

export default function SettingsPage() {
  const tabs = [
    
    {
      id: "payment-settings",
      label: "Payment Settings",
      Icon: LuCreditCard,
    },
    {
      id: "payout-settings",
      label: "Payout Settings",
      Icon: LuCreditCard,
    },
  ];
  return (
    <StudentDashboardLayout className="space-y-8">
      <DashboardProfileSettingsContainer />
    </StudentDashboardLayout>
  );
}
