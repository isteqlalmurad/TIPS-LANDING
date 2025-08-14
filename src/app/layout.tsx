import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { Analytics } from "@vercel/analytics/next";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Simpatient AI - Medical Training Simulation Platform",
  description: "Practice with AI-powered virtual patients using interactive avatars. Three modes: text chat, audio conversations, and video interactions for medical education.",
  keywords: "medical training, AI patients, virtual patients, medical education, simulation, healthcare training",
  authors: [{ name: "Simpatient AI" }],
  openGraph: {
    title: "Simpatient AI - Medical Training Simulation Platform",
    description: "Practice with AI-powered virtual patients using interactive avatars",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
            <head>
        <link rel="icon" type="image/png" href="/favicon.png" />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        <Providers>
          {children}
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}
