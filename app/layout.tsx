import type { Metadata } from "next";
import localFont from "next/font/local";
import { Inter } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
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
  applicationName: "Anipact",
  keywords: ["anipact", "anime", "pact", "news"],
  authors: [{ name: "Elliot Otoijagha", url: "https://github.com/Ellydev0" }],
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
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
