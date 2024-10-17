import { Sidebar } from "@/components/Sidebar";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export default function App({ Component, pageProps }: AppProps) {
  return(
    <div>
      <Sidebar />
      <main className="flex-1 h-full p-4">
        <Component {...pageProps} />
        <ToastContainer 
          autoClose={2500} 
          position={"top-right"} 
        />
      </main>
    </div>
  );
}
