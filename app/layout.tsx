import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react"
import { profile } from "@/lib/portfolio";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(profile.siteUrl),
  title: {
    default: "Ziyad Mourabiti - Full-stack software engineer",
    template: "%s - Ziyad Mourabiti",
  },
  description:
    "Full-stack software engineer at SAP building reliable enterprise platforms and applied AI systems.",
  authors: [{ name: profile.name, url: profile.siteUrl }],
  creator: profile.name,
  keywords: [
    "Ziyad Mourabiti",
    "full-stack software engineer",
    "platform engineering",
    "applied AI",
    "SAP",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: profile.siteUrl,
    siteName: profile.name,
    title: "Ziyad Mourabiti - Full-stack software engineer",
    description:
      "Reliable, data-intensive products - from enterprise platforms to applied AI.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ziyad Mourabiti - Full-stack software engineer",
    description:
      "Reliable, data-intensive products - from enterprise platforms to applied AI.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
