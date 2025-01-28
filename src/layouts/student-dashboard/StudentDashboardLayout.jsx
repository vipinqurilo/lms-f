import { Sidebar } from "./Sidebar";
import TopBanner from "./TopBanner";

export default function StudentDashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <TopBanner />
      <div className="flex p-20">
        <Sidebar />
        <main className="flex-1 px-8">{children}</main>
      </div>
    </div>
  );
}
