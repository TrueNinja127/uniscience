import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Sora } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Uniscience — Unified Science Technology",
    template: "%s · Uniscience",
  },
  description:
    "Uniscience builds AI, cloud, and data platforms that turn complex science into software people love to use.",
  keywords: [
    "Uniscience",
    "Unified Science Technology",
    "software development",
    "AI engineering",
    "cloud platforms",
    "data engineering",
  ],
  openGraph: {
    title: "Uniscience — Unified Science Technology",
    description:
      "AI, cloud, and data platforms engineered with scientific precision.",
    siteName: "Uniscience",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0b1220",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${sora.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
