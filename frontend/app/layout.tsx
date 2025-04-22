// app/layout.tsx

import { TemperatureProvider } from '@/context/TemperatureContext';
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// Font configuration
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Metadata for the site
export const metadata: Metadata = {
  title: "Weather App",
  description: "A sleek weather forecasting app built with Next.js",
};

// Root layout component
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="antialiased bg-background text-foreground">
        <TemperatureProvider>
        {children}
        </TemperatureProvider>
      </body>
    </html>
  );
}
