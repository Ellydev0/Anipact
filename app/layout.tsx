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
// <meta name="google-site-verification" content="y3uTTP4pdSdN-kFzC9LHz2as2FzLQt0FvifwfwXoBH0" />
export const metadata: Metadata = {
  title: "Anipact — All of Anime, Bound by One Pact",
  description:
    "Stay in sync with trending anime, latest news, and media updates — all in one place.",
  applicationName: "Anipact",
  keywords: [
    "anime",
    "anime news",
    "trending anime",
    "anime updates",
    "Anipact",
  ],
  authors: [{ name: "Elliot Otoijagha", url: "https://github.com/Ellydev0" }],
  openGraph: {
    siteName: "Anipact",
    title: "Anipact — All of Anime, Bound by One Pact",
    description:
      "Stay in sync with trending anime, news, and media updates — all under one pact.",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "https://anipact.vercel.app/logo.png",
        width: 600,
        height: 600,
        alt: "Anipact Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Anipact — All of Anime, Bound by One Pact",
    description:
      "Trending anime, news, and media updates — all under one pact.",
    images: [
      {
        url: "https://anipact.vercel.app/logo.png",
        width: 600,
        height: 600,
        alt: "Anipact Logo",
      },
    ],
    creator: "@Ellydev0",
  },
  other: {
    googleSiteVerification: "y3uTTP4pdSdN-kFzC9LHz2as2FzLQt0FvifwfwXoBH0",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="preconnect"
          href="https://graphql.anilist.co"
          crossOrigin=""
        />
      </head>
      <body className={`${xirod.variable} ${inter.variable} antialiased`}>
        <QueryProvider>{children}</QueryProvider>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
