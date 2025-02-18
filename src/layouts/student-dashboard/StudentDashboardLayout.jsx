import protectedPages from "@/middleware/protectedPages";
import { Sidebar } from "./Sidebar";
import TopBanner from "./TopBanner";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";

export default protectedPages(function StudentDashboardLayout({ children }) {
  const router = useRouter();
  const pathname = router.pathname;
  const dispatch = useDispatch();
  const { pagination } = useSelector((state) => state.ui);
  if (pathname.startsWith("/student-dashboard")) {
    // console.log("found");
  }

  return (
    <div className="h-screen overflow-hidden bg-gray-50 w-full font-nunito">
      <TopBanner />
      <div className={`w-full flex h-[calc(100%-80px)]  `}>
        <Sidebar />
        <main
          className={`flex-1 w-full overflow-y-auto ${pagination ? "h-[calc(100vh-128px)]" : "p-10"}`}
        >
          {children}
        </main>
      </div>
    </div>
  );
});
