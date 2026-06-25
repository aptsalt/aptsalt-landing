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

const SITE = "https://aptsalt.github.io/aptsalt-landing";
const OG = `${SITE}/og.png`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: "Deepak Singh Kandari | Senior Frontend & AI Engineer",
  description: "13+ years building enterprise applications and AI-first interfaces. Angular, React, Next.js, LLM pipelines, multi-agent systems — agentic AI products shipped end to end.",
  alternates: { canonical: "/" },
  authors: [{ name: "Deepak Singh Kandari" }],
  keywords: ["AI Engineer", "Frontend Lead", "Angular", "Next.js", "LangGraph", "Agentic AI", "RAG", "Tech Lead"],
  openGraph: {
    title: "Deepak Singh Kandari | Senior Frontend & AI Engineer",
    description: "From Silicon to Sentience — agentic AI products and the frontend craft around them. 27 projects, one engineered lineage.",
    type: "website",
    url: SITE,
    siteName: "Deepak Singh Kandari — Portfolio",
    images: [{ url: OG, width: 1200, height: 630, alt: "Deepak Singh Kandari — Senior Frontend & AI Engineer" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Deepak Singh Kandari | Senior Frontend & AI Engineer",
    description: "From Silicon to Sentience — agentic AI products, shipped end to end.",
    images: [OG],
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Deepak Singh Kandari",
  jobTitle: "Senior Frontend & AI Engineer",
  email: "mailto:deepchand89k@gmail.com",
  url: SITE,
  sameAs: ["https://github.com/aptsalt", "https://linkedin.com/in/deepaksinghkandari"],
  knowsAbout: ["Agentic AI", "LangGraph", "RAG", "Angular", "Next.js", "LLM Infrastructure", "Multi-agent systems"],
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
