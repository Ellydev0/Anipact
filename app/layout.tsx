import type { Metadata } from "next";
import localFont from "next/font/local";
import { Inter } from "next/font/google";
import "./globals.css";
import { QueryProvider } from "@/app/provider";

const xirod = localFont({
  src: "../public/fonts/Xirod.otf",
  variable: "--font-xirod",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Anipact - All of Anime Bound by One Pact",
  description:
    "Join millions staying in sync with trending anime and the latest news — all under one pact.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${xirod.variable} ${inter.variable} antialiased`}>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
