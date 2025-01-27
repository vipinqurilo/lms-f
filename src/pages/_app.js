import Footer from "@/components/Footer";
import StoreProvider from "@/provider/StoreProvider";
import "@/styles/globals.css";
import { usePathname } from "next/navigation";

export default function App({ Component, pageProps }) {
  const pathname = usePathname();

  const noFooterRoutes = ["/login", "/register"];
  return (
    <StoreProvider>
      <Component {...pageProps} />
      {!noFooterRoutes.includes(pathname) && <Footer />}
    </StoreProvider>
  );
}
