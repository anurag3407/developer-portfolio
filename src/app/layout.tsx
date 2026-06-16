import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Cursor from "@/components/Cursor";
import Preloader from "@/components/Preloader";
import Grain from "@/components/Grain";
import Nav from "@/components/Nav";

const sans = Geist({
  variable: "--font-sans-stack",
  subsets: ["latin"],
  display: "swap",
});

const mono = Geist_Mono({
  variable: "--font-mono-stack",
  subsets: ["latin"],
  display: "swap",
});

const serif = Instrument_Serif({
  variable: "--font-display-stack",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Anurag Mishra — Designer & Developer",
  description:
    "Independent designer & developer crafting interfaces that feel alive. Selected work, case studies, and capabilities.",
  metadataBase: new URL("https://example.com"),
  openGraph: {
    title: "Anurag Mishra — Designer & Developer",
    description:
      "Independent designer & developer crafting interfaces that feel alive.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${sans.variable} ${mono.variable} ${serif.variable}`}
    >
      <body className="bg-bg text-fg overflow-x-hidden">
        <Preloader />
        <Grain />
        <Cursor />
        <SmoothScroll>
          <Nav />
          <main className="relative">{children}</main>
        </SmoothScroll>
      </body>
    </html>
  );
}
