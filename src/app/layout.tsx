import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: "PromptMax - AI Prompt Engineering Tool",
  description: "Professional AI prompt engineering platform with advanced templates, validation, and optimization tools. Create, refine, and perfect your AI prompts for maximum effectiveness.",
  keywords: "AI prompts, prompt engineering, AI tools, prompt optimization, artificial intelligence, prompt templates, AI assistant, prompt validation",
  authors: [{ name: "PromptMax Team" }],
  creator: "PromptMax",
  publisher: "PromptMax",
  robots: "index, follow",
  openGraph: {
    title: "PromptMax - AI Prompt Engineering Tool",
    description: "Professional AI prompt engineering platform with advanced templates, validation, and optimization tools.",
    url: "https://promptmax.app",
    siteName: "PromptMax",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "PromptMax - AI Prompt Engineering Tool",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PromptMax - AI Prompt Engineering Tool",
    description: "Professional AI prompt engineering platform with advanced templates and validation tools.",
    images: ["/twitter-image.png"],
  },
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#3b82f6",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
