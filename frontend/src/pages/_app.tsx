import React from "react";
import { store } from "../store";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export default function App({ Component, pageProps }: AppProps) {
  return(
    <>
      <Provider store={store}>
        <Component {...pageProps} />
        <ToastContainer 
          autoClose={2500} 
          position={"top-right"} 
        />
      </Provider>
    </>
  );
}
