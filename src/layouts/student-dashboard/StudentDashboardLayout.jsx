import protectedPages from "@/middleware/protectedPages";
import { Sidebar } from "./Sidebar";
import TopBanner from "./TopBanner";

export default protectedPages(function StudentDashboardLayout({ children }) {
  return (
    <div className="h-screen overflow-hidden bg-gray-50 w-full font-nunito">
      <TopBanner />
      <div className="w-full flex h-[calc(100%-80px)]">
        <Sidebar />
        <main className="flex-1  w-full overflow-y-auto">{children}</main>
      </div>
    </div>
  );
});
