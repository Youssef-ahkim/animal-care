import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Animal Care",
  description: "create unforgettable bonds with your perfect pet match",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Fixed Background Layer */}
        <div className="fixed inset-0 -z-10 bg-[url('/bg.png')] bg-cover bg-center bg-no-repeat pointer-events-none" />

        <Nav />
        {children}
      </body>
    </html>
  );
}
