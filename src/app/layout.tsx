import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SmoothScrollProvider } from "./components/smooth-scroll-provider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Deepak Singh Kandari | Senior Frontend & AI Engineer",
  description: "13+ years building enterprise applications and AI-first interfaces. Angular, React, Next.js, LLM pipelines, multi-agent systems.",
  openGraph: {
    title: "Deepak Singh Kandari | Senior Frontend & AI Engineer",
    description: "13+ years building enterprise applications and AI-first interfaces across FINRA, Home Depot, CIBC, TD Bank.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
