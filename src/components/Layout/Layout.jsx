import { Toaster } from "react-hot-toast";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import ScrollToTopButton from "../scroll-to-top-button/ScrollToTopButton";
import css from "./Layout.module.scss";
import { Analytics } from "@vercel/analytics/react";

export default function Layout({ children }) {
  return (
    <div className={css.page__container}>
      <Header />
      <main>{children}</main>
      <Footer />
      <ScrollToTopButton />
      <Analytics />
      {/* <AppBar /> */}
      {/* {children} */}
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          style: {
            fontSize: "16px",
            padding: "10px",
          },
        }}
      />
    </div>
  );
}
