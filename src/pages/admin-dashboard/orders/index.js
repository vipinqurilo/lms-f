import OrderComp from "@/components/student-dashboard/OrderComp";
import StudentDashboardLayout from "@/layouts/student-dashboard/StudentDashboardLayout";
import React from "react";

export default function OrdersPage() {
  return (
    <StudentDashboardLayout>
      <OrderComp />
    </StudentDashboardLayout>
  );
}
