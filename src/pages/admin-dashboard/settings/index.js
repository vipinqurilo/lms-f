"use client";

import DashboardSettingsContainer from "@/container/common/DashboardSettingsContainer";
import StudentDashboardLayout from "@/layouts/student-dashboard/StudentDashboardLayout";
import { Settings2 } from "lucide-react";
import { LuCreditCard, LuMail } from "react-icons/lu";

export default function SettingsPage() {
  const tabs = [
    {
      id: "frontend-settings",
      label: "Frontend Settings",
      Icon: Settings2,
    },
    {
      id: "email-settings",
      label: "Email Settings",
      Icon: LuMail,
    },
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
      <DashboardSettingsContainer tabs={tabs} />
    </StudentDashboardLayout>
  );
}
