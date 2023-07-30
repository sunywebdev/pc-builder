import { store } from "@/redux/store";
import Footer from "@/shared/Footer";
import Navbar from "@/shared/Navbar";
import "@/styles/globals.css";
import { Provider } from "react-redux";
import { SessionProvider } from "next-auth/react";

export default function App({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <Provider store={store}>
        <Navbar />
        <Component {...pageProps} />
        <Footer />
      </Provider>
    </SessionProvider>
  );
}
