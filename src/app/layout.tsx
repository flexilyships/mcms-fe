import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { QueryProvider } from "@/components/providers/query-provider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Flexy - Maritime Fleet & Compliance Management",
  description:
    "Professional maritime fleet, crew documentation, compliance monitoring, and risk management system.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full min-w-0 flex flex-col overflow-x-hidden font-sans bg-white">
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
