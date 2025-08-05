import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "TIPS AI - Medical Training Simulation Platform",
  description: "Practice with AI-powered virtual patients using interactive avatars. Three modes: text chat, audio conversations, and video interactions for medical education.",
  keywords: "medical training, AI patients, virtual patients, medical education, simulation, healthcare training",
  authors: [{ name: "TIPS AI" }],
  openGraph: {
    title: "TIPS AI - Medical Training Simulation Platform",
    description: "Practice with AI-powered virtual patients using interactive avatars",
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
      <body className={`${inter.variable} font-sans antialiased`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
