import Footer from "@/components/Footer";
import StoreProvider from "@/provider/StoreProvider";
import "@/styles/globals.css";
import { usePathname } from "next/navigation";
import Aos from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import Navbar from "@/components/Navbar";

export default function App({ Component, pageProps }) {
  const pathname = usePathname();
  const noFooterRoutes = [
    "/login",
    "/register",
    "/instructor-dashboard",
    "/student-dashboard",
    "/admin-dashboard"
  ];
  useEffect(() => {
    Aos.init({ duration: 1000 });
    Aos.refresh();
  }, []);

  const hideNavFooter = noFooterRoutes.some((route) =>
    pathname?.startsWith(route)
  );

  return (
    <StoreProvider>
      {!hideNavFooter && <Navbar />}
      <Component {...pageProps} />
      {!hideNavFooter && <Footer />}
    </StoreProvider>
  );
}
