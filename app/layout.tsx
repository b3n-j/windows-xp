import { APP_DESCRIPTION, APP_TITLE } from "@/app/_constants/config";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { ThemeProvider } from "next-themes";
import { Geist } from "next/font/google";
import React from "react";
import { WindowProvider } from '@/app/_contexts/window-context';
import "@/app/_styles/globals.css";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: APP_TITLE,
  description: APP_DESCRIPTION,
};

const geistSans = Geist({
  display: "swap",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={geistSans.className} suppressHydrationWarning>
      <body className="bg-background text-foreground overflow-hidden m-0 p-0">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <WindowProvider>
            <main className="min-h-screen w-screen overflow-hidden">
              {children}
              <SpeedInsights />
            </main>
          </WindowProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
