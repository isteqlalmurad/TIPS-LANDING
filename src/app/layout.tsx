import type { Metadata, Viewport } from "next";
import { Figtree, Noto_Sans, Noto_Sans_Arabic, Inter, Source_Serif_4, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { Analytics } from "@vercel/analytics/next";

const figtree = Figtree({
  subsets: ["latin"],
  variable: "--font-figtree",
  weight: ["300", "400", "500", "600", "700"],
});

const notoSans = Noto_Sans({
  subsets: ["latin"],
  variable: "--font-noto-sans",
  weight: ["300", "400", "500", "600", "700"],
});

const notoSansArabic = Noto_Sans_Arabic({
  subsets: ["arabic"],
  variable: "--font-noto-arabic",
  weight: ["300", "400", "500", "600", "700"],
});

// v2 landing page fonts
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700"],
});

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-source-serif",
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  weight: ["400", "500"],
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
      <body className={`${figtree.variable} ${notoSans.variable} ${notoSansArabic.variable} ${inter.variable} ${sourceSerif.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        <Providers>
          {children}
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}
