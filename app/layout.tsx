import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CRTMonitor } from "@/components/ui/crt-monitor";
import { Analytics } from "@vercel/analytics/react"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ziyad Mourabiti",
  description: "Welcome to my desktop! 🖥️ A portfolio inspired by the beautiful dunes of Morocco's Merzouga and the clutter of my real laptop's home screen.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen flex xl:p-24 xl:w-5/6 w-full mx-auto">
          <div className="relative min-h-full min-w-full">
            <CRTMonitor>
              {children}
              <Analytics />
            </CRTMonitor>
          </div>
        </div>
      </body>
    </html>
  );
}
