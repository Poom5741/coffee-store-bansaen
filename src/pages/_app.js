import "@/styles/globals.css";
import { Asap } from "next/font/google";
import { createContext, useReducer } from "react";
import StoreProvider from "../../store/store-context";

const asap = Asap({ subsets: ["latin-ext"] });

export default function App({ Component, pageProps }) {
  return (
    <StoreProvider>
      <div className={asap.className}>
        <Component {...pageProps} />{" "}
      </div>
    </StoreProvider>
  );
}
