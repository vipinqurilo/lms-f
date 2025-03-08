import LanguageContainer from "@/container/admin-dashboard/LanguageContainer";
import StudentDashboardLayout from "@/layouts/student-dashboard/StudentDashboardLayout";
import React from "react";

export default function LanguagesMainPage() {
  return (
    <StudentDashboardLayout>
      <LanguageContainer />
    </StudentDashboardLayout>
  );
}
