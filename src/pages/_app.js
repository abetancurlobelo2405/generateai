import Header from "../components/Header";
import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { PayPalProvider } from "../context/PayPalContext";
import Footer from "../components/Footer";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <PayPalProvider>
        <SessionProvider session={pageProps.session}>
          <Header />
          <Component {...pageProps} />
        </SessionProvider>
      </PayPalProvider>
    </>
  );
}

export default MyApp;
