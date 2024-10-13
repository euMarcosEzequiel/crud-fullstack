import { Sidebar } from "@/components/Sidebar";
import "@/styles/globals.css";
import type { AppProps } from "next/app";


export default function App({ Component, pageProps }: AppProps) {
  return(
    <div className="w-screen h-screen bg-neutral-900 flex box-border">
      <Sidebar />
      <main className="flex-1 h-full p-4">
        <Component {...pageProps} />
      </main>
    </div>
  );
}
