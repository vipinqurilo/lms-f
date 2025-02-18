import TitleComp from "@/components/instructor/TitleComp";
import WalletContainer from "@/container/instructor/wallet/WalletContainer";
import StudentDashboardLayout from "@/layouts/student-dashboard/StudentDashboardLayout";
import React from "react";

export default function WalletPage() {
  return (
    <StudentDashboardLayout>
      <main className="w-full h-full">
        <WalletContainer />
      </main>
    </StudentDashboardLayout>
  );
}
