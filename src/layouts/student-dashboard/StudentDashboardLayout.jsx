import protectedPages from "@/middleware/protectedPages";
import { Sidebar } from "./Sidebar";
import TopBanner from "./TopBanner";
import { useRouter } from "next/router";


export default protectedPages(function StudentDashboardLayout({ children }) {
  const router = useRouter();
  const pathname = router.pathname;

  if (pathname.startsWith("/student-dashboard")) {
    console.log("found");
  }

  return (
    <div className="h-screen overflow-hidden bg-gray-50 w-full font-nunito">
      <TopBanner />
      <div className="w-full flex h-[calc(100%-80px)]">
        <Sidebar />
        <main
          className={`flex-1 w-full overflow-y-auto p-10  ${
            pathname.startsWith("/student-dashboard") && "p-10 "
          }`}
        >
          {children}
        </main>
      </div>
    </div>
  );
});
