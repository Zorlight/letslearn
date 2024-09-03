import ToastProvider from "@/lib/react-toastify/toast-provider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Nunito } from "next/font/google";
import ReduxProvider from "../redux/provider";
import "./globals.css";
import ConfettiProvider from "@/lib/react-confetti/confetti-provider";
import "dotenv/config";

const inter = Inter({ subsets: ["latin"] });
const nunito = Nunito({ subsets: ["latin"], variable: "--font-nunito" });

export const metadata: Metadata = {
  title: "Let's Learn",
  description: "Powered by NextJS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReduxProvider>
      <html lang="en">
        <ConfettiProvider />
        <body className={nunito.className}>
          <ToastProvider />
          {children}
        </body>
      </html>
    </ReduxProvider>
  );
}
