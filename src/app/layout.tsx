import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, Outfit } from "next/font/google";
import { MotionProvider } from "@/components/motion/motion-provider";
import "lenis/dist/lenis.css";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const mono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Uniscience | Unified Science Technology",
    template: "%s · Uniscience",
  },
  description:
    "Uniscience engineers AI, data and cloud platforms for research-driven companies. Designed by scientists, built by engineers, in one team.",
  keywords: [
    "Uniscience",
    "Unified Science Technology",
    "scientific software",
    "AI engineering",
    "data platforms",
    "cloud engineering",
  ],
  openGraph: {
    title: "Uniscience | Unified Science Technology",
    description: "Complex science, engineered into software.",
    siteName: "Uniscience",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#050806",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${mono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
