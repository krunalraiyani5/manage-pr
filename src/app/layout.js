import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Project Manager - Home",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="fixed top-0 right-0 left-0">
          <Navbar />
        </div>
        <Toaster position="top-right" />
        {children}
      </body>
    </html>
  );
}
