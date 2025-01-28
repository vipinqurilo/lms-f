import StoreProvider from "@/provider/StoreProvider";
import "@/styles/globals.css";
import { usePathname } from "next/navigation";
import Aos from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
export default function App({ Component, pageProps }) {
  useEffect(() => {
    Aos.init({ duration: 1500 });
    Aos.refresh();
  }, []);
  return (
    <StoreProvider>
      <Component {...pageProps} />
    </StoreProvider>
  );
}
