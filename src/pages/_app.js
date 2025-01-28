import Footer from "@/components/Footer";
import StoreProvider from "@/provider/StoreProvider";
import "@/styles/globals.css";
import { usePathname } from "next/navigation";
import Aos from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

export default function App({ Component, pageProps }) {
  const pathname = usePathname();
  const noFooterRoutes = ["/login", "/register"];
  useEffect(() => {
    Aos.init({ duration: 1500 });
    Aos.refresh();
  }, []);

  return (
    <StoreProvider>
      <Component {...pageProps} />
      {!noFooterRoutes.includes(pathname) && <Footer />}
    </StoreProvider>
  );
}
